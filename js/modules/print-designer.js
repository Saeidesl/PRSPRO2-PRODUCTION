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
    outputMargins: { top: 8, bottom: 8, right: 8, left: 8 },
    outputMarginStorageKey: 'PMS_PRINT_OUTPUT_MARGINS_V1',
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
        this.setStatus('pt-pdf-status', 'فقط فایل PDF داخلی برای پردازش پذیرفته می‌شود.', true);
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
        const smartButton = document.getElementById('pt-smart-detect'); if (smartButton) smartButton.disabled = false;
        this.history = []; this.historyIndex = -1;
        this.renderEditor(); this.commitHistory();
        this.setStatus('pt-pdf-status', 'PDF آماده است: ' + file.name + ' · ' + pages.length + ' صفحه. برای ثبت دائمی، قالب را ذخیره کن.');
      } catch (error) {
        this.pdfFile = null;
        this.setStatus('pt-pdf-status', error.message || 'خواندن فایل PDF ناموفق بود.', true);
      }
    },
    loadExternalScript: function (src, globalName) {
      if (window[globalName]) return Promise.resolve(window[globalName]);
      const existing = document.querySelector('script[data-pt-loader="' + globalName + '"]');
      if (existing) return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(window[globalName]), {once:true});
        existing.addEventListener('error', () => reject(new Error('بارگذاری کتابخانه تحلیل سند ناموفق بود.')), {once:true});
      });
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.dataset.ptLoader = globalName;
        script.onload = () => window[globalName] ? resolve(window[globalName]) : reject(new Error('کتابخانه موردنیاز در دسترس نیست.'));
        script.onerror = () => reject(new Error('بارگذاری کتابخانه تحلیل سند ناموفق بود.'));
        document.head.appendChild(script);
      });
    },
    imageFileToPdf: async function (file) {
      if (file.size > 10 * 1024 * 1024) throw new Error('حجم تصویر نباید بیشتر از ۱۰ مگابایت باشد.');
      await this.loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js', 'jspdf');
      const image = await createImageBitmap(file);
      try {
        const maxDimension = 2400;
        const ratio = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * ratio));
        canvas.height = Math.max(1, Math.round(image.height * ratio));
        const context = canvas.getContext('2d', {alpha:false});
        if (!context) throw new Error('آماده‌سازی تصویر در این مرورگر ممکن نیست.');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const widthMm = Number((canvas.width * 25.4 / 150).toFixed(2));
        const heightMm = Number((canvas.height * 25.4 / 150).toFixed(2));
        const orientation = widthMm > heightMm ? 'landscape' : 'portrait';
        const pdf = new window.jspdf.jsPDF({orientation:orientation,unit:'mm',format:[widthMm,heightMm],compress:true});
        pdf.addImage(canvas.toDataURL('image/jpeg',0.92),'JPEG',0,0,widthMm,heightMm,undefined,'FAST');
        const blob = pdf.output('blob');
        if (blob.size > 10 * 1024 * 1024) throw new Error('حجم PDF ساخته‌شده از تصویر بیشتر از ۱۰ مگابایت است.');
        const name = String(file.name || 'factory-form').replace(/\.[^.]+$/,'') + '.pdf';
        return new File([blob],name,{type:'application/pdf',lastModified:Date.now()});
      } finally {
        if (image && typeof image.close === 'function') image.close();
      }
    },
    handleImportFile: async function (file) {
      if (!file) return;
      const name = String(file.name || '');
      const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(name);
      const isImage = /^image\/(jpeg|png|webp)$/i.test(file.type || '') || /\.(jpe?g|png|webp)$/i.test(name);
      if (isPdf) return this.handlePdfFile(file);
      if (!isImage) {
        this.setStatus('pt-pdf-status','فرمت مجاز: PDF، JPG، PNG یا WebP.',true);
        return;
      }
      const input = document.getElementById('pt-pdf-file');
      this.setStatus('pt-pdf-status','در حال تبدیل تصویر به سند PDF برای حفظ کیفیت و استفاده از مسیر ذخیره‌سازی امن…');
      try {
        const pdfFile = await this.imageFileToPdf(file);
        if (input) input.dataset.originalImageName = name;
        await this.handlePdfFile(pdfFile);
        if (this.pdfDocument) this.setStatus('pt-pdf-status','تصویر با موفقیت به یک صفحه PDF تبدیل شد؛ اکنون می‌توانی تشخیص هوشمند را اجرا کنی.');
      } catch (error) {
        this.setStatus('pt-pdf-status',error.message || 'تبدیل تصویر ناموفق بود.',true);
      }
    },
    normalizeSmartText: function (value) {
      return String(value || '').toLowerCase().replace(/[\u0640\u200c\s:：،,؛;._-]+/g,'').replace(/[ي]/g,'ی').replace(/[ك]/g,'ک');
    },
    smartSourceCatalog: function () {
      const groups = [];
      (this.sources.projectFields || []).forEach(source => groups.push({label:source.label,binding:{id:'project_'+source.field,sourceType:'PROJECT_FIELD',field:source.field}}));
      (this.sources.informationTypes || []).forEach(source => groups.push({label:source.Name,binding:{id:'info_'+source.ID,sourceType:'PROJECT_INFORMATION',informationTypeId:source.ID}}));
      (this.sources.forms || []).forEach(form => (form.Fields || []).forEach(field => groups.push({
        label:field.Name,binding:{id:'form_'+form.ID+'_'+field.ID,sourceType:'EVENT_FORM_FIELD',formId:form.ID,fieldId:field.ID,informationTypeId:field.InformationTypeID,selection:'LATEST'}
      })));
      return groups.filter(item => item.label && item.binding && item.binding.id);
    },
    suggestSmartBinding: function (label, catalog) {
      const key = this.normalizeSmartText(label);
      if (!key) return null;
      const exact = catalog.find(item => this.normalizeSmartText(item.label) === key);
      if (exact) return exact;
      const aliases = [
        {terms:['نامپروژه','عنوانپروژه','پروژه'],hint:['نامپروژه','عنوانپروژه']},
        {terms:['کدپروژه','شمارهپروژه','کد'],hint:['کدپروژه','شمارهپروژه']},
        {terms:['تعداد','مقدار','تیراژ'],hint:['تعداد','مقدار','تیراژ']},
        {terms:['تاریخ','زمان'],hint:['تاریخ','زمان']},
        {terms:['رنگ','رنگبندی'],hint:['رنگ']},
        {terms:['سایز','اندازه'],hint:['سایز','اندازه']},
        {terms:['توضیحات','شرح'],hint:['توضیحات','شرح']}
      ];
      const alias = aliases.find(item => item.terms.some(term => key.includes(term)));
      if (!alias) return null;
      return catalog.find(item => alias.hint.some(term => this.normalizeSmartText(item.label).includes(term))) || null;
    },
    groupSmartTextLines: function (items) {
      const lines = [];
      items.filter(item => item.text && String(item.text).trim()).sort((a,b) => a.y-b.y || a.x-b.x).forEach(item => {
        let line = lines.find(entry => Math.abs(entry.y-item.y) <= 2.8);
        if (!line) { line={y:item.y,x:item.x,width:item.width,height:item.height,parts:[]}; lines.push(line); }
        line.parts.push(item);
        line.x = Math.min(line.x,item.x);
        line.y = Math.min(line.y,item.y);
        line.width = Math.max(line.x+line.width,item.x+item.width)-line.x;
        line.height = Math.max(line.height,item.height);
      });
      return lines.map(line => ({
        text:line.parts.sort((a,b)=>a.x-b.x).map(item=>item.text).join(' ').replace(/\s+/g,' ').trim(),
        x:line.x,y:line.y,width:line.width,height:line.height
      })).filter(line => line.text);
    },
    smartLineToElements: function (lines, pageIndex, pageWidth, catalog, offset) {
      const labelPattern = /(نام|عنوان|کد|شماره|تاریخ|تعداد|مقدار|تیراژ|رنگ|سایز|اندازه|مدل|پارچه|ملزومات|توضیح|شرح|امضا|تحویل|سفارش|واحد|نام خانوادگی|مشتری|کارفرما)/i;
      const results = [];
      lines.forEach(line => {
        const text = String(line.text || '').trim();
        if (text.length < 2 || text.length > 90 || !labelPattern.test(text)) return;
        if (results.some(item => item.pageIndex === pageIndex && this.normalizeSmartText(item.text) === this.normalizeSmartText(text))) return;
        const fieldWidth = Math.max(24,Math.min(48,pageWidth*0.24));
        const x = Math.max(0,Math.min(pageWidth-fieldWidth,Number(line.x||0)-fieldWidth-2));
        const y = Math.max(0,Number(line.y||0));
        const match = this.suggestSmartBinding(text,catalog);
        if (match && !this.definition.bindings.some(binding => binding.id === match.binding.id)) {
          this.definition.bindings.push(Object.assign({},match.binding,{label:match.label}));
        }
        results.push({
          id:'smart_'+pageIndex+'_'+(offset+results.length+1),
          type:'field',text:text,x:Number(x.toFixed(2)),y:Number(y.toFixed(2)),
          width:Number(fieldWidth.toFixed(2)),height:Math.max(7,Math.min(12,Number((line.height||5).toFixed(2))+3)),
          pageIndex:pageIndex,fontSize:10,align:'right',bindingId:match ? match.binding.id : ''
        });
      });
      return results;
    },
    runSmartDetection: async function () {
      if (!this.pdfDocument) {
        this.setStatus('pt-pdf-status','ابتدا یک PDF یا تصویر فرم را انتخاب کن.',true);
        return;
      }
      const button = document.getElementById('pt-smart-detect');
      if (button) button.disabled = true;
      const previousElements = (this.definition.elements || []).slice();
      const detected = [];
      const catalog = this.smartSourceCatalog();
      let worker = null;
      try {
        this.setStatus('pt-pdf-status','در حال تحلیل متن و مختصات صفحات…');
        for (let index=0; index<this.pdfDocument.numPages; index++) {
          const page = await this.pdfDocument.getPage(index+1);
          const viewport = page.getViewport({scale:1});
          const widthMm = Number((viewport.width*25.4/72).toFixed(3));
          const heightMm = Number((viewport.height*25.4/72).toFixed(3));
          const content = await page.getTextContent();
          let items = (content.items || []).filter(item => item.str && item.str.trim()).map(item => ({
            text:item.str,x:Number((item.transform[4]*25.4/72).toFixed(2)),
            y:Number((heightMm-item.transform[5]*25.4/72).toFixed(2)),
            width:Number((item.width*25.4/72).toFixed(2)),
            height:Number((Math.abs(item.height || item.transform[3] || 10)*25.4/72).toFixed(2))
          }));
          let lines = this.groupSmartTextLines(items);
          if (!lines.length) {
            if (!worker) {
              this.setStatus('pt-pdf-status','صفحه اسکن‌شده شناسایی شد؛ در حال بارگذاری OCR فارسی/انگلیسی روی همین دستگاه…');
              await this.loadExternalScript('https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js','Tesseract');
              worker = await window.Tesseract.createWorker('fas+eng',1,{logger:info=>{
                if (info && info.status === 'recognizing text') this.setStatus('pt-pdf-status','تشخیص متن صفحه '+(index+1)+'… '+Math.round((info.progress||0)*100)+'٪');
              }});
            }
            const renderScale = Math.min(2,1600/Math.max(1,viewport.width));
            const renderViewport = page.getViewport({scale:renderScale});
            const canvas = document.createElement('canvas');
            canvas.width = Math.ceil(renderViewport.width); canvas.height = Math.ceil(renderViewport.height);
            const context = canvas.getContext('2d',{alpha:false});
            await page.render({canvasContext:context,viewport:renderViewport}).promise;
            const result = await worker.recognize(canvas);
            const sx = widthMm/canvas.width, sy = heightMm/canvas.height;
            items = (result.data.words || []).filter(word=>word.text && word.text.trim()).map(word=>({
              text:word.text,x:word.bbox.x0*sx,y:word.bbox.y0*sy,
              width:(word.bbox.x1-word.bbox.x0)*sx,height:(word.bbox.y1-word.bbox.y0)*sy
            }));
            lines = this.groupSmartTextLines(items);
            canvas.width=0; canvas.height=0;
          }
          const pageElements = this.smartLineToElements(lines,index,widthMm,catalog,detected.length);
          detected.push.apply(detected,pageElements);
          if (typeof page.cleanup === 'function') page.cleanup();
        }
        if (!detected.length) {
          this.setStatus('pt-pdf-status','تحلیل انجام شد اما برچسب قابل‌تشخیصی پیدا نشد. می‌توانی از ابزارهای دستی استفاده کنی.',true);
          return;
        }
        this.definition.elements = previousElements.concat(detected);
        this.renderBindings(); this.renderEditor(); this.commitHistory();
        const connected = detected.filter(item=>item.bindingId).length;
        this.setStatus('pt-pdf-status',detected.length+' محل ورود داده پیشنهاد شد؛ '+connected+' مورد به منبع PMS متصل شد. محل‌ها را در پیش‌نمایش بررسی و در صورت نیاز اصلاح کن، سپس قالب را ذخیره کن.');
      } catch (error) {
        this.setStatus('pt-pdf-status',error.message || 'تحلیل هوشمند سند ناموفق بود.',true);
      } finally {
        if (worker) { try { await worker.terminate(); } catch (_) {} }
        if (button) button.disabled = false;
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
      if (pdfInput) pdfInput.addEventListener('change', () => this.handleImportFile(pdfInput.files && pdfInput.files[0]));
      const detectButton = document.getElementById('pt-smart-detect');
      if (detectButton) detectButton.addEventListener('click', () => this.runSmartDetection());
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
      const pdfInput = document.getElementById('pt-pdf-file'); if (pdfInput) { pdfInput.value = ''; delete pdfInput.dataset.originalImageName; }
      const smartButton = document.getElementById('pt-smart-detect'); if (smartButton) smartButton.disabled = true;
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
        const smartButton = document.getElementById('pt-smart-detect'); if (smartButton) smartButton.disabled = !this.pdfDocument;
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
      this.loadOutputMargins();
      ['top','bottom','right','left'].forEach(side => {
        const input = document.getElementById('pt-margin-' + side);
        if (input) {
          // Apply and persist each edit immediately, including mobile numeric-keyboard input.
          input.addEventListener('input', () => this.saveOutputMargins());
          input.addEventListener('change', () => this.saveOutputMargins());
        }
      });
      const resetMargins = document.getElementById('pt-margin-reset');
      if (resetMargins) resetMargins.addEventListener('click', () => this.resetOutputMargins());
      await this.loadOutputOptions();
    },
    loadOutputMargins: function () {
      try {
        const stored = JSON.parse(window.localStorage.getItem(this.outputMarginStorageKey) || 'null');
        if (stored && typeof stored === 'object') {
          ['top','bottom','right','left'].forEach(side => {
            const value = Number(stored[side]);
            if (Number.isFinite(value)) this.outputMargins[side] = Math.max(0, Math.min(60, value));
          });
        }
      } catch (error) {
        // Storage may be disabled; the in-memory defaults remain usable.
      }
      this.syncOutputMarginInputs();
      return this.outputMargins;
    },
    syncOutputMarginInputs: function () {
      ['top','bottom','right','left'].forEach(side => {
        const input = document.getElementById('pt-margin-' + side);
        if (input) input.value = String(this.outputMargins[side]);
      });
    },
    saveOutputMargins: function () {
      ['top','bottom','right','left'].forEach(side => {
        const input = document.getElementById('pt-margin-' + side);
        const parsed = input ? Number(input.value) : this.outputMargins[side];
        this.outputMargins[side] = Number.isFinite(parsed) ? Math.max(0, Math.min(60, parsed)) : 8;
      });
      this.syncOutputMarginInputs();
      try {
        window.localStorage.setItem(this.outputMarginStorageKey, JSON.stringify(this.outputMargins));
      } catch (error) {
        // Printing still uses the current values even if persistent storage is unavailable.
      }
      this.refreshOutputPreview();
      return this.outputMargins;
    },
    refreshOutputPreview: function () {
      const preview = document.getElementById('pt-output-preview');
      if (!preview || !this.outputPageSpecs || !this.outputPageSpecs.length) return;
      const margins = this.outputMargins || { top: 8, bottom: 8, right: 8, left: 8 };
      const safeWidth = 210;
      const safeHeight = 297;
      Array.from(preview.querySelectorAll('.pt-print-page')).forEach(article => {
        const pageIndex = Number(article.getAttribute('data-page-index') || 0);
        const spec = this.outputPageSpecs[pageIndex];
        if (!spec) return;
        const availableWidth = Math.max(20, safeWidth - margins.left - margins.right);
        const availableHeight = Math.max(20, safeHeight - margins.top - margins.bottom);
        const scale = Math.max(0.01, Math.min(
          availableWidth / Math.max(1, spec.width),
          availableHeight / Math.max(1, spec.height)
        ));
        const content = article.querySelector('.pt-print-page-content');
        article.style.setProperty('--pt-print-scale', String(scale));
        article.style.setProperty('--pt-print-width', safeWidth + 'mm');
        article.style.setProperty('--pt-print-height', safeHeight + 'mm');
        if (content) {
          // Write the effective layout directly to the existing preview DOM. This avoids
          // relying only on a CSS custom property during mobile print-preview rendering.
          content.style.position = 'absolute';
          content.style.width = spec.width + 'mm';
          content.style.height = spec.height + 'mm';
          content.style.left = margins.left + 'mm';
          content.style.top = margins.top + 'mm';
          content.style.transformOrigin = 'top left';
          content.style.transform = 'scale(' + scale + ')';
        }
      });
    },
    resetOutputMargins: function () {
      this.outputMargins = { top: 8, bottom: 8, right: 8, left: 8 };
      this.syncOutputMarginInputs();
      try {
        window.localStorage.setItem(this.outputMarginStorageKey, JSON.stringify(this.outputMargins));
      } catch (error) {
        // Keep reset values in memory when storage is unavailable.
      }
      this.refreshOutputPreview();
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
        // Fit the complete page (PDF background and all overlays) inside the mobile-safe
        // paper area after applying the user's persistent top/bottom/left/right margins.
        const margins = this.outputMargins || { top: 8, bottom: 8, right: 8, left: 8 };
        const safeWidth = 210;
        const safeHeight = 297;
        const availableWidth = Math.max(20, safeWidth - margins.left - margins.right);
        const availableHeight = Math.max(20, safeHeight - margins.top - margins.bottom);
        const fitScale = Math.max(0.01, Math.min(availableWidth / Math.max(1, spec.width), availableHeight / Math.max(1, spec.height)));
        const pageContent = '<div class="pt-print-page-content" style="width:'+spec.width+'mm;height:'+spec.height+'mm;left:'+margins.left+'mm;top:'+margins.top+'mm">'+background+elements.join('')+'</div>';
        const pageStyle = 'width:'+spec.width+'mm;height:'+spec.height+'mm;--pt-print-scale:'+fitScale+
          ';--pt-print-width:'+safeWidth+'mm;--pt-print-height:'+safeHeight+'mm';
        pages.push('<article class="pt-print-page'+(pdfPages ? ' pt-has-pdf' : '')+'" data-page-index="'+pageIndex+'" style="'+pageStyle+'" dir="rtl">'+pageContent+'</article>');
      }
      return pages.join('');
    },
    printOutput: async function () {
      this.saveOutputMargins();
      let printStyle = document.getElementById('pt-output-page-rule');
      if (!printStyle) {
        printStyle = document.createElement('style');
        printStyle.id = 'pt-output-page-rule';
        document.head.appendChild(printStyle);
      }
      // Let the mobile print service choose its paper (often Letter); each PDF page is
      // pre-fitted to a safe common printable area so no page can spill onto a second sheet.
      printStyle.textContent = '@page{size:A4 portrait;margin:0}';
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