(function () {
  'use strict';
  const PMS = window.PMS = window.PMS || {};
  const PrintDesigner = {
    templates: [],
    sources: { projectFields: [], informationTypes: [], forms: [] },
    definition: null,
    editingId: '',
    busy: false,
    selectedElementId: '',
    history: [],
    historyIndex: -1,
    dragState: null,
    previewMode: false,
    outputPageSpec: { width: 210, height: 297 },
    pdfDocument: null,
    pdfFile: null,
    pdfRenderVersion: 0,
    pdfPageObserver: null,
    activePageIndex: 0,
    init: function () {
      const route = String(window.location.hash || '').replace(/^#/, '').split('/')[0];
      if (route === 'print-output') this.initOutput();
      else this.initLibrary();
    },
    extract: function (response) {
      return PMS.Api && typeof PMS.Api.extractData === 'function'
        ? PMS.Api.extractData(response)
        : (response && response.data !== undefined ? response.data : response);
    },
    list: function (value, keys) {
      const data = this.extract(value);
      if (Array.isArray(data)) return data;
      for (const key of (keys || ['items','Items'])) if (data && Array.isArray(data[key])) return data[key];
      return [];
    },
    esc: function (value) {
      return String(value === undefined || value === null ? '' : value).replace(/[&<>"']/g, function (ch) {
        return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]);
      });
    },
    setStatus: function (id, message, error) {
      const node = document.getElementById(id);
      if (!node) return;
      node.textContent = message || '';
      node.classList.toggle('is-error', !!error);
    },
    blankDefinition: function () {
      return { schemaVersion: 1, page: { size: 'A4', orientation: 'portrait' }, elements: [], bindings: [] };
    },
    pageDimensions: function (pageIndex) {
      const index = Number(pageIndex || 0);
      const pdfPages = this.definition && this.definition.pdf && this.definition.pdf.pages;
      if (Array.isArray(pdfPages) && pdfPages[index]) {
        return { width: Number(pdfPages[index].widthMm), height: Number(pdfPages[index].heightMm) };
      }
      const size = document.getElementById('pt-page-size');
      const orientation = document.getElementById('pt-page-orientation');
      const key = size ? size.value : ((this.definition && this.definition.page && this.definition.page.size) || 'A4');
      const dimensions = { A4: [210,297], A5: [148,210], LETTER: [216,279] }[key] || [210,297];
      return orientation && orientation.value === 'landscape'
        ? { width: dimensions[1], height: dimensions[0] }
        : { width: dimensions[0], height: dimensions[1] };
    },
    syncPageControls: function () {
      const page = this.definition && this.definition.page ? this.definition.page : {};
      const size = document.getElementById('pt-page-size');
      const orientation = document.getElementById('pt-page-orientation');
      if (size) size.value = page.size || 'A4';
      if (orientation) orientation.value = page.orientation || 'portrait';
      const hasPdf = !!(this.definition && this.definition.pdf && Array.isArray(this.definition.pdf.pages));
      if (size) size.disabled = hasPdf;
      if (orientation) orientation.disabled = hasPdf;
    },
    bindEditor: function () {
      const canvas = document.getElementById('pt-design-canvas');
      if (!canvas || canvas.dataset.bound === '1') return;
      canvas.dataset.bound = '1';
      canvas.addEventListener('click', (event) => {
        const page = event.target.closest('.pt-design-page');
        if (page) this.activePageIndex = Number(page.dataset.pageIndex || 0);
        const node = event.target.closest('[data-pt-element]');
        if (node) this.selectElement(node.dataset.ptElement);
        else { this.selectedElementId = ''; this.renderEditor(); }
      });
      canvas.addEventListener('pointerdown', (event) => {
        const node = event.target.closest('[data-pt-element]');
        if (!node || event.target.closest('[data-pt-resize]')) return;
        const item = this.getSelectedOrById(node.dataset.ptElement);
        if (!item || item.locked) return;
        const pageNode = node.closest('.pt-design-page');
        const pageIndex = Number(pageNode && pageNode.dataset.pageIndex || item.pageIndex || 0);
        const rect = (pageNode || canvas).getBoundingClientRect();
        const dimensions = this.pageDimensions(pageIndex);
        this.dragState = { id: item.id, pageIndex: pageIndex, startX: event.clientX, startY: event.clientY,
          x: Number(item.x || 0), y: Number(item.y || 0),
          scaleX: dimensions.width / rect.width, scaleY: dimensions.height / rect.height };
        this.selectElement(item.id, false);
        event.preventDefault();
      });
      canvas.addEventListener('pointerdown', (event) => {
        const handle = event.target.closest('[data-pt-resize]');
        if (!handle) return;
        const node = handle.closest('[data-pt-element]');
        const item = node && this.getSelectedOrById(node.dataset.ptElement);
        if (!item) return;
        const pageNode = node.closest('.pt-design-page');
        const pageIndex = Number(pageNode && pageNode.dataset.pageIndex || item.pageIndex || 0);
        const rect = (pageNode || canvas).getBoundingClientRect();
        const dimensions = this.pageDimensions(pageIndex);
        this.dragState = { id: item.id, pageIndex: pageIndex, resize: true, startX: event.clientX, startY: event.clientY,
          width: Number(item.width || 40), height: Number(item.height || 18),
          scaleX: dimensions.width / rect.width, scaleY: dimensions.height / rect.height };
        this.selectElement(item.id, false);
        event.preventDefault();
      });
      document.addEventListener('pointermove', (event) => {
        if (!this.dragState) return;
        const drag = this.dragState;
        const item = this.getSelectedOrById(drag.id);
        if (!item) return;
        const dx = (event.clientX - drag.startX) * drag.scaleX;
        const dy = (event.clientY - drag.startY) * drag.scaleY;
        if (drag.resize) {
          item.width = Math.max(8, Math.round(drag.width + dx));
          item.height = Math.max(8, Math.round(drag.height + dy));
        } else {
          const dimensions = this.pageDimensions(drag.pageIndex);
          item.pageIndex = drag.pageIndex;
          item.x = Math.max(0, Math.min(dimensions.width - Number(item.width || 30), Math.round(drag.x + dx)));
          item.y = Math.max(0, Math.min(dimensions.height - Number(item.height || 15), Math.round(drag.y + dy)));
        }
        this.renderCanvas();
        this.renderInspector();
      });
      document.addEventListener('pointerup', () => {
        if (this.dragState) { this.dragState = null; this.commitHistory(); }
      });
      document.addEventListener('keydown', (event) => {
        if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
        const tag = event.target && event.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        if (event.key.toLowerCase() === 'z') { event.preventDefault(); event.shiftKey ? this.redo() : this.undo(); }
        if (event.key.toLowerCase() === 'y') { event.preventDefault(); this.redo(); }
      });
      document.querySelectorAll('[data-pt-action]').forEach(button => {
        if (button.dataset.ptBound === '1') return;
        button.dataset.ptBound = '1';
        button.addEventListener('click', () => this.handleEditorAction(button.dataset.ptAction));
      });
      ['pt-prop-text','pt-prop-binding','pt-prop-selection','pt-prop-x','pt-prop-y','pt-prop-width','pt-prop-height','pt-prop-font','pt-prop-align','pt-prop-columns','pt-prop-rows','pt-prop-color','pt-prop-background'].forEach(id => {
        const input = document.getElementById(id);
        if (!input || input.dataset.bound === '1') return;
        input.dataset.bound = '1';
        input.addEventListener('change', () => this.applyInspectorChange(id, input.value));
      });
      ['pt-page-size','pt-page-orientation'].forEach(id => {
        const input = document.getElementById(id);
        if (!input || input.dataset.bound === '1') return;
        input.dataset.bound = '1';
        input.addEventListener('change', () => {
          if (!this.definition) this.definition = this.blankDefinition();
          this.definition.page.size = document.getElementById('pt-page-size').value;
          this.definition.page.orientation = document.getElementById('pt-page-orientation').value;
          this.renderCanvas(); this.commitHistory();
        });
      });
    },
    getSelectedOrById: function (id) {
      const elements = this.definition && Array.isArray(this.definition.elements) ? this.definition.elements : [];
      return elements.find(item => String(item.id) === String(id)) || null;
    },
    createElement: function (type, overrides) {
      if (!this.definition) this.definition = this.blankDefinition();
      const shapeTypes = ['line','divider','rectangle','ellipse'];
      const defaults = {
        id: 'el_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,7),
        type: type, text: type === 'text' ? 'متن جدید' : (type === 'table' ? 'جدول اطلاعات' : (type === 'image' ? 'جایگاه تصویر' : (shapeTypes.includes(type) ? '' : 'فیلد داده'))),
        x: 15, y: 18 + this.definition.elements.length * 8, pageIndex: Number(this.activePageIndex || 0), width: type === 'table' ? 170 : (type === 'line' || type === 'divider' ? 100 : 65),
        height: type === 'line' || type === 'divider' ? 1 : (type === 'table' ? 48 : (type === 'rectangle' || type === 'ellipse' ? 35 : 18)), fontSize: 12, align: 'right', bindingId: '',
        columns: type === 'table' ? ['عنوان','مقدار','توضیحات'] : [], rows: type === 'table' ? [['نمونه ۱','مقدار',''],['نمونه ۲','مقدار','']] : []
      };
      const item = Object.assign(defaults, overrides || {});
      this.definition.elements.push(item);
      this.selectedElementId = item.id;
      this.renderEditor();
      this.commitHistory();
      return item;
    },
    handleEditorAction: function (action) {
      const selected = this.getSelectedOrById(this.selectedElementId);
      if (action === 'add-text') return this.createElement('text');
      if (action === 'add-field') {
        const binding = this.definition && this.definition.bindings && this.definition.bindings[0];
        return this.createElement('field', { text: binding ? (binding.label || binding.id) : 'فیلد داده', bindingId: binding ? binding.id : '' });
      }
      if (action === 'add-table') {
        const binding = this.definition && this.definition.bindings && this.definition.bindings.find(item => item.sourceType === 'EVENT_FORM_RESPONSE' || item.selection === 'ALL');
        return this.createElement('table', { bindingId: binding ? binding.id : '' });
      }
      if (action === 'add-image') return this.createElement('image');
      if (action === 'add-line') return this.createElement('line', { text: '' });
      if (action === 'add-divider') return this.createElement('divider', { text: '' });
      if (action === 'add-rectangle') return this.createElement('rectangle', { text: '' });
      if (action === 'add-ellipse') return this.createElement('ellipse', { text: '' });
      if (action === 'undo') return this.undo();
      if (action === 'redo') return this.redo();
      if (action === 'preview') {
        this.previewMode = !this.previewMode;
        const workspace = document.getElementById('pt-editor-workspace');
        const button = document.querySelector('[data-pt-action="preview"]');
        if (workspace) workspace.classList.toggle('pt-preview-mode', this.previewMode);
        if (button) button.textContent = this.previewMode ? 'بازگشت به ویرایش' : 'پیش‌نمایش';
        this.setStatus('pt-editor-status', this.previewMode ? 'پیش‌نمایش چیدمان نمونه؛ داده‌های واقعی هنگام انتخاب پروژه در بخش چاپ بازیابی می‌شوند.' : 'به محیط ویرایش برگشتی.');
        return;
      }
      if (action === 'remove' && selected) {
        this.definition.elements = this.definition.elements.filter(item => item.id !== selected.id);
        this.selectedElementId = ''; this.renderEditor(); return this.commitHistory();
      }
      if ((action === 'layer-up' || action === 'layer-down') && selected) {
        const list = this.definition.elements;
        const index = list.findIndex(item => item.id === selected.id);
        const target = action === 'layer-up' ? index + 1 : index - 1;
        if (target >= 0 && target < list.length) {
          const swap = list[target]; list[target] = list[index]; list[index] = swap;
          this.renderEditor(); this.commitHistory();
        }
        return;
      }
      if (action === 'duplicate' && selected) {
        const copy = JSON.parse(JSON.stringify(selected));
        copy.id = 'el_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,7);
        copy.x = Number(copy.x || 0) + 6; copy.y = Number(copy.y || 0) + 6;
        this.definition.elements.push(copy); this.selectedElementId = copy.id;
        this.renderEditor(); return this.commitHistory();
      }
    },
    selectElement: function (id, render) {
      this.selectedElementId = id || '';
      if (render !== false) this.renderEditor();
      else this.renderInspector();
      this.renderLayers();
    },
    applyInspectorChange: function (id, value) {
      const item = this.getSelectedOrById(this.selectedElementId);
      if (!item) return;
      const map = { 'pt-prop-text':'text','pt-prop-binding':'bindingId','pt-prop-x':'x','pt-prop-y':'y',
        'pt-prop-width':'width','pt-prop-height':'height','pt-prop-font':'fontSize','pt-prop-align':'align','pt-prop-color':'color','pt-prop-background':'background' };
      if (id === 'pt-prop-selection') {
        const source = (this.definition.bindings || []).find(binding => binding.id === item.bindingId);
        if (source && ['EVENT_FORM_FIELD','EVENT_FORM_RESPONSE'].includes(source.sourceType)) source.selection = value;
      } else if (id === 'pt-prop-columns') item.columns = String(value).split('|').map(part => part.trim()).filter(Boolean);
      else if (id === 'pt-prop-rows') item.rows = String(value).split(/\r?\n/).filter(line => line.trim()).map(line => line.split('|').map(part => part.trim()));
      else {
        const key = map[id];
        if (!key) return;
        item[key] = ['x','y','width','height','fontSize'].includes(key) ? Number(value) : value;
      }
      this.renderCanvas(); this.renderLayers(); this.commitHistory();
    },
    renderInspector: function () {
      const item = this.getSelectedOrById(this.selectedElementId);
      const empty = document.getElementById('pt-inspector-empty');
      const fields = document.getElementById('pt-inspector-fields');
      if (empty) empty.hidden = !!item;
      if (fields) fields.hidden = !item;
      if (!item) return;
      const values = { 'pt-prop-text':item.text || '', 'pt-prop-binding':item.bindingId || '',
        'pt-prop-x':item.x || 0, 'pt-prop-y':item.y || 0, 'pt-prop-width':item.width || 30,
        'pt-prop-height':item.height || 15, 'pt-prop-font':item.fontSize || 12, 'pt-prop-align':item.align || 'right', 'pt-prop-color':item.color || '#1f2937', 'pt-prop-background':item.background || '#ffffff' };
      Object.keys(values).forEach(id => { const node = document.getElementById(id); if (node && document.activeElement !== node) node.value = values[id]; });
      const binding = document.getElementById('pt-prop-binding');
      if (binding) {
        binding.innerHTML = '<option value="">بدون اتصال</option>' + ((this.definition && this.definition.bindings) || []).map(source =>
          '<option value="' + this.esc(source.id) + '">' + this.esc(source.label || source.id) + '</option>').join('');
        binding.value = item.bindingId || '';
      }
      const tableProperties = document.getElementById('pt-table-properties');
      if (tableProperties) tableProperties.hidden = item.type !== 'table';
      const selectionWrap = document.getElementById('pt-selection-wrap');
      const selectedBinding = (this.definition.bindings || []).find(source => source.id === item.bindingId);
      const supportsSelection = selectedBinding && ['EVENT_FORM_FIELD','EVENT_FORM_RESPONSE'].includes(selectedBinding.sourceType);
      if (selectionWrap) selectionWrap.hidden = !supportsSelection;
      const selectionInput = document.getElementById('pt-prop-selection');
      if (selectionInput && supportsSelection) selectionInput.value = selectedBinding.selection || 'LATEST';
      const columns = document.getElementById('pt-prop-columns');
      const rows = document.getElementById('pt-prop-rows');
      if (columns) columns.value = (item.columns || []).join(' | ');
      if (rows) rows.value = (item.rows || []).map(row => row.join(' | ')).join('\n');
    },
    renderCanvas: function () {
      const root = document.getElementById('pt-design-canvas');
      if (!root) return;
      if (!this.definition) this.definition = this.blankDefinition();
      const pageSpecs = (this.definition.pdf && Array.isArray(this.definition.pdf.pages) && this.definition.pdf.pages.length)
        ? this.definition.pdf.pages.map((page, index) => ({ width: Number(page.widthMm), height: Number(page.heightMm), index: index }))
        : [Object.assign(this.pageDimensions(0), { index: 0 })];
      const structureKey = String(this.pdfRenderVersion) + '|' + pageSpecs.map(page => page.width + 'x' + page.height).join(',');
      if (root.dataset.pageStructure !== structureKey) {
        root.innerHTML = pageSpecs.map(page =>
          '<div class="pt-design-page" data-page-index="' + page.index + '" style="width:' + page.width + 'mm;height:' + page.height + 'mm">' +
          '<canvas class="pt-pdf-background" aria-hidden="true"></canvas><div class="pt-page-elements" data-page-elements="' + page.index + '"></div></div>'
        ).join('');
        root.dataset.pageStructure = structureKey;
        if (this.pdfDocument) this.renderPdfBackgrounds();
      }
      pageSpecs.forEach(page => {
        const layer = root.querySelector('[data-page-elements="' + page.index + '"]');
        if (!layer) return;
        const elements = (this.definition.elements || []).filter(item => Number(item.pageIndex || 0) === page.index);
        layer.innerHTML = elements.length ? elements.map(item => {
          const style = 'left:' + Number(item.x || 0) + 'mm;top:' + Number(item.y || 0) + 'mm;width:' + Number(item.width || 30) +
            'mm;height:' + Number(item.height || 15) + 'mm;font-size:' + Number(item.fontSize || 12) + 'pt;text-align:' + this.esc(item.align || 'right') + ';color:' + this.esc(item.color || 'black') + ';background:' + this.esc(item.background || 'transparent');
          const selected = String(item.id) === String(this.selectedElementId) ? ' is-selected' : '';
          const label = item.type === 'line' || item.type === 'divider' ? '<span class="pt-shape-line" aria-hidden="true"></span>' :
            (item.type === 'rectangle' || item.type === 'ellipse' ? '<span class="pt-shape-outline" aria-hidden="true"></span>' :
            (item.type === 'image' ? '<span class="pt-image-placeholder">▧ تصویر</span>' :
            (item.type === 'table' ? '<strong>' + this.esc(item.text) + '</strong><table><thead><tr>' +
              (item.columns || []).map(col => '<th>' + this.esc(col) + '</th>').join('') + '</tr></thead><tbody>' +
              (item.rows || []).map(row => '<tr>' + row.map(cell => '<td>' + this.esc(cell) + '</td>').join('') + '</tr>').join('') +
              '</tbody></table>' : this.esc(item.text || ''))));
          return '<div class="pt-canvas-element pt-element-' + this.esc(item.type) + selected + '" data-pt-element="' + this.esc(item.id) +
            '" style="' + style + '"><div class="pt-element-content">' + label + '</div>' +
            (selected ? '<button type="button" data-pt-resize aria-label="تغییر اندازه"></button>' : '') + '</div>';
        }).join('') : (this.pdfDocument ? '' : '<div class="pt-canvas-empty">برای شروع، از نوار ابزار یک المان اضافه کن.</div>');
      });
      this.renderPageTabs(pageSpecs.length);
    },
    renderPageTabs: function (count) {
      const root = document.getElementById('pt-page-tabs');
      if (!root) return;
      if (count <= 1) { root.innerHTML = ''; return; }
      root.innerHTML = Array.from({length:count}, (_, index) =>
        '<button type="button" class="pt-page-tab ' + (index === Number(this.activePageIndex || 0) ? 'is-active' : '') +
        '" data-pt-page-tab="' + index + '">صفحه ' + (index + 1) + '</button>'
      ).join('');
      root.querySelectorAll('[data-pt-page-tab]').forEach(button => button.addEventListener('click', () => {
        this.activePageIndex = Number(button.dataset.ptPageTab);
        const page = document.querySelector('.pt-design-page[data-page-index="' + this.activePageIndex + '"]');
        if (page) page.scrollIntoView({behavior:'smooth',block:'center'});
        this.renderPageTabs(count);
      }));
    },
    renderPdfBackgrounds: async function () {
      const version = this.pdfRenderVersion;
      const root = document.getElementById('pt-design-canvas');
      if (!root || !this.pdfDocument) return;
      if (this.pdfPageObserver) this.pdfPageObserver.disconnect();
      const renderPage = async (pageNode) => {
        const index = Number(pageNode.dataset.pageIndex || 0);
        const canvas = pageNode.querySelector('.pt-pdf-background');
        if (!canvas || canvas.dataset.rendered === '1' || canvas.dataset.rendering === '1') return;
        canvas.dataset.rendering = '1';
        try {
          const page = await this.pdfDocument.getPage(index + 1);
          if (version !== this.pdfRenderVersion) return;
          const viewport = page.getViewport({scale:1});
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          const context = canvas.getContext('2d', {alpha:false});
          await page.render({canvasContext:context,viewport:viewport}).promise;
          if (version === this.pdfRenderVersion) canvas.dataset.rendered = '1';
        } catch (error) {
          this.setStatus('pt-pdf-status', 'نمایش صفحه ' + (index + 1) + ' از PDF ناموفق بود.', true);
        } finally {
          canvas.dataset.rendering = '0';
        }
      };
      if (window.IntersectionObserver) {
        const scrollRoot = root.closest('.pt-canvas-scroll');
        this.pdfPageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const canvas = entry.target.querySelector('.pt-pdf-background');
            if (entry.isIntersecting) renderPage(entry.target);
            else if (canvas && canvas.dataset.rendered === '1') {
              canvas.width = 0; canvas.height = 0; canvas.dataset.rendered = '0';
            }
          });
        }, {root:scrollRoot || null,rootMargin:'300px 0px',threshold:0.01});
        root.querySelectorAll('.pt-design-page').forEach(pageNode => this.pdfPageObserver.observe(pageNode));
      } else {
        const pages = Array.from(root.querySelectorAll('.pt-design-page'));
        for (const pageNode of pages) await renderPage(pageNode);
      }
    },
    handlePdfFile: async function (file) {
      if (!file) return;
      if ((file.type && file.type !== 'application/pdf') || !/\.pdf$/i.test(file.name || '')) {
        this.setStatus('pt-pdf-status', 'فقط فایل با پسوند PDF قابل انتخاب است.', true);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        this.setStatus('pt-pdf-status', 'حجم PDF نباید بیشتر از ۱۰ مگابایت باشد.', true);
        return;
      }
      if (!window.pdfjsLib) {
        this.setStatus('pt-pdf-status', 'کتابخانه نمایش PDF بارگذاری نشده است؛ صفحه را تازه‌سازی کن.', true);
        return;
      }
      this.setStatus('pt-pdf-status', 'در حال بررسی صفحات فایل PDF…');
      try {
        const buffer = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({data:new Uint8Array(buffer)}).promise;
        if (pdf.numPages < 1 || pdf.numPages > 50) throw new Error('تعداد صفحات PDF باید بین ۱ تا ۵۰ صفحه باشد.');
        const pages = [];
        for (let index = 1; index <= pdf.numPages; index++) {
          const page = await pdf.getPage(index);
          const viewport = page.getViewport({scale:1});
          pages.push({widthMm:Number((viewport.width * 25.4 / 72).toFixed(3)),
            heightMm:Number((viewport.height * 25.4 / 72).toFixed(3)),rotation:Number(page.rotate || 0)});
        }
        this.pdfDocument = pdf;
        this.pdfFile = file;
        this.pdfRenderVersion++;
        this.activePageIndex = 0;
        this.definition = this.definition || this.blankDefinition();
        this.definition.pdf = {pageCount:pages.length,pages:pages};
        this.history = []; this.historyIndex = -1;
        this.renderEditor(); this.commitHistory();
        this.setStatus('pt-pdf-status', 'PDF آماده است: ' + file.name + ' · ' + pages.length + ' صفحه. برای ثبت دائمی، قالب را ذخیره کن.');
      } catch (error) {
        this.pdfFile = null;
        this.setStatus('pt-pdf-status', error.message || 'خواندن فایل PDF ناموفق بود.', true);
      }
    },
    loadTemplatePdf: async function (templateId, metadata) {
      if (!metadata || !metadata.HasFile) return;
      if (!window.pdfjsLib) throw new Error('کتابخانه نمایش PDF بارگذاری نشده است.');
      this.setStatus('pt-pdf-status', 'در حال دریافت PDF ذخیره‌شده…');
      const response = await PMS.Api.get('/print-templates/' + encodeURIComponent(templateId) + '/pdf', {trackSync:false});
      const file = this.extract(response) || {};
      const binary = atob(String(file.base64 || '').replace(/^data:[^,]*;base64,/, ''));
      const bytes = new Uint8Array(binary.length);
      for (let index=0; index<binary.length; index++) bytes[index] = binary.charCodeAt(index);
      const pdf = await window.pdfjsLib.getDocument({data:bytes}).promise;
      if (pdf.numPages > 50) throw new Error('تعداد صفحات PDF از سقف مجاز بیشتر است.');
      const pages = [];
      for (let index=1; index<=pdf.numPages; index++) {
        const page = await pdf.getPage(index);
        const viewport = page.getViewport({scale:1});
        pages.push({widthMm:Number((viewport.width*25.4/72).toFixed(3)),heightMm:Number((viewport.height*25.4/72).toFixed(3)),rotation:Number(page.rotate||0)});
      }
      this.pdfDocument = pdf;
      this.pdfFile = null;
      this.pdfRenderVersion++;
      this.definition.pdf = {pageCount:pages.length,pages:pages};
      this.activePageIndex = 0;
      this.setStatus('pt-pdf-status', 'PDF ذخیره‌شده بارگذاری شد: ' + (file.fileName || metadata.FileName || 'قالب') + ' · ' + pages.length + ' صفحه.');
    },
    fileToBase64: async function (file) {
      const bytes = new Uint8Array(await file.arrayBuffer());
      let binary = '';
      const chunkSize = 0x8000;
      for (let offset=0; offset<bytes.length; offset+=chunkSize) {
        binary += String.fromCharCode.apply(null, bytes.subarray(offset, Math.min(offset+chunkSize, bytes.length)));
      }
      return btoa(binary);
    },
    renderLayers: function () {
      const root = document.getElementById('pt-layer-list');
      if (!root) return;
      const elements = (this.definition && this.definition.elements) || [];
      root.innerHTML = elements.length ? elements.map(item => '<button type="button" class="pt-layer-item ' +
        (String(item.id) === String(this.selectedElementId) ? 'is-active' : '') + '" data-pt-layer="' + this.esc(item.id) + '">' +
        this.esc(item.text || item.type) + '</button>').join('') : '<p class="text-muted">هنوز المانی وجود ندارد.</p>';
      root.querySelectorAll('[data-pt-layer]').forEach(button => button.addEventListener('click', () => this.selectElement(button.dataset.ptLayer)));
    },
    renderEditor: function () {
      this.syncPageControls();
      this.renderCanvas(); this.renderInspector(); this.renderLayers();
    },
    commitHistory: function () {
      if (!this.definition) return;
      const snapshot = JSON.stringify(this.definition);
      if (this.history[this.historyIndex] === snapshot) return;
      this.history = this.history.slice(0, this.historyIndex + 1);
      this.history.push(snapshot);
      if (this.history.length > 60) this.history.shift();
      this.historyIndex = this.history.length - 1;
      this.setStatus('pt-editor-status', 'تغییرات طراحی ثبت شد؛ برای ماندگاری، قالب را ذخیره کن.');
    },
    restoreHistory: function (index) {
      if (index < 0 || index >= this.history.length) return;
      this.historyIndex = index;
      this.definition = JSON.parse(this.history[index]);
      this.renderEditor();
    },
    undo: function () { this.restoreHistory(this.historyIndex - 1); },
    redo: function () { this.restoreHistory(this.historyIndex + 1); },
    initLibrary: async function () {
      const form = document.getElementById('pt-template-form');
      if (form) form.addEventListener('submit', (event) => { event.preventDefault(); this.saveTemplate(); });
      const reset = document.getElementById('pt-template-reset');
      if (reset) reset.addEventListener('click', () => this.resetForm());
      const resetSecondary = document.getElementById('pt-template-reset-secondary');
      if (resetSecondary) resetSecondary.addEventListener('click', () => this.resetForm());
      this.bindEditor();
      const pdfInput = document.getElementById('pt-pdf-file');
      if (pdfInput) pdfInput.addEventListener('change', () => this.handlePdfFile(pdfInput.files && pdfInput.files[0]));
      if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      await this.loadLibrary();
      this.syncPageControls();
      this.renderEditor();
    },
    loadLibrary: async function () {
      this.setStatus('pt-library-status', 'در حال دریافت کتابخانه قالب‌ها و منابع داده…');
      const results = await Promise.allSettled([
        PMS.Api.get('/print-templates'),
        PMS.Api.get('/print-templates/sources')
      ]);
      if (results[0].status === 'fulfilled') {
        this.templates = this.list(results[0].value);
        this.renderLibrary();
        this.setStatus('pt-library-status', this.templates.length ? this.templates.length + ' قالب در کتابخانه وجود دارد.' : 'هنوز قالبی ساخته نشده است.');
      } else {
        this.templates = [];
        this.renderLibrary();
        this.setStatus('pt-library-status', results[0].reason && results[0].reason.message || 'دریافت کتابخانه قالب‌ها ناموفق بود.', true);
      }
      if (results[1].status === 'fulfilled') {
        const sources = this.extract(results[1].value) || {};
        this.sources = {
          projectFields: Array.isArray(sources.projectFields) ? sources.projectFields : [],
          informationTypes: Array.isArray(sources.informationTypes) ? sources.informationTypes : [],
          forms: Array.isArray(sources.forms) ? sources.forms : []
        };
        this.sourceError = '';
      } else {
        this.sources = { projectFields: [], informationTypes: [], forms: [] };
        this.sourceError = results[1].reason && results[1].reason.message || 'دریافت منابع داده ناموفق بود.';
      }
      this.renderSources();
      this.renderBindings();
      this.renderInspector();
    },
    renderLibrary: function () {
      const list = document.getElementById('pt-template-list');
      if (list) {
        list.innerHTML = this.templates.length ? this.templates.map((item) =>
          '<article class="pt-template-card"><div class="pt-template-card-main"><strong>' + this.esc(item.Name) +
          '</strong><span class="pt-template-code">' + this.esc(item.Code) + '</span><p>' +
          this.esc(item.Description || 'بدون توضیحات') + '</p><small>نسخه ' + this.esc(item.Version || 1) +
          ' · ' + ((item.Definition && item.Definition.bindings) || []).length + ' منبع داده</small></div>' +
          '<div class="pt-template-actions"><button type="button" class="btn btn-secondary" data-pt-edit="' + this.esc(item.ID) + '">ویرایش مشخصات</button>' +
          '<button type="button" class="btn btn-danger" data-pt-delete="' + this.esc(item.ID) + '">غیرفعال‌سازی</button></div></article>'
        ).join('') : '<div class="pt-empty-state">قالبی ثبت نشده است. اولین قالب را از فرم زیر ایجاد کن.</div>';
        list.querySelectorAll('[data-pt-edit]').forEach(button => button.addEventListener('click', () => this.editTemplate(button.dataset.ptEdit)));
        list.querySelectorAll('[data-pt-delete]').forEach(button => button.addEventListener('click', () => this.deleteTemplate(button.dataset.ptDelete)));
      }
      this.renderSources();
      this.renderBindings();
    },
    renderSources: function () {
      const roots = ['pt-source-list','pt-editor-source-list'].map(id => document.getElementById(id)).filter(Boolean);
      if (!roots.length) return;
      const groups = [];
      (this.sources.projectFields || []).forEach(source => groups.push({
        key: 'project|' + source.field, label: source.label, detail: 'اطلاعات پایه پروژه',
        binding: { id: 'project_' + source.field, sourceType: 'PROJECT_FIELD', field: source.field }
      }));
      (this.sources.informationTypes || []).forEach(source => groups.push({
        key: 'info|' + source.ID, label: source.Name, detail: 'اطلاعات مرکزی · ' + source.Code,
        binding: { id: 'info_' + source.ID, sourceType: 'PROJECT_INFORMATION', informationTypeId: source.ID }
      }));
      (this.sources.forms || []).forEach(form => (form.Fields || []).forEach(field => groups.push({
        key: 'form|' + form.ID + '|' + field.ID, label: field.Name,
        detail: 'فرم ' + form.Name + ' · ' + field.Code,
        binding: { id: 'form_' + form.ID + '_' + field.ID, sourceType: 'EVENT_FORM_FIELD',
          formId: form.ID, fieldId: field.ID, informationTypeId: field.InformationTypeID, selection: 'LATEST' }
      })));
      const markup = this.sourceError
        ? '<p class="pt-empty-state is-error">' + this.esc(this.sourceError) + '</p>'
        : (groups.length ? groups.map((item, index) =>
          '<div class="pt-source-row"><div><strong>' + this.esc(item.label) + '</strong><small>' + this.esc(item.detail) +
          '</small></div><button type="button" class="btn btn-secondary btn-sm" data-pt-add-source="' + index + '">اتصال</button></div>'
        ).join('') : '<p class="pt-empty-state">منبع داده فعالی پیدا نشد. اطلاعات مرکزی یا فرم فعال تعریف کن.</p>');
      roots.forEach(root => {
        root.innerHTML = markup;
        root.querySelectorAll('[data-pt-add-source]').forEach(button => button.addEventListener('click', () => {
          const item = groups[Number(button.dataset.ptAddSource)];
          if (item) this.addBinding(item.binding, item.label);
        }));
      });
      const count = document.getElementById('pt-source-count');
      if (count) count.textContent = this.sourceError ? 'خطا در دریافت منابع' : (groups.length + ' منبع قابل اتصال');
    },
    addBinding: function (binding, label) {
      if (!this.definition) this.definition = this.blankDefinition();
      if (this.definition.bindings.some(item => item.id === binding.id)) {
        this.setStatus('pt-form-status', 'این منبع قبلاً به قالب اضافه شده است.');
        return;
      }
      this.definition.bindings.push(Object.assign({}, binding, { label: label }));
      this.renderBindings(); this.renderInspector(); this.renderCanvas(); this.commitHistory();
      this.setStatus('pt-form-status', 'منبع داده متصل شد؛ اکنون از فهرست ویژگی‌های المان آن را انتخاب کن.');
    },
    renderBindings: function () {
      const root = document.getElementById('pt-binding-list');
      if (!root) return;
      const bindings = this.definition && Array.isArray(this.definition.bindings) ? this.definition.bindings : [];
      root.innerHTML = bindings.length ? bindings.map((item, index) =>
        '<div class="pt-binding-row"><div><strong>' + this.esc(item.label || item.id) +
        '</strong><small>' + this.esc(item.sourceType) + '</small></div><button type="button" class="btn btn-quiet btn-sm" data-pt-remove-binding="' +
        index + '" aria-label="حذف منبع">حذف</button></div>'
      ).join('') : '<p class="pt-empty-state">هنوز منبع داده‌ای انتخاب نشده است.</p>';
      root.querySelectorAll('[data-pt-remove-binding]').forEach(button => button.addEventListener('click', () => {
        const removed = this.definition.bindings.splice(Number(button.dataset.ptRemoveBinding), 1)[0];
        if (removed) this.definition.elements.forEach(element => {
          if (element.bindingId === removed.id) element.bindingId = '';
        });
        this.renderBindings(); this.renderEditor(); this.commitHistory();
      }));
    },
    resetForm: function () {
      const form = document.getElementById('pt-template-form');
      if (form) form.reset();
      this.editingId = '';
      if (this.pdfPageObserver) this.pdfPageObserver.disconnect();
      this.pdfDocument = null; this.pdfFile = null; this.pdfRenderVersion++; this.activePageIndex = 0;
      const pdfInput = document.getElementById('pt-pdf-file'); if (pdfInput) pdfInput.value = '';
      this.definition = this.blankDefinition();
      this.history = []; this.historyIndex = -1; this.selectedElementId = '';
      const code = document.getElementById('pt-template-code');
      if (code) code.disabled = false;
      const title = document.getElementById('pt-editor-title');
      if (title) title.textContent = 'ساخت قالب جدید';
      this.renderBindings(); this.renderEditor(); this.commitHistory();
      this.setStatus('pt-form-status', '');
    },
    editTemplate: async function (id) {
      try {
        const response = await PMS.Api.get('/print-templates/' + encodeURIComponent(id));
        const item = this.extract(response);
        this.editingId = item.ID;
        this.definition = item.Definition || this.blankDefinition();
        this.pdfDocument = null; this.pdfFile = null; this.pdfRenderVersion++; this.activePageIndex = 0;
        if (item.Pdf && item.Pdf.HasFile) await this.loadTemplatePdf(item.ID, item.Pdf);
        const pdfInput = document.getElementById('pt-pdf-file'); if (pdfInput) pdfInput.value = '';
        this.history = []; this.historyIndex = -1; this.selectedElementId = '';
        document.getElementById('pt-template-code').value = item.Code || '';
        document.getElementById('pt-template-code').disabled = true;
        document.getElementById('pt-template-name').value = item.Name || '';
        document.getElementById('pt-template-description').value = item.Description || '';
        const title = document.getElementById('pt-editor-title');
        if (title) title.textContent = 'ویرایش قالب: ' + item.Name;
        this.renderBindings();
        this.renderEditor();
        this.commitHistory();
        document.getElementById('pt-template-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (error) {
        this.setStatus('pt-library-status', error.message || 'دریافت قالب ناموفق بود.', true);
      }
    },
    saveTemplate: async function () {
      if (this.busy) return;
      const form = document.getElementById('pt-template-form');
      if (!form) return;
      const body = {
        Code: document.getElementById('pt-template-code').value.trim(),
        Name: document.getElementById('pt-template-name').value.trim(),
        Description: document.getElementById('pt-template-description').value.trim(),
        Definition: this.definition || this.blankDefinition()
      };
      this.busy = true;
      this.setStatus('pt-form-status', 'در حال ذخیره قالب…');
      try {
        const wasNew = !this.editingId;
        let templateId = this.editingId;
        if (wasNew) {
          const createBody = this.pdfFile ? Object.assign({}, body, {Definition:this.blankDefinition()}) : body;
          const created = await PMS.Api.post('/print-templates', createBody);
          const createdData = this.extract(created) || {};
          templateId = createdData.ID;
          if (!templateId) throw new Error('قالب ایجاد شد اما شناسه آن دریافت نشد.');
          this.editingId = templateId;
        }
        if (this.pdfFile) {
          await PMS.Api.post('/print-templates/' + encodeURIComponent(templateId) + '/pdf', {
            fileName: this.pdfFile.name, mimeType: 'application/pdf',
            base64: await this.fileToBase64(this.pdfFile),
            pageCount: Number(this.definition.pdf && this.definition.pdf.pages ? this.definition.pdf.pages.length : 0),
            Definition: this.definition
          });
        } else if (!wasNew) {
          await PMS.Api.put('/print-templates/' + encodeURIComponent(templateId), body);
        }
        this.resetForm();
        await this.loadLibrary();
        this.setStatus('pt-library-status', 'قالب با موفقیت ذخیره شد.');
      } catch (error) {
        this.setStatus('pt-form-status', error.message || 'ذخیره قالب ناموفق بود.', true);
      } finally { this.busy = false; }
    },
    deleteTemplate: async function (id) {
      const item = this.templates.find(row => String(row.ID) === String(id));
      if (!item || !window.confirm('قالب «' + item.Name + '» غیرفعال شود؟')) return;
      try {
        await PMS.Api.delete('/print-templates/' + encodeURIComponent(id));
        await this.loadLibrary();
        this.setStatus('pt-library-status', 'قالب غیرفعال شد.');
      } catch (error) {
        this.setStatus('pt-library-status', error.message || 'غیرفعال‌سازی قالب ناموفق بود.', true);
      }
    },
    initOutput: async function () {
      const button = document.getElementById('pt-output-resolve');
      const printButton = document.getElementById('pt-output-print');
      if (button) button.addEventListener('click', () => this.resolveOutput());
      if (printButton) printButton.addEventListener('click', () => this.printOutput());
      await this.loadOutputOptions();
    },
    loadOutputOptions: async function () {
      this.setStatus('pt-output-status', 'در حال دریافت قالب‌ها و پروژه‌ها…');
      try {
        const results = await Promise.all([PMS.Api.get('/print-templates'), PMS.Api.get('/projects')]);
        const templates = this.list(results[0]);
        const projects = this.list(results[1], ['items','Items','projects','Projects']);
        this.outputTemplates = templates;
        const templateSelect = document.getElementById('pt-output-template');
        const projectSelect = document.getElementById('pt-output-project');
        if (templateSelect) templateSelect.innerHTML = '<option value="">انتخاب قالب</option>' + templates.map(item =>
          '<option value="' + this.esc(item.ID) + '">' + this.esc(item.Name) + ' · نسخه ' + this.esc(item.Version || 1) + '</option>'
        ).join('');
        if (projectSelect) projectSelect.innerHTML = '<option value="">انتخاب پروژه</option>' + projects.map(item =>
          '<option value="' + this.esc(item.ID) + '">' + this.esc(item.ProjectCode || item.Code || 'بدون کد') + ' — ' +
          this.esc(item.Title || item.Name || item.ID) + '</option>'
        ).join('');
        this.setStatus('pt-output-status', 'قالب و پروژه را انتخاب کن؛ سپس پیش‌نمایش سند را بساز.');
      } catch (error) {
        this.setStatus('pt-output-status', error.message || 'دریافت فهرست‌ها ناموفق بود.', true);
      }
    },
    formatOutputValue: function (value) {
      if (value === null || value === undefined || value === '') return '';
      if (Array.isArray(value)) return value.map(item => this.formatOutputValue(item)).join('، ');
      if (typeof value === 'object') return Object.keys(value).filter(key => !/attachment|mime|filesize/i.test(key))
        .map(key => this.formatOutputValue(value[key])).filter(Boolean).join(' — ');
      return String(value);
    },
    findImageAttachment: function (value) {
      if (!value) return null;
      if (Array.isArray(value)) {
        for (const item of value) { const found = this.findImageAttachment(item); if (found) return found; }
        return null;
      }
      if (typeof value !== 'object') return null;
      const mime = String(value.MimeType || value.mimeType || '').toLowerCase();
      const explicitAttachmentId = value.AttachmentID || value.attachmentId || value.attachmentID;
      const id = explicitAttachmentId || ((mime.indexOf('image/') === 0) ? (value.ID || value.Id) : '');
      if (id && (!mime || mime.indexOf('image/') === 0)) return { id: String(id), mime: mime || 'image/jpeg' };
      for (const key of Object.keys(value)) {
        const found = this.findImageAttachment(value[key]);
        if (found) return found;
      }
      return null;
    },
    loadOutputImage: async function (value) {
      const attachment = this.findImageAttachment(value);
      if (!attachment) return '';
      const response = await PMS.Api.get('/attachments/' + encodeURIComponent(attachment.id) + '/download', { trackSync: false });
      const file = this.extract(response) || {};
      const base64 = file.Base64 || file.base64;
      if (!base64) throw new Error('محتوای تصویر پیوست دریافت نشد.');
      const mime = String(file.MimeType || file.mimeType || attachment.mime || 'image/jpeg').toLowerCase();
      if (mime.indexOf('image/') !== 0) throw new Error('فایل متصل‌شده تصویر معتبر نیست.');
      return 'data:' + mime + ';base64,' + String(base64).replace(/^data:[^,]*;base64,/, '');
    },
    loadOutputPdfPages: async function (templateId, definition) {
      const metadata = definition && definition.pdf;
      if (!metadata || !Array.isArray(metadata.pages) || !metadata.pages.length) return null;
      if (!window.pdfjsLib || typeof window.pdfjsLib.getDocument !== 'function') {
        throw new Error('موتور نمایش PDF بارگذاری نشده است؛ صفحه را تازه‌سازی کن و دوباره تلاش کن.');
      }
      const response = await PMS.Api.get('/print-templates/' + encodeURIComponent(templateId) + '/pdf', { trackSync: false });
      const file = this.extract(response) || {};
      const base64 = String(file.base64 || file.Base64 || '').replace(/^data:application\/pdf;base64,/i, '').replace(/\s/g, '');
      if (!base64) throw new Error('فایل پس‌زمینه PDF از فضای ذخیره‌سازی دریافت نشد.');
      const binary = window.atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const pdf = await window.pdfjsLib.getDocument({ data: bytes }).promise;
      if (pdf.numPages !== metadata.pages.length) {
        throw new Error('تعداد صفحات فایل PDF با مشخصات قالب یکسان نیست؛ قالب را دوباره ذخیره کن.');
      }
      const rendered = [];
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = Math.min(2, 1800 / baseViewport.width, 2400 / baseViewport.height);
        const viewport = page.getViewport({ scale: Math.max(1, scale) });
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const context = canvas.getContext('2d', { alpha: false });
        if (!context) throw new Error('امکان آماده‌سازی تصویر صفحه PDF وجود ندارد.');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: context, viewport: viewport }).promise;
        const pageMeta = metadata.pages[pageNumber - 1] || {};
        rendered.push({
          width: Number(pageMeta.widthMm) || (baseViewport.width * 25.4 / 72),
          height: Number(pageMeta.heightMm) || (baseViewport.height * 25.4 / 72),
          background: canvas.toDataURL('image/png')
        });
        canvas.width = 0;
        canvas.height = 0;
        if (typeof page.cleanup === 'function') page.cleanup();
      }
      if (typeof pdf.destroy === 'function') await pdf.destroy();
      return rendered;
    },
    renderOutputDocument: async function (template, project, data) {
      const definition = template && template.Definition ? template.Definition : {};
      const pdfPages = template && template.Pdf && template.Pdf.HasFile
        ? await this.loadOutputPdfPages(template.ID, definition) : null;
      const page = definition.page || {};
      const sizes = {A4:[210,297],A5:[148,210],LETTER:[216,279]};
      const base = sizes[String(page.size || 'A4').toUpperCase()] || sizes.A4;
      const landscape = String(page.orientation || 'portrait').toLowerCase() === 'landscape';
      const defaultSpec = { width: landscape ? base[1] : base[0], height: landscape ? base[0] : base[1] };
      const pageSpecs = pdfPages && pdfPages.length ? pdfPages.map(item => ({width:item.width,height:item.height})) : [defaultSpec];
      this.outputPageSpecs = pageSpecs;
      this.outputPageSpec = pageSpecs[0];
      const bindings = Object.create(null);
      (definition.bindings || []).forEach(binding => { bindings[binding.id] = binding; });
      const renderElement = async item => {
        const binding = bindings[item.bindingId];
        const raw = binding ? data[item.bindingId] : null;
        const imageAttachment = this.findImageAttachment(raw);
        const isImage = item.type === 'image' || !!imageAttachment;
        const value = binding ? this.formatOutputValue(raw) : (item.text || '');
        const style = 'left:'+Number(item.x||0)+'mm;top:'+Number(item.y||0)+'mm;width:'+Number(item.width||30)+'mm;min-height:'+Number(item.height||15)+'mm;font-size:'+Number(item.fontSize||12)+'pt;text-align:'+this.esc(item.align||'right')+';color:'+this.esc(item.color||'#1f2937')+';background:'+this.esc(item.background||'transparent')+';';
        if (isImage) {
          let image = '';
          if (imageAttachment) {
            try {
              const src = await this.loadOutputImage(raw);
              image = '<img class="pt-output-image-content" src="' + src + '" alt="' + this.esc(imageAttachment.id) + '">';
            } catch (error) {
              image = '<div class="pt-output-image pt-output-image-error">بارگذاری تصویر ناموفق بود</div>';
            }
          } else {
            image = '<div class="pt-output-image pt-output-image-empty" aria-hidden="true"></div>';
          }
          return '<div class="pt-output-element pt-output-image-frame" style="'+style+'">'+image+'</div>';
        }
        if (item.type === 'table') {
          const rows = Array.isArray(raw) ? raw : (item.rows || []);
          const columns = item.columns || [];
          const tableRows = rows.map(row => {
            const cells = Array.isArray(row) ? row : (row && typeof row === 'object' ? Object.values(row) : [row]);
            return '<tr>'+columns.map((_,i)=>'<td>'+this.esc(this.formatOutputValue(cells[i]))+'</td>').join('')+'</tr>';
          }).join('');
          return '<div class="pt-output-element pt-output-table" style="'+style+'"><strong>'+this.esc(item.text||'')+'</strong><table><thead><tr>'+columns.map(col=>'<th>'+this.esc(col)+'</th>').join('')+'</tr></thead><tbody>'+tableRows+'</tbody></table></div>';
        }
        if (item.type === 'line' || item.type === 'divider') return '<div class="pt-output-element pt-output-shape pt-output-'+item.type+'" style="'+style+'" aria-hidden="true"></div>';
        if (item.type === 'rectangle' || item.type === 'ellipse') return '<div class="pt-output-element pt-output-shape pt-output-'+item.type+'" style="'+style+'" aria-hidden="true"></div>';
        return '<div class="pt-output-element" style="'+style+'">'+this.esc(value)+'</div>';
      };
      const pages = [];
      for (let pageIndex = 0; pageIndex < pageSpecs.length; pageIndex++) {
        const spec = pageSpecs[pageIndex];
        const pageElements = (definition.elements || []).filter(item => Number(item.pageIndex || 0) === pageIndex);
        const elements = await Promise.all(pageElements.map(renderElement));
        const background = pdfPages && pdfPages[pageIndex]
          ? '<img class="pt-output-pdf-background" src="'+pdfPages[pageIndex].background+'" alt="" aria-hidden="true">'
          : '';
        // Mobile print dialogs may ignore CSS @page custom dimensions and keep Letter paper.
        // Fit the complete PDF page (background and positioned overlays together) inside a safe
        // area that fits both Letter and A4, while preserving its original preview dimensions.
        const fitScale = pdfPages
          ? Math.min(1, 203 / Math.max(1, spec.width), 272 / Math.max(1, spec.height))
          : 1;
        const printWidth = spec.width * fitScale;
        const printHeight = spec.height * fitScale;
        const pageStyle = 'width:'+spec.width+'mm;height:'+spec.height+'mm;--pt-print-scale:'+fitScale+
          ';--pt-print-width:'+printWidth+'mm;--pt-print-height:'+printHeight+'mm';
        const pageContent = '<div class="pt-print-page-content" style="width:'+spec.width+'mm;height:'+spec.height+'mm">'+background+elements.join('')+'</div>';
        pages.push('<article class="pt-print-page'+(pdfPages ? ' pt-has-pdf' : '')+'" data-page-index="'+pageIndex+'" style="'+pageStyle+'" dir="rtl">'+pageContent+'</article>');
      }
      return pages.join('');
    },
    printOutput: async function () {
      const specs = this.outputPageSpecs && this.outputPageSpecs.length
        ? this.outputPageSpecs : [this.outputPageSpec || { width: 210, height: 297 }];
      let printStyle = document.getElementById('pt-output-page-rule');
      if (!printStyle) {
        printStyle = document.createElement('style');
        printStyle.id = 'pt-output-page-rule';
        document.head.appendChild(printStyle);
      }
      // Let the mobile print service choose its paper (often Letter); each PDF page is
      // pre-fitted to a safe common printable area so no page can spill onto a second sheet.
      printStyle.textContent = '@page{margin:0}';
      document.body.classList.add('pt-printing');
      const images = Array.from(document.querySelectorAll('#pt-output-preview img'));
      await Promise.all(images.map(image => image.decode ? image.decode().catch(() => {}) : Promise.resolve()));
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      window.print();
      window.setTimeout(() => document.body.classList.remove('pt-printing'), 1500);
    },
    resolveOutput: async function () {
      const templateId = document.getElementById('pt-output-template').value;
      const projectId = document.getElementById('pt-output-project').value;
      if (!templateId || !projectId) {
        this.setStatus('pt-output-status', 'انتخاب قالب و پروژه الزامی است.', true);
        return;
      }
      const button = document.getElementById('pt-output-resolve');
      if (button) button.disabled = true;
      this.setStatus('pt-output-status', 'در حال دریافت اطلاعات پروژه و پاسخ فرم‌ها…');
      try {
        const response = await PMS.Api.post('/print-templates/' + encodeURIComponent(templateId) + '/resolve', { ProjectID: projectId });
        const result = this.extract(response) || {};
        const data = result.data || {};
        const template = (this.outputTemplates || []).find(item => String(item.ID) === String(templateId));
        const project = result.project || {};
        const preview = document.getElementById('pt-output-preview');
        const card = document.getElementById('pt-output-preview-card');
        if (!template || !template.Definition) throw new Error('ساختار قالب برای تولید سند در دسترس نیست.');
        if (preview) preview.innerHTML = await this.renderOutputDocument(template, project, data);
        if (card) card.hidden = false;
        const printButton = document.getElementById('pt-output-print');
        if (printButton) printButton.hidden = false;
        const root = document.getElementById('pt-output-data');
        const keys = Object.keys(data);
        if (root) root.innerHTML = keys.length ? '<div class="pt-resolved-list">' +
          keys.map(key => '<div class="pt-resolved-row"><strong>' + this.esc(key) + '</strong><pre>' +
            this.esc(typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key], null, 2)) +
            '</pre></div>').join('') + '</div>' : '<div class="pt-empty-state">این قالب منبع داده‌ای ندارد.</div>';
        this.setStatus('pt-output-status', 'پیش‌نمایش سند آماده است؛ برای چاپ یا ذخیره PDF از دکمه مربوط استفاده کن.');
      } catch (error) {
        this.setStatus('pt-output-status', error.message || 'ساخت پیش‌نمایش سند ناموفق بود.', true);
      } finally { if (button) button.disabled = false; }
    }
  };
  PMS.Modules = PMS.Modules || {};
  PMS.Modules.PrintDesigner = PrintDesigner;
})();