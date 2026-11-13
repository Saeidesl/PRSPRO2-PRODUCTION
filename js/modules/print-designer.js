(function () {
  'use strict';
  const PMS = window.PMS = window.PMS || {};
  const PrintDesigner = {
    templates: [],
    sources: { projectFields: [], informationTypes: [], forms: [], eventTypes: [] },
    sourcePickerTab: 'central',
    sourcePickerSearch: '',
    expandedSourceGroups: Object.create(null),
    definition: null,
    editingId: '',
    busy: false,
    selectedElementId: '',
    history: [],
    historyIndex: -1,
    dragState: null,
    previewMode: false,
    currentTemplateMeta: null,
    livePreviewTimer: null,
    livePreviewSequence: 0,
    livePreviewBusy: false,
    livePreviewPending: false,
    livePreviewExpanded: false,
    livePreviewReady: false,
    livePreviewPdfBlob: null,
    outputPageSpec: { width: 210, height: 297 },
    outputMargins: { top: 8, bottom: 8, right: 8, left: 8 },
    outputPdfObjectUrls: [],
    imageSources: Object.create(null),
    pendingImageFiles: Object.create(null),
    outputPdfBlobUrl: '',
    outputPdfFileName: 'PMS-document.pdf',
    projectOutputRecords: Object.create(null),
    projectOutputEdit: null,
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
        const picker = document.getElementById('pt-data-picker');
        if (event.key === 'Escape' && picker && !picker.hidden) { this.closeDataPicker(); return; }
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
      const openPicker = document.getElementById('pt-open-data-picker');
      if (openPicker && openPicker.dataset.bound !== '1') {
        openPicker.dataset.bound = '1';
        openPicker.addEventListener('click', () => this.openDataPicker());
      }
      const picker = document.getElementById('pt-data-picker');
      if (picker && picker.dataset.bound !== '1') {
        picker.dataset.bound = '1';
        picker.addEventListener('click', event => {
          const close = event.target.closest('[data-pt-picker-close]');
          if (close || event.target === picker) { this.closeDataPicker(); return; }
          const tab = event.target.closest('[data-pt-source-tab]');
          if (tab) { this.sourcePickerTab = tab.dataset.ptSourceTab; this.renderSources(); return; }
          const addGroup = event.target.closest('[data-pt-add-group]');
          if (addGroup) {
            const group = (this._sourcePickerGroups || [])[Number(addGroup.dataset.ptAddGroup)];
            if (group) this.addSourceItems(this.sourcePickerSearch ? group.visibleItems : group.items);
            return;
          }
          const addItem = event.target.closest('[data-pt-add-item]');
          if (addItem) {
            const item = (this._sourcePickerItems || [])[Number(addItem.dataset.ptAddItem)];
            if (item) this.addSourceItems([item]);
          }
        });
      }
      const pickerSearch = document.getElementById('pt-data-picker-search');
      if (pickerSearch && pickerSearch.dataset.bound !== '1') {
        pickerSearch.dataset.bound = '1';
        pickerSearch.addEventListener('input', () => {
          this.sourcePickerSearch = pickerSearch.value || '';
          this.renderSources();
          const search = document.getElementById('pt-data-picker-search');
          if (search) { search.focus(); search.setSelectionRange(search.value.length, search.value.length); }
        });
      }
      ['pt-prop-text','pt-prop-binding','pt-prop-selection','pt-prop-x','pt-prop-y','pt-prop-width','pt-prop-height','pt-prop-font','pt-prop-align','pt-prop-columns','pt-prop-rows','pt-prop-color','pt-prop-background'].forEach(id => {
        const input = document.getElementById(id);
        if (!input || input.dataset.bound === '1') return;
        input.dataset.bound = '1';
        input.addEventListener('change', () => this.applyInspectorChange(id, input.value));
      });
      const imageInput = document.getElementById('pt-image-file');
      if (imageInput && imageInput.dataset.bound !== '1') {
        imageInput.dataset.bound = '1';
        imageInput.addEventListener('change', () => {
          const file = imageInput.files && imageInput.files[0];
          imageInput.value = '';
          if (file) this.handleImageSelection(file);
        });
      }
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
      if (action === 'add-table') {
        const binding = this.definition && this.definition.bindings && this.definition.bindings.find(item => item.sourceType === 'EVENT_FORM_RESPONSE' || item.selection === 'ALL');
        return this.createElement('table', { bindingId: binding ? binding.id : '' });
      }
      if (action === 'add-image') {
        const input = document.getElementById('pt-image-file');
        if (input) input.click();
        return;
      }
      if (action === 'add-line') return this.createElement('line', { text: '' });
      if (action === 'add-divider') return this.createElement('divider', { text: '' });
      if (action === 'add-rectangle') return this.createElement('rectangle', { text: '' });
      if (action === 'add-ellipse') return this.createElement('ellipse', { text: '' });
      if (action === 'undo') return this.undo();
      if (action === 'redo') return this.redo();
      if (action === 'preview') {
        const panel = document.querySelector('.pt-live-preview-panel');
        if (panel) panel.scrollIntoView({behavior:'smooth',block:'start'});
        this.scheduleLivePreview(0);
        return;
      }
      if (action === 'remove' && selected) {
        this.definition.elements = this.definition.elements.filter(item => item.id !== selected.id);
        this.selectedElementId = ''; this.renderEditor(); this.renderSources(); return this.commitHistory();
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
        if (source && ['EVENT_FORM_FIELD','EVENT_FORM_RESPONSE','EVENT_FIELD'].includes(source.sourceType)) source.selection = value;
      } else if (id === 'pt-prop-columns') item.columns = String(value).split('|').map(part => part.trim()).filter(Boolean);
      else if (id === 'pt-prop-rows') item.rows = String(value).split(/\r?\n/).filter(line => line.trim()).map(line => line.split('|').map(part => part.trim()));
      else {
        const key = map[id];
        if (!key) return;
        item[key] = ['x','y','width','height','fontSize'].includes(key) ? Number(value) : value;
      }
      this.renderCanvas(); this.renderLayers(); this.commitHistory();
    },
    handleImageSelection: async function (file) {
      const mime = String(file.type || '').toLowerCase();
      const ext = String(file.name || '').split('.').pop().toLowerCase();
      const allowed = {'image/jpeg':['jpg','jpeg'],'image/png':['png'],'image/webp':['webp']};
      if (!allowed[mime] || !allowed[mime].includes(ext)) {
        this.setStatus('pt-editor-status','فقط تصویر JPG، PNG یا WebP پذیرفته می‌شود.',true);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        this.setStatus('pt-editor-status','حجم تصویر نباید بیشتر از ۱۰ مگابایت باشد.',true);
        return;
      }
      let width = 55, height = 40;
      try {
        const bitmap = await createImageBitmap(file);
        const ratio = bitmap.width / Math.max(1,bitmap.height);
        height = Math.max(12,Math.min(70,width / Math.max(0.1,ratio)));
        if (height > 60) { height = 60; width = height * ratio; }
        if (bitmap.close) bitmap.close();
      } catch (_) {}
      const item = this.createElement('image',{text:'',fileName:file.name,mimeType:mime,assetId:'',width:Number(width.toFixed(1)),height:Number(height.toFixed(1)),fit:'contain'});
      this.pendingImageFiles[item.id] = file;
      this.imageSources[item.id] = 'data:' + mime + ';base64,' + await this.fileToBase64(file);
      this.renderEditor();
      this.scheduleLivePreview(0);
      this.setStatus('pt-editor-status','تصویر به صفحه اضافه شد؛ آن را جابه‌جا یا اندازه‌اش را تنظیم کن. با ذخیره قالب، فایل اصلی بارگذاری می‌شود.');
    },
    loadTemplateImages: async function (template, sourceDefinition) {
      const images = Array.isArray(template && template.Images) ? template.Images : [];
      const definition = sourceDefinition || this.definition || {};
      const elements = Array.isArray(definition.elements) ? definition.elements : [];
      const assets = Object.create(null);
      images.forEach(image => {
        const id = image.ID || image.Id || image.AssetID || image.assetId;
        if (id) assets[String(id)] = image;
      });
      const ids = Array.from(new Set(elements.filter(item => item.type === 'image' && item.assetId && !this.imageSources[item.assetId]).map(item => String(item.assetId))));
      await Promise.all(ids.map(async assetId => {
        if (!assets[assetId]) return;
        try {
          const response = await PMS.Api.get('/print-templates/' + encodeURIComponent(template.ID) + '/images/' + encodeURIComponent(assetId), {trackSync:false});
          const file = this.extract(response) || {};
          const base64 = String(file.base64 || file.Base64 || '').replace(/^data:[^,]*;base64,/i,'');
          const mime = String(file.mimeType || file.MimeType || assets[assetId].MimeType || 'image/png').toLowerCase();
          if (!base64 || !/^image\/(jpeg|png|webp)$/.test(mime)) throw new Error('تصویر قالب معتبر نیست.');
          this.imageSources[assetId] = 'data:' + mime + ';base64,' + base64;
        } catch (error) {
          this.setStatus('pt-editor-status','دریافت یکی از تصاویر قالب ناموفق بود: ' + (error.message || ''),true);
        }
      }));
    },
    uploadPendingImages: async function (templateId) {
      const pendingIds = Object.keys(this.pendingImageFiles || {});
      for (const elementId of pendingIds) {
        const file = this.pendingImageFiles[elementId];
        const element = (this.definition.elements || []).find(item => String(item.id) === String(elementId));
        if (!file || !element) continue;
        const response = await PMS.Api.post('/print-templates/' + encodeURIComponent(templateId) + '/images', {
          fileName:file.name,mimeType:file.type,base64:await this.fileToBase64(file)
        });
        const uploaded = this.extract(response) || {};
        const assetId = uploaded.ID || uploaded.id || uploaded.AssetID || uploaded.assetId;
        if (!assetId) throw new Error('تصویر بارگذاری شد اما شناسه آن دریافت نشد.');
        element.assetId = String(assetId);
        element.fileName = uploaded.FileName || uploaded.fileName || file.name;
        element.mimeType = uploaded.MimeType || uploaded.mimeType || file.type;
        this.imageSources[element.assetId] = this.imageSources[elementId] || '';
        delete this.imageSources[elementId];
        delete this.pendingImageFiles[elementId];
      }
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
      const supportsSelection = selectedBinding && ['EVENT_FORM_FIELD','EVENT_FORM_RESPONSE','EVENT_FIELD'].includes(selectedBinding.sourceType);
      if (selectionWrap) selectionWrap.hidden = !supportsSelection;
      const selectionInput = document.getElementById('pt-prop-selection');
      if (selectionInput && supportsSelection) {
        selectionInput.innerHTML = selectedBinding.sourceType === 'EVENT_FIELD'
          ? '<option value="LATEST">آخرین رویداد</option><option value="ALL">تمام رویدادها</option>'
          : '<option value="LATEST">آخرین پاسخ</option><option value="ALL">همه پاسخ‌ها (ردیف‌های تکرارشونده)</option><option value="EVENT">رویداد مشخص</option><option value="RESPONSE">پاسخ مشخص</option>';
        selectionInput.value = selectedBinding.selection || 'LATEST';
      }
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
          const label = item.type === 'field' ? '<span class="pt-field-hint" dir="auto">' + this.esc(item.label || 'فیلد داده') + '</span>' :
            (item.type === 'line' || item.type === 'divider' ? '<span class="pt-shape-line" aria-hidden="true"></span>' :
            (item.type === 'rectangle' || item.type === 'ellipse' ? '<span class="pt-shape-outline" aria-hidden="true"></span>' :
            (item.type === 'image' ? (this.imageSources[item.assetId || item.id] ? '<img class="pt-canvas-image" src="' + this.esc(this.imageSources[item.assetId || item.id]) + '" alt="' + this.esc(item.fileName || 'تصویر قالب') + '">' : '<span class="pt-image-placeholder">▧ ' + this.esc(item.fileName || 'تصویر') + '</span>') :
            (item.type === 'table' ? '<strong>' + this.esc(item.text) + '</strong><table><thead><tr>' +
              (item.columns || []).map(col => '<th>' + this.esc(col) + '</th>').join('') + '</tr></thead><tbody>' +
              (item.rows || []).map(row => '<tr>' + row.map(cell => '<td>' + this.esc(cell) + '</td>').join('') + '</tr>').join('') +
              '</tbody></table>' : this.esc(item.text || '')))));
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
          const previewScale = Math.max(1, Math.min(2, Number(window.devicePixelRatio) || 1));
          const viewport = page.getViewport({scale:previewScale});
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          canvas.style.width = '100%';
          canvas.style.height = '100%';
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
        const extension = String(file.name || '').split('.').pop().toLowerCase();
        const mime = String(file.type || '').toLowerCase();
        let dataUrl = '';
        let imageFormat = '';
        if (mime === 'image/jpeg' || extension === 'jpg' || extension === 'jpeg') {
          // Embed the original JPEG bytes: no downscaling and no second lossy encode.
          dataUrl = 'data:image/jpeg;base64,' + await this.fileToBase64(file);
          imageFormat = 'JPEG';
        } else if (mime === 'image/png' || extension === 'png') {
          // PNG is embedded losslessly, retaining fine text and thin table borders.
          dataUrl = 'data:image/png;base64,' + await this.fileToBase64(file);
          imageFormat = 'PNG';
        } else if (mime === 'image/webp' || extension === 'webp') {
          // jsPDF has no reliable native WebP decoder; convert at native pixel dimensions.
          if (image.width * image.height > 30000000) throw new Error('ابعاد تصویر WebP برای تبدیل مستقیم بیش از حد بزرگ است؛ لطفاً نسخه PNG یا JPG همان تصویر را انتخاب کن.');
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext('2d', {alpha:false});
          if (!context) throw new Error('آماده‌سازی تصویر در این مرورگر ممکن نیست.');
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          dataUrl = canvas.toDataURL('image/png');
          imageFormat = 'PNG';
          canvas.width = 0;
          canvas.height = 0;
        } else {
          throw new Error('فرمت تصویر پشتیبانی نمی‌شود؛ از JPG، PNG یا WebP استفاده کن.');
        }
        // 300 DPI defines a practical print size; source pixels are never reduced.
        const widthMm = Number((image.width * 25.4 / 300).toFixed(3));
        const heightMm = Number((image.height * 25.4 / 300).toFixed(3));
        const orientation = widthMm > heightMm ? 'landscape' : 'portrait';
        const pdf = new window.jspdf.jsPDF({orientation:orientation,unit:'mm',format:[widthMm,heightMm],compress:true});
        pdf.addImage(dataUrl,imageFormat,0,0,widthMm,heightMm,undefined,'FAST');
        const blob = pdf.output('blob');
        if (blob.size > 10 * 1024 * 1024) throw new Error('حجم PDF حاصل از تصویر بیش از سقف ۱۰ مگابایت است؛ لطفاً فایل را با فرمت JPG با کیفیت اصلی یا PDF اسکنر وارد کن.');
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
        if (this.pdfDocument) this.setStatus('pt-pdf-status','تصویر به‌عنوان پس‌زمینه PDF آماده شد؛ محل فیلدها را با ابزارهای دستی قالب‌ساز اضافه کن.');
      } catch (error) {
        this.setStatus('pt-pdf-status',error.message || 'تبدیل تصویر ناموفق بود.',true);
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
      this.scheduleLivePreview(650);
    },
    restoreHistory: function (index) {
      if (index < 0 || index >= this.history.length) return;
      this.historyIndex = index;
      this.definition = JSON.parse(this.history[index]);
      this.renderEditor();
      this.scheduleLivePreview(250);
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
      this.bindLivePreview();
      const pdfInput = document.getElementById('pt-pdf-file');
      if (pdfInput) pdfInput.addEventListener('change', () => this.handleImportFile(pdfInput.files && pdfInput.files[0]));
      if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      await this.loadLibrary();
      this.loadOutputMargins();
      await this.loadLivePreviewProjects();
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
          forms: Array.isArray(sources.forms) ? sources.forms : [],
          eventTypes: Array.isArray(sources.eventTypes) ? sources.eventTypes : []
        };
        this.sourceError = '';
      } else {
        this.sources = { projectFields: [], informationTypes: [], forms: [], eventTypes: [] };
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
    openDataPicker: function () {
      const modal = document.getElementById('pt-data-picker');
      if (!modal) return;
      modal.hidden = false;
      this.renderSources();
      const search = document.getElementById('pt-data-picker-search');
      if (search) window.setTimeout(() => search.focus(), 0);
    },
    closeDataPicker: function () {
      const modal = document.getElementById('pt-data-picker');
      if (modal) modal.hidden = true;
    },
    renderSources: function () {
      const root = document.getElementById('pt-data-picker-content');
      if (!root) return;
      const selected = new Set(((this.definition && this.definition.elements) || [])
        .filter(item => item.bindingId).map(item => String(item.bindingId)));
      const query = String(this.sourcePickerSearch || '').trim().toLocaleLowerCase();
      const makeItem = (label, detail, binding, meta) => Object.assign({ label: label, detail: detail, binding: binding }, meta || {});
      let groups = [];
      if (this.sourcePickerTab === 'central') {
        const projectItems = (this.sources.projectFields || []).map(source => makeItem(source.label, 'اطلاعات پایه پروژه',
          { id: 'project_' + source.field, sourceType: 'PROJECT_FIELD', field: source.field }));
        const infoItems = (this.sources.informationTypes || []).map(source => makeItem(source.Name,
          'اطلاعات مرکزی · ' + source.Code,
          { id: 'info_' + source.ID, sourceType: 'PROJECT_INFORMATION', informationTypeId: source.ID },
          { dataType: source.DataType, cardinality: source.Cardinality, columns: source.Columns || [] }));
        groups = [
          { id: 'central-project', name: 'اطلاعات پایه پروژه', detail: 'مشخصات اصلی پرونده', items: projectItems },
          { id: 'central-information', name: 'اطلاعات مرکزی', detail: 'اطلاعات ثبت‌شده برای پروژه', items: infoItems }
        ];
      } else if (this.sourcePickerTab === 'forms') {
        groups = (this.sources.forms || []).map(form => ({
          id: 'form-' + form.ID, name: form.Name, detail: form.Code || 'فرم قابل استفاده مجدد',
          items: (form.Fields || []).map(field => {
            const infoType = (this.sources.informationTypes || []).find(type => String(type.ID) === String(field.InformationTypeID)) || {};
            return makeItem(field.Name, field.Code || field.DataType || '',
              { id: 'form_' + form.ID + '_' + field.ID, sourceType: 'EVENT_FORM_FIELD',
                formId: form.ID, fieldId: field.ID, informationTypeId: field.InformationTypeID, selection: 'LATEST' },
              { dataType: field.DataType || infoType.DataType, cardinality: field.Cardinality || infoType.Cardinality,
                columns: infoType.Columns || [] });
          })
        }));
      } else {
        groups = (this.sources.eventTypes || []).map(eventType => {
          // Accept the canonical API shape and legacy/case-variant payloads.
          // A missing display label must never produce an apparently blank group.
          const eventTypeId = eventType.ID || eventType.id || eventType.EventTypeID;
          const eventTypeCode = eventType.Code || eventType.code || '';
          const eventTypeName = eventType.Name || eventType.EventTypeName || eventType.eventTypeName || eventType.name ||
            eventTypeCode || eventTypeId || 'نوع رویداد بدون عنوان';
          const rawEventFields = Array.isArray(eventType.Fields) ? eventType.Fields :
            (Array.isArray(eventType.fields) ? eventType.fields : []);
          const rawForms = Array.isArray(eventType.Forms) ? eventType.Forms :
            (Array.isArray(eventType.forms) ? eventType.forms : []);
          const eventFields = rawEventFields.map(field => {
            const fieldKey = field.field || field.Field || field.Code || field.Name;
            const fieldLabel = field.label || field.Label || field.Name || fieldKey || 'اطلاعات رویداد';
            return makeItem(fieldLabel, 'اطلاعات عمومی نوع رویداد',
              { id: 'event_' + eventTypeId + '_' + fieldKey, sourceType: 'EVENT_FIELD',
                eventTypeId: eventTypeId, field: fieldKey, selection: 'LATEST' });
          }).filter(item => item.binding.field);
          const formFields = rawForms.flatMap(form => {
            const formId = form.ID || form.id || form.FormID;
            const formName = form.Name || form.name || form.Code || 'فرم متصل';
            const fields = Array.isArray(form.Fields) ? form.Fields : (Array.isArray(form.fields) ? form.fields : []);
            return fields.map(field => {
              const fieldId = field.ID || field.id || field.FieldID;
              const informationTypeId = field.InformationTypeID || field.informationTypeId;
              const fieldName = field.Name || field.name || field.Label || field.label || field.Code || 'فیلد فرم';
              const infoType = (this.sources.informationTypes || []).find(type =>
                String(type.ID) === String(informationTypeId)) || {};
              return makeItem(formName + ' · ' + fieldName, 'فرم متصل به این نوع رویداد',
                { id: 'event_' + eventTypeId + '_form_' + formId + '_' + fieldId,
                  sourceType: 'EVENT_FORM_FIELD', eventTypeId: eventTypeId, formId: formId,
                  fieldId: fieldId, informationTypeId: informationTypeId, selection: 'LATEST' },
                { dataType: field.DataType || field.dataType || infoType.DataType,
                  cardinality: field.Cardinality || field.cardinality || infoType.Cardinality, columns: infoType.Columns || [] });
            }).filter(item => item.binding.formId && item.binding.fieldId);
          });
          return {
            id: 'event-' + eventTypeId, name: eventTypeName,
            detail: [eventTypeCode, eventType.Category || eventType.category].filter(Boolean).join(' · '),
            items: eventFields.concat(formFields)
          };
        }).filter(group => group.items.length > 0);
      }
      groups = groups.map(group => {
        const matchingItems = group.items.filter(item => !query ||
          (String(group.name || '').toLocaleLowerCase().includes(query)) ||
          (String(item.label || '').toLocaleLowerCase().includes(query)) ||
          (String(item.detail || '').toLocaleLowerCase().includes(query)));
        return Object.assign({}, group, { visibleItems: matchingItems });
      }).filter(group => !query
        ? (group.items.length > 0 || this.sourcePickerTab === 'central')
        : (String(group.name || '').toLocaleLowerCase().includes(query) || group.visibleItems.length > 0));
      const flatItems = [];
      groups.forEach(group => group.visibleItems.forEach(item => {
        flatItems.push(item);
      }));
      this._sourcePickerGroups = groups;
      this._sourcePickerItems = flatItems;
      const totalItems = groups.reduce((sum, group) => sum + group.items.length, 0);
      const selectedCount = selected.size;
      const count = document.getElementById('pt-source-count');
      const selectedNode = document.getElementById('pt-picker-selected-count');
      if (count) count.textContent = totalItems + ' منبع در این دسته';
      if (selectedNode) selectedNode.textContent = selectedCount + ' مورد انتخاب‌شده';
      document.querySelectorAll('[data-pt-source-tab]').forEach(button => {
        const active = button.dataset.ptSourceTab === this.sourcePickerTab;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      if (this.sourceError) {
        root.innerHTML = '<p class="pt-empty-state is-error">' + this.esc(this.sourceError) + '</p>';
        return;
      }
      if (!groups.length) {
        root.innerHTML = '<p class="pt-data-empty">موردی در این دسته‌بندی پیدا نشد.</p>';
        return;
      }
      root.innerHTML = groups.map((group, groupIndex) => {
        const added = group.items.filter(item => selected.has(String(item.binding.id))).length;
        const expanded = !!this.expandedSourceGroups[group.id] || !!query;
        const itemsMarkup = expanded ? '<div class="pt-data-items">' + group.visibleItems.map(item => {
          const index = flatItems.indexOf(item);
          const exists = selected.has(String(item.binding.id));
          return '<div class="pt-data-item"><div class="pt-data-item-label"><strong>' + this.esc(item.label) +
            '</strong><small>' + this.esc(item.detail || '') + '</small></div><button type="button" class="pt-data-add' +
            (exists ? ' is-added' : '') + '" data-pt-add-item="' + index + '" aria-label="' +
            (exists ? 'قبلاً اضافه شده' : 'افزودن ' + this.esc(item.label)) + '"' + (exists ? ' disabled' : '') +
            '>' + (exists ? '✓' : '+') + '</button></div>';
        }).join('') + '</div>' : '';
        const groupAllAdded = group.items.length > 0 && added === group.items.length;
        return '<section class="pt-data-group"><div class="pt-data-group-heading"><div class="pt-data-group-title">' +
          '<button type="button" data-pt-group-toggle="' + this.esc(group.id) + '" aria-expanded="' + (expanded ? 'true' : 'false') +
          '">' + (expanded ? '▾ ' : '▸ ') + this.esc(group.name) + '</button><small>' + this.esc(group.detail || '') +
          '</small></div><div class="pt-data-group-actions"><span class="pt-data-group-count">' + added + ' از ' + group.items.length +
          '</span><button type="button" class="pt-data-add' + (groupAllAdded ? ' is-added' : '') + '" data-pt-add-group="' +
          groupIndex + '" aria-label="افزودن تمام اطلاعات ' + this.esc(group.name) + '"' + (groupAllAdded ? ' disabled' : '') +
          '>' + (groupAllAdded ? '✓' : '+') + '</button></div></div>' + itemsMarkup + '</section>';
      }).join('');
      // Bind expansion directly to the freshly rendered group controls. This keeps
      // disclosure behavior reliable and independent from the modal's other actions.
      root.querySelectorAll('[data-pt-group-toggle]').forEach(button => {
        button.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          const id = button.dataset.ptGroupToggle;
          if (!id) return;
          this.expandedSourceGroups[id] = !this.expandedSourceGroups[id];
          this.renderSources();
        });
      });
    },
    findFreeElementPosition: function (pageIndex, width, height) {
      const dimensions = this.pageDimensions(pageIndex);
      const columnWidth = Math.min(82, Math.max(48, (dimensions.width - 36) / 2));
      const xPositions = dimensions.width >= 130 ? [12, dimensions.width - columnWidth - 12] : [10];
      const rowStep = height + 5;
      const maxRows = Math.max(1, Math.floor((dimensions.height - 30) / rowStep));
      const existing = (this.definition.elements || []).filter(item => Number(item.pageIndex || 0) === Number(pageIndex));
      for (let row = 0; row < maxRows; row++) {
        for (const x of xPositions) {
          const y = 15 + row * rowStep;
          const overlaps = existing.some(item => {
            const ix = Number(item.x || 0), iy = Number(item.y || 0);
            const iw = Number(item.width || 30), ih = Number(item.height || 15);
            return x < ix + iw + 2 && x + columnWidth + 2 > ix &&
              y < iy + ih + 2 && y + height + 2 > iy;
          });
          if (!overlaps) return { x: x, y: y, width: columnWidth, height: height, pageIndex: pageIndex };
        }
      }
      return null;
    },
    addSourceItems: function (items) {
      if (!this.definition) this.definition = this.blankDefinition();
      const existingBindings = new Map((this.definition.bindings || []).map(item => [String(item.id), item]));
      const existingElements = new Set((this.definition.elements || []).filter(item => item.bindingId).map(item => String(item.bindingId)));
      const pages = this.definition.pdf && Array.isArray(this.definition.pdf.pages)
        ? this.definition.pdf.pages.map((page, index) => index) : [Number(this.activePageIndex || 0)];
      let added = 0, skipped = 0, noSpace = 0;
      (items || []).forEach(source => {
        const binding = source && source.binding;
        if (!binding || existingElements.has(String(binding.id))) { skipped++; return; }
        const isRepeatable = String(source.cardinality || '').toUpperCase() === 'MULTIPLE';
        const isImage = String(source.dataType || '').toLowerCase() === 'image';
        const elementType = isRepeatable ? 'table' : 'field';
        const elementHeight = isImage ? 36 : (isRepeatable ? 38 : 12);
        let position = null;
        for (const pageIndex of pages) {
          position = this.findFreeElementPosition(pageIndex, 82, elementHeight);
          if (position) break;
        }
        if (!position) { noSpace++; return; }
        if (!existingBindings.has(String(binding.id))) {
          const savedBinding = Object.assign({}, binding, { label: source.label });
          this.definition.bindings.push(savedBinding);
          existingBindings.set(String(binding.id), savedBinding);
        }
        existingElements.add(String(binding.id));
        const columns = (source.columns || []).map(column => column.Name || column.Code).filter(Boolean);
        const columnKeys = (source.columns || []).map(column => column.Code || column.Name).filter(Boolean);
        this.definition.elements.push({
          id: 'el_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,7),
          type: elementType, text: source.label, label: source.label, showLabel: true, bindingId: binding.id,
          x: position.x, y: position.y, width: position.width, height: position.height,
          pageIndex: position.pageIndex, fontSize: 10, align: 'right',
          columns: isRepeatable ? (columns.length ? columns : ['مقدار']) : [],
          columnKeys: isRepeatable ? (columnKeys.length ? columnKeys : ['مقدار']) : [], rows: []
        });
        added++;
      });
      if (added) {
        this.activePageIndex = Number(this.definition.elements[this.definition.elements.length - 1].pageIndex || 0);
        this.selectedElementId = this.definition.elements[this.definition.elements.length - 1].id;
        this.renderBindings();
        this.renderEditor();
        this.commitHistory();
        this.renderSources();
        this.scheduleLivePreview(0);
      } else {
        this.renderSources();
      }
      if (noSpace) this.setStatus('pt-form-status', added + ' مورد اضافه شد؛ برای ' + noSpace + ' مورد فضای خالی در صفحات موجود پیدا نشد.', true);
      else if (added && skipped) this.setStatus('pt-form-status', added + ' مورد اضافه شد؛ ' + skipped + ' مورد قبلاً در قالب وجود داشت.');
      else if (added) this.setStatus('pt-form-status', added + ' مورد با اتصال مستقیم به صفحه اضافه شد.');
      else this.setStatus('pt-form-status', 'تمام موارد انتخاب‌شده قبلاً به قالب اضافه شده‌اند.');
    },
    addBinding: function (binding, label) {
      this.addSourceItems([{ binding: binding, label: label || binding.label || binding.id }]);
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
      this.clearLivePreview('پیش‌نمایش برای قالب جدید آماده می‌شود.');
      const form = document.getElementById('pt-template-form');
      if (form) form.reset();
      this.editingId = '';
      if (this.pdfPageObserver) this.pdfPageObserver.disconnect();
      this.pdfDocument = null; this.pdfFile = null; this.pdfRenderVersion++; this.activePageIndex = 0;
      const pdfInput = document.getElementById('pt-pdf-file'); if (pdfInput) { pdfInput.value = ''; delete pdfInput.dataset.originalImageName; }
      this.definition = this.blankDefinition();
      this.currentTemplateMeta = null;
      this.pendingImageFiles = Object.create(null);
      Object.keys(this.imageSources || {}).forEach(key => {
        const source = this.imageSources[key];
        if (String(source || '').indexOf('blob:') === 0) { try { window.URL.revokeObjectURL(source); } catch (_) {} }
      });
      this.imageSources = Object.create(null);
      this.history = []; this.historyIndex = -1; this.selectedElementId = '';
      const code = document.getElementById('pt-template-code');
      if (code) code.disabled = false;
      const title = document.getElementById('pt-editor-title');
      if (title) title.textContent = 'ساخت قالب جدید';
      this.renderBindings(); this.renderEditor(); this.commitHistory();
      this.setStatus('pt-form-status', '');
    },
    editTemplate: async function (id) {
      this.clearLivePreview('در حال بارگذاری قالب انتخاب‌شده…');
      try {
        const response = await PMS.Api.get('/print-templates/' + encodeURIComponent(id));
        const item = this.extract(response);
        this.editingId = item.ID;
        this.currentTemplateMeta = item;
        this.definition = item.Definition || this.blankDefinition();
        this.pdfDocument = null; this.pdfFile = null; this.pdfRenderVersion++; this.activePageIndex = 0;
        if (item.Pdf && item.Pdf.HasFile) await this.loadTemplatePdf(item.ID, item.Pdf);
        await this.loadTemplateImages(item, this.definition);
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
        this.scheduleLivePreview(0);
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
      let wasNew = !this.editingId;
      let templateId = this.editingId;
      let saveCommitted = false;
      try {
        const pendingIds = Object.keys(this.pendingImageFiles || {});
        if (wasNew) {
          const initialDefinition = JSON.parse(JSON.stringify(this.definition));
          initialDefinition.elements = (initialDefinition.elements || []).filter(element => element.type !== 'image' || element.assetId);
          const createBody = Object.assign({}, body, {Definition:this.pdfFile ? this.blankDefinition() : initialDefinition});
          const created = await PMS.Api.post('/print-templates', createBody);
          const createdData = this.extract(created) || {};
          templateId = createdData.ID;
          if (!templateId) throw new Error('قالب ایجاد شد اما شناسه آن دریافت نشد.');
          this.editingId = templateId;
        }
        if (pendingIds.length) await this.uploadPendingImages(templateId);
        if (this.pdfFile) {
          await PMS.Api.post('/print-templates/' + encodeURIComponent(templateId) + '/pdf', {
            fileName: this.pdfFile.name, mimeType: 'application/pdf',
            base64: await this.fileToBase64(this.pdfFile),
            pageCount: Number(this.definition.pdf && this.definition.pdf.pages ? this.definition.pdf.pages.length : 0),
            Definition: this.definition
          });
        } else if (!wasNew || pendingIds.length) {
          await PMS.Api.put('/print-templates/' + encodeURIComponent(templateId), Object.assign({},body,{Definition:this.definition}));
        }
        saveCommitted = true;
        this.resetForm();
        await this.loadLibrary();
        this.setStatus('pt-library-status', 'قالب با موفقیت ذخیره شد.');
      } catch (error) {
        let message = error.message || 'ذخیره قالب ناموفق بود.';
        if (!saveCommitted && wasNew && templateId) {
          try {
            await PMS.Api.delete('/print-templates/' + encodeURIComponent(templateId));
            message += ' قالب ناقص به‌صورت غیرفعال علامت‌گذاری شد و در کتابخانه فعال نمایش داده نمی‌شود.';
          } catch (rollbackError) {
            message += ' همچنین غیرفعال‌سازی قالب ناقص ناموفق بود؛ شناسه قالب: ' + templateId;
          }
        }
        this.setStatus('pt-form-status', message, true);
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
      this.projectOutputMode = false;
      this.projectOutputId = '';
      const routeParts = String(window.location.hash || '').replace(/^#/, '').split('/');
      const projectId = routeParts[0] === 'print-output' ? decodeURIComponent(routeParts[1] || '') : '';
      if (projectId) {
        await this.initProjectOutput(projectId);
        return;
      }
      const button = document.getElementById('pt-output-resolve');
      const printButton = document.getElementById('pt-output-print');
      const downloadButton = document.getElementById('pt-output-download');
      if (button) button.addEventListener('click', () => this.resolveOutput());
      if (printButton) printButton.addEventListener('click', () => this.printOutput());
      if (downloadButton) downloadButton.addEventListener('click', () => this.downloadOutputPdf());
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
    loadLivePreviewProjects: async function () {
      const select = document.getElementById('pt-live-preview-project');
      if (!select) return;
      try {
        const response = await PMS.Api.get('/projects');
        const projects = this.list(response, ['items','Items','projects','Projects']);
        select.innerHTML = '<option value="">انتخاب پروژه</option>' + projects.map(item =>
          '<option value="' + this.esc(item.ID) + '">' +
          this.esc(item.ProjectCode || item.Code || 'بدون کد') + ' — ' +
          this.esc(item.Title || item.Name || item.ID) + '</option>'
        ).join('');
        this.setStatus('pt-live-preview-status', projects.length
          ? 'پروژه را انتخاب کن؛ پیش‌نمایش با تغییرات ذخیره‌نشده به‌روز می‌شود.'
          : 'پروژه‌ای برای پیش‌نمایش در دسترس نیست.', !projects.length);
      } catch (error) {
        this.setStatus('pt-live-preview-status', error.message || 'دریافت فهرست پروژه‌ها ناموفق بود.', true);
      }
    },
    bindLivePreview: function () {
      const select = document.getElementById('pt-live-preview-project');
      if (select && select.dataset.bound !== '1') {
        select.dataset.bound = '1';
        select.addEventListener('change', () => this.scheduleLivePreview(0));
      }
      const refresh = document.getElementById('pt-live-preview-refresh');
      if (refresh && refresh.dataset.bound !== '1') {
        refresh.dataset.bound = '1';
        refresh.addEventListener('click', () => this.scheduleLivePreview(0));
      }
      const print = document.getElementById('pt-live-preview-print');
      if (print && print.dataset.bound !== '1') {
        print.dataset.bound = '1';
        print.addEventListener('click', () => this.printLivePreview());
      }
      const expand = document.getElementById('pt-live-preview-expand');
      if (expand && expand.dataset.bound !== '1') {
        expand.dataset.bound = '1';
        expand.addEventListener('click', () => this.toggleLivePreviewExpanded());
      }
    },
    clearLivePreview: function (message) {
      this.livePreviewSequence = (Number(this.livePreviewSequence) || 0) + 1;
      if (this.livePreviewTimer) window.clearTimeout(this.livePreviewTimer);
      this.livePreviewTimer = null;
      this.livePreviewPending = false;
      this.livePreviewReady = false;
      this.clearLivePreviewPdf();
      const root = document.getElementById('pt-live-preview-content');
      if (root) root.innerHTML = '<div class="pt-empty-state">برای مشاهده خروجی واقعی، یک پروژه انتخاب کن.</div>';
      const printButton = document.getElementById('pt-live-preview-print');
      if (printButton) printButton.disabled = true;
      if (message) this.setStatus('pt-live-preview-status', message);
    },
    clearLivePreviewPdf: function () {
      this.livePreviewPdfBlob = null;
    },
    printLivePreview: async function () {
      const root = document.getElementById('pt-live-preview-content');
      if (!this.livePreviewReady || !root) {
        this.setStatus('pt-live-preview-status', 'ابتدا یک پروژه انتخاب کن و منتظر تکمیل پیش‌نمایش بمان.', true);
        return;
      }
      if (this.livePreviewPdfBlob) {
        const printUrl = window.URL.createObjectURL(this.livePreviewPdfBlob);
        const opened = window.open(printUrl, '_blank');
        if (opened) {
          window.setTimeout(() => window.URL.revokeObjectURL(printUrl), 600000);
          this.setStatus('pt-live-preview-status', 'PDF نهایی باز شد؛ از گزینه چاپ در نمایشگر PDF استفاده کن.');
        } else {
          window.URL.revokeObjectURL(printUrl);
          this.setStatus('pt-live-preview-status', 'مرورگر بازکردن PDF را مسدود کرد؛ اجازه بازشدن پنجره را بده و دوباره تلاش کن.', true);
        }
        return;
      }
      let printStyle = document.getElementById('pt-live-preview-page-rule');
      if (!printStyle) {
        printStyle = document.createElement('style');
        printStyle.id = 'pt-live-preview-page-rule';
        document.head.appendChild(printStyle);
      }
      printStyle.textContent = '@page{size:A4 portrait;margin:0}';
      document.body.classList.add('pt-live-preview-printing');
      const images = Array.from(root.querySelectorAll('img'));
      await Promise.all(images.map(image => image.decode ? image.decode().catch(() => {}) : Promise.resolve()));
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      window.print();
      window.setTimeout(() => document.body.classList.remove('pt-live-preview-printing'), 1500);
    },
    toggleLivePreviewExpanded: function () {
      const panel = document.querySelector('.pt-live-preview-panel');
      const button = document.getElementById('pt-live-preview-expand');
      if (!panel) return;
      this.livePreviewExpanded = !this.livePreviewExpanded;
      panel.classList.toggle('is-expanded', this.livePreviewExpanded);
      if (button) {
        button.textContent = this.livePreviewExpanded ? 'بازگشت' : 'نمایش بزرگ';
        button.setAttribute('aria-pressed', this.livePreviewExpanded ? 'true' : 'false');
      }
    },
    scheduleLivePreview: function (delay) {
      const select = document.getElementById('pt-live-preview-project');
      if (this.livePreviewTimer) window.clearTimeout(this.livePreviewTimer);
      this.livePreviewTimer = null;
      this.livePreviewSequence += 1;
      if (!select || !select.value) {
        this.livePreviewPending = false;
        this.livePreviewReady = false;
        this.clearLivePreviewPdf();
        const root = document.getElementById('pt-live-preview-content');
        if (root) root.innerHTML = '<div class="pt-empty-state">برای مشاهده خروجی واقعی، یک پروژه انتخاب کن.</div>';
        const button = document.getElementById('pt-live-preview-print');
        if (button) button.disabled = true;
        this.setStatus('pt-live-preview-status', 'برای مشاهده خروجی واقعی، یک پروژه انتخاب کن.');
        return;
      }
      this.livePreviewPending = true;
      this.livePreviewReady = false;
      const printButton = document.getElementById('pt-live-preview-print');
      if (printButton) printButton.disabled = true;
      if (this.livePreviewTimer) window.clearTimeout(this.livePreviewTimer);
      this.livePreviewTimer = window.setTimeout(() => {
        this.livePreviewTimer = null;
        if (this.livePreviewBusy) return;
        this.renderLivePreview();
      }, Math.max(0, Number(delay) || 0));
    },
    createLivePreviewDefinition: function () {
      const definition = JSON.parse(JSON.stringify(this.definition || this.blankDefinition()));
      (definition.elements || []).forEach(element => {
        if (element && String(element.type || '').toLowerCase() === 'image' &&
            !String(element.assetId || '').trim() && this.pendingImageFiles && this.pendingImageFiles[element.id]) {
          delete element.assetId;
        }
      });
      return definition;
    },
    renderLivePreview: async function () {
      const select = document.getElementById('pt-live-preview-project');
      const root = document.getElementById('pt-live-preview-content');
      if (!select || !select.value || !root || !this.definition) return;
      if (this.livePreviewBusy) { this.livePreviewPending = true; return; }
      this.livePreviewBusy = true;
      this.livePreviewPending = false;
      this.livePreviewReady = false;
      const printButton = document.getElementById('pt-live-preview-print');
      if (printButton) printButton.disabled = true;
      const requestId = this.livePreviewSequence;
      const projectId = select.value;
      const definition = this.createLivePreviewDefinition();
      this.setStatus('pt-live-preview-status', 'در حال دریافت اطلاعات پروژه و ساخت خروجی زنده…');
      try {
        const response = await PMS.Api.post('/print-templates/preview', {
          ProjectID: projectId,
          Definition: definition
        });
        if (requestId !== this.livePreviewSequence) return;
        const result = this.extract(response) || {};
        const project = result.project || {};
        const data = result.data || {};
        const meta = this.currentTemplateMeta || {};
        const hasSourcePdf = !!(this.pdfFile || (meta.Pdf && meta.Pdf.HasFile));
        const template = {
          ID: this.editingId || '',
          Code: (document.getElementById('pt-template-code') || {}).value || meta.Code || '',
          Name: (document.getElementById('pt-template-name') || {}).value || meta.Name || '',
          Definition: definition,
          Pdf: { HasFile: hasSourcePdf },
          Images: Array.isArray(meta.Images) ? meta.Images : []
        };
        if (hasSourcePdf) {
          const outputBlob = await this.generateSourcePdfOutput(template, project, data);
          if (requestId !== this.livePreviewSequence) return;
          this.clearLivePreviewPdf();
          this.livePreviewPdfBlob = outputBlob;
          await this.renderFinalPdfPreview(outputBlob, 'pt-live-preview-content');
          if (requestId !== this.livePreviewSequence) {
            root.innerHTML = '<div class="pt-empty-state">برای مشاهده خروجی واقعی، یک پروژه انتخاب کن.</div>';
            this.clearLivePreviewPdf();
            return;
          }
        } else {
          this.clearLivePreviewPdf();
          const outputHtml = await this.renderOutputDocument(template, project, data);
          if (requestId !== this.livePreviewSequence) return;
          root.innerHTML = outputHtml;
          await Promise.all(Array.from(root.querySelectorAll('img')).map(image =>
            image.decode ? image.decode().catch(() => {}) : Promise.resolve()
          ));
        }
        if (requestId === this.livePreviewSequence) {
          this.livePreviewReady = true;
          if (printButton) printButton.disabled = false;
          this.setStatus('pt-live-preview-status', 'پیش‌نمایش به‌روز است؛ می‌توانی همین خروجی را چاپ کنی.');
        }
      } catch (error) {
        if (requestId === this.livePreviewSequence) {
          this.livePreviewReady = false;
          this.clearLivePreviewPdf();
          if (printButton) printButton.disabled = true;
          this.setStatus('pt-live-preview-status', error.message || 'ساخت پیش‌نمایش زنده ناموفق بود.', true);
          root.innerHTML = '<div class="pt-empty-state">پیش‌نمایش ساخته نشد؛ طراحی و تغییرات شما محفوظ است.</div>';
        }
      } finally {
        this.livePreviewBusy = false;
        if (this.livePreviewPending && this.livePreviewTimer === null) this.scheduleLivePreview(150);
      }
    },
    isProjectOutputBindingEditable: function (binding, raw, elementType) {
      if (!binding || this.findImageAttachment(raw)) return false;
      const sourceType = String(binding.sourceType || '').toUpperCase();
      const selection = String(binding.selection || 'LATEST').toUpperCase();
      if (selection !== 'LATEST') return false;
      if (sourceType === 'PROJECT_FIELD') {
        return ['ProjectCode','Title','Description','Quantity'].includes(String(binding.field || ''));
      }
      if (sourceType === 'PROJECT_INFORMATION') {
        if (elementType === 'table') return Array.isArray(raw);
        return raw === null || raw === undefined || ['string','number','boolean'].includes(typeof raw);
      }
      if (sourceType === 'EVENT_FORM_FIELD') {
        if (elementType === 'table') return Array.isArray(raw);
        return raw === null || raw === undefined || ['string','number','boolean'].includes(typeof raw);
      }
      if (sourceType === 'EVENT_FIELD') {
        return ['OccurredAt','Description'].includes(String(binding.field || '')) &&
          (raw === null || raw === undefined || ['string','number','boolean'].includes(typeof raw));
      }
      return false;
    },
    bindProjectOutputSection: function (section, templateId) {
      if (!section || section.dataset.ptOutputEditBound === '1') return;
      section.dataset.ptOutputEditBound = '1';
      section.addEventListener('click', event => {
        const action = event.target.closest('[data-pt-edit-action]');
        if (action) {
          const editor = action.closest('.pt-output-inline-editor');
          if (editor) this.finishProjectOutputEdit(editor, action.dataset.ptEditAction === 'apply');
          return;
        }
        const value = event.target.closest('[data-pt-output-editable="true"]');
        if (!value || !section.contains(value)) return;
        const record = this.projectOutputRecords[String(templateId)];
        if (!record || this.projectOutputEdit) return;
        this.beginProjectOutputEdit(value, record);
      });
      section.addEventListener('keydown', event => {
        const editable = event.target.closest('[data-pt-output-editable="true"]');
        if (editable && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          const record = this.projectOutputRecords[String(templateId)];
          if (record && !this.projectOutputEdit) this.beginProjectOutputEdit(editable, record);
          return;
        }
        const editor = event.target.closest('.pt-output-inline-editor');
        if (!editor) return;
        if (event.key === 'Escape') {
          event.preventDefault();
          this.finishProjectOutputEdit(editor, false);
        } else if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
          event.preventDefault();
          this.finishProjectOutputEdit(editor, true);
        }
      });
    },
    beginProjectOutputEdit: function (valueNode, record) {
      const bindingId = String(valueNode.dataset.ptBindingId || '');
      const raw = record.data[bindingId];
      const isTableCell = valueNode.dataset.ptRowIndex !== undefined;
      const currentValue = String(valueNode.textContent || '');
      const editor = document.createElement('span');
      editor.className = 'pt-output-inline-editor';
      editor.dataset.ptBindingId = bindingId;
      editor.dataset.ptRowIndex = isTableCell ? valueNode.dataset.ptRowIndex : '';
      editor.dataset.ptColumnIndex = isTableCell ? valueNode.dataset.ptColumnIndex : '';
      editor.dataset.ptColumnKey = isTableCell ? (valueNode.dataset.ptColumnKey || '') : '';
      editor.dataset.ptIsTableCell = isTableCell ? '1' : '0';
      editor.dataset.ptValueClass = valueNode.className || 'pt-output-editable-value';
      editor.dataset.ptOriginalValue = currentValue;
      const multiline = !isTableCell && (currentValue.length > 90 || currentValue.includes('\n'));
      const input = document.createElement(multiline ? 'textarea' : 'input');
      if (!multiline) input.type = typeof raw === 'number' && !isTableCell ? 'number' : 'text';
      input.className = 'pt-output-inline-input';
      input.value = currentValue;
      input.setAttribute('aria-label', 'ویرایش مقدار');
      const actions = document.createElement('span');
      actions.className = 'pt-output-inline-actions';
      const apply = document.createElement('button');
      apply.type = 'button';
      apply.className = 'btn btn-primary btn-sm';
      apply.dataset.ptEditAction = 'apply';
      apply.textContent = 'اعمال';
      const cancel = document.createElement('button');
      cancel.type = 'button';
      cancel.className = 'btn btn-secondary btn-sm';
      cancel.dataset.ptEditAction = 'cancel';
      cancel.textContent = 'لغو';
      actions.append(apply, cancel);
      editor.append(input, actions);
      valueNode.replaceWith(editor);
      this.projectOutputEdit = { editor: editor, record: record };
      input.focus();
      if (typeof input.select === 'function') input.select();
    },
    finishProjectOutputEdit: function (editor, apply) {
      if (!editor || !editor.parentNode) {
        this.projectOutputEdit = null;
        return;
      }
      const record = this.projectOutputEdit && this.projectOutputEdit.editor === editor
        ? this.projectOutputEdit.record : null;
      const input = editor.querySelector('.pt-output-inline-input');
      const bindingId = String(editor.dataset.ptBindingId || '');
      const isTableCell = editor.dataset.ptIsTableCell === '1';
      const value = input ? input.value : '';
      if (apply && record && bindingId) {
        if (isTableCell) {
          const rowIndex = Number(editor.dataset.ptRowIndex);
          const columnIndex = Number(editor.dataset.ptColumnIndex);
          const row = Array.isArray(record.data[bindingId]) ? record.data[bindingId][rowIndex] : null;
          if (Array.isArray(row)) row[columnIndex] = value;
          else if (row && typeof row === 'object') {
            const key = editor.dataset.ptColumnKey || Object.keys(row)[columnIndex];
            if (key) row[key] = value;
          }
        } else {
          const prior = record.data[bindingId];
          record.data[bindingId] = typeof prior === 'number' && value.trim() !== '' && Number.isFinite(Number(value))
            ? Number(value) : value;
        }
      }
      const replacement = document.createElement('span');
      replacement.className = editor.dataset.ptValueClass || 'pt-output-editable-value';
      replacement.dataset.ptOutputEditable = 'true';
      replacement.dataset.ptBindingId = bindingId;
      if (isTableCell) {
        replacement.dataset.ptRowIndex = editor.dataset.ptRowIndex;
        replacement.dataset.ptColumnIndex = editor.dataset.ptColumnIndex;
        if (editor.dataset.ptColumnKey) replacement.dataset.ptColumnKey = editor.dataset.ptColumnKey;
      }
      replacement.textContent = apply ? value : String(editor.dataset.ptOriginalValue || '');
      editor.replaceWith(replacement);
      this.projectOutputEdit = null;
      if (apply) {
        this.setStatus('pt-output-status', 'تغییر در پیش‌نمایش اعمال شد. برای ثبت دائمی در اطلاعات اصلی، اتصال ذخیره‌سازی سرور در تسک بعدی انجام می‌شود.');
      }
    },
    initProjectOutput: async function (projectId) {
      this.projectOutputMode = true;
      this.projectOutputId = String(projectId || '').trim();
      this.projectOutputRecords = Object.create(null);
      this.projectOutputEdit = null;
      this.clearOutputPdfObjectUrls();
      this.clearGeneratedOutputPdf();
      this.loadOutputMargins();
      const controls = document.getElementById('pt-output-controls');
      const margins = document.getElementById('pt-output-margin-settings');
      const dataCard = document.getElementById('pt-output-data-card');
      const heading = document.getElementById('pt-output-project-heading');
      const previewCard = document.getElementById('pt-output-preview-card');
      const preview = document.getElementById('pt-output-preview');
      const printButton = document.getElementById('pt-output-print');
      const backButton = document.getElementById('pt-output-back');
      if (controls) controls.hidden = true;
      if (margins) margins.hidden = true;
      if (dataCard) dataCard.hidden = true;
      if (heading) heading.hidden = false;
      if (previewCard) previewCard.hidden = true;
      if (preview) preview.replaceChildren();
      if (printButton) {
        printButton.hidden = true;
        printButton.textContent = 'چاپ همه قالب‌ها / ذخیره PDF';
        printButton.addEventListener('click', () => this.printOutput());
      }
      if (backButton) {
        backButton.hidden = false;
        backButton.addEventListener('click', () => {
          if (PMS.Router && typeof PMS.Router.go === 'function') PMS.Router.go('events');
        });
      }
      this.setStatus('pt-output-status', 'در حال دریافت پروژه و قالب‌های فعال…');
      try {
        const results = await Promise.all([
          PMS.Api.get('/print-templates'),
          PMS.Api.get('/projects/' + encodeURIComponent(this.projectOutputId))
        ]);
        const templates = this.list(results[0]).filter(item =>
          item && item.ID && String(item.Status || 'ACTIVE').toUpperCase() === 'ACTIVE'
        );
        const projectResult = this.extract(results[1]) || {};
        const project = projectResult.project || projectResult.Project || projectResult.item || projectResult;
        const projectName = project.Title || project.Name || project.ProjectName || 'پروژه انتخاب‌شده';
        const projectCode = project.ProjectCode || project.Code || this.projectOutputId;
        if (heading) heading.textContent = 'قالب‌های پروژه ' + projectCode + ' — ' + projectName + ' | برای ویرایش روی مقادیر خط‌چین‌دار کلیک کن';
        if (!templates.length) {
          if (previewCard) previewCard.hidden = false;
          if (preview) preview.innerHTML = '<div class="pt-empty-state">برای این مجموعه هنوز قالب فعالی در قالب‌ساز ثبت نشده است.</div>';
          this.setStatus('pt-output-status', 'قالب فعالی برای نمایش وجود ندارد.');
          return;
        }
        let renderedCount = 0;
        let failedCount = 0;
        for (let index = 0; index < templates.length; index++) {
          const template = templates[index];
          const section = document.createElement('section');
          section.className = 'pt-project-template-output';
          section.dataset.templateId = String(template.ID);
          try {
            this.setStatus('pt-output-status', 'در حال آماده‌سازی قالب ' + (index + 1) + ' از ' + templates.length + ': ' + (template.Name || template.Code || '') + '…');
            const response = await PMS.Api.post('/print-templates/' + encodeURIComponent(template.ID) + '/resolve', {
              ProjectID: this.projectOutputId
            });
            const resolved = this.extract(response) || {};
            const resolvedProject = resolved.project || project;
            const data = resolved.data || {};
            if (!template.Definition) throw new Error('ساختار ذخیره‌شده قالب در دسترس نیست.');
            this.projectOutputRecords[String(template.ID)] = { template: template, project: resolvedProject, data: data, section: section };
            const documentHtml = await this.renderOutputDocument(template, resolvedProject, data, { preservePdfObjectUrls: true });
            if (renderedCount > 0) section.classList.add('starts-new-page');
            section.innerHTML = '<header class="pt-project-template-heading"><strong>' + this.esc(template.Name || template.Code || 'قالب بدون نام') +
              '</strong><span>' + this.esc(template.Code || '') + '</span></header><div class="pt-project-template-pages">' + documentHtml + '</div>';
            renderedCount++;
            this.bindProjectOutputSection(section, template.ID);
          } catch (templateError) {
            failedCount++;
            section.classList.add('has-error');
            section.innerHTML = '<header class="pt-project-template-heading"><strong>' + this.esc(template.Name || template.Code || 'قالب بدون نام') +
              '</strong><span>' + this.esc(template.Code || '') + '</span></header><div class="pt-empty-state is-error">آماده‌سازی این قالب ناموفق بود: ' +
              this.esc(templateError.message || 'خطای نامشخص') + '</div>';
          }
          if (preview) preview.appendChild(section);
        }
        if (previewCard) previewCard.hidden = false;
        if (printButton) printButton.hidden = renderedCount === 0;
        this.setStatus('pt-output-status', renderedCount + ' قالب از ' + templates.length + ' قالب فعال برای این پروژه آماده شد.' +
          (failedCount ? ' آماده‌سازی ' + failedCount + ' قالب ناموفق بود؛ خطای هر قالب در همان بخش مشخص شده است.' : '') +
          ' مقادیر خط‌چین‌دار قابل ویرایش در پیش‌نمایش هستند؛ ذخیره در اطلاعات اصلی در مرحله بعد متصل می‌شود.');
        if (previewCard) previewCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (error) {
        this.setStatus('pt-output-status', error.message || 'دریافت پروژه یا قالب‌ها ناموفق بود.', true);
        if (previewCard) previewCard.hidden = false;
        if (preview) preview.innerHTML = '<div class="pt-empty-state is-error">بارگذاری قالب‌های پروژه ناموفق بود. صفحه را دوباره باز کن.</div>';
      }
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
    getPdfRenderScale: function (viewport,dpi) {
      const width=Math.max(1,Number(viewport&&viewport.width)||1);
      const height=Math.max(1,Number(viewport&&viewport.height)||1);
      const targetScale=Math.max(72,Number(dpi)||300)/72;
      const maxPixels=12000000;
      const pixelLimitScale=Math.sqrt(maxPixels/(width*height));
      return Math.max(0.5,Math.min(targetScale,pixelLimitScale));
    },
    clearOutputPdfObjectUrls: function () {
      (this.outputPdfObjectUrls||[]).forEach(url=>{try{window.URL.revokeObjectURL(url);}catch(_){}});
      this.outputPdfObjectUrls=[];
    },
    clearGeneratedOutputPdf: function () {
      if (this.outputPdfBlobUrl) {
        try { window.URL.revokeObjectURL(this.outputPdfBlobUrl); } catch (_) {}
      }
      this.outputPdfBlobUrl = '';
      this.outputPdfFileName = 'PMS-document.pdf';
      this.outputPdfPreviewWarning = '';
    },
    fetchOutputPdfBytes: async function (templateId, localFile) {
      let bytes;
      if (localFile && typeof localFile.arrayBuffer === 'function') {
        bytes = new Uint8Array(await localFile.arrayBuffer());
      } else {
        if (!templateId) throw new Error('شناسه قالب برای دریافت PDF ذخیره‌شده موجود نیست.');
        const response = await PMS.Api.get('/print-templates/' + encodeURIComponent(templateId) + '/pdf', { trackSync: false });
        const file = this.extract(response) || {};
        const base64 = String(file.base64 || file.Base64 || '').replace(/^data:application\/pdf;base64,/i, '').replace(/\s/g, '');
        if (!base64) throw new Error('فایل PDF اصلی از فضای ذخیره‌سازی دریافت نشد.');
        const binary = window.atob(base64);
        bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      }
      if (!bytes.length || bytes[0] !== 0x25 || bytes[1] !== 0x50 || bytes[2] !== 0x44 || bytes[3] !== 0x46) {
        throw new Error('فایل دریافت‌شده، PDF معتبر نیست.');
      }
      return bytes;
    },
    getPdfOverlayPlacement: function (page, PDFLib, expectedPage) {
      const crop = page.getCropBox();
      const rotation = ((Number(page.getRotation().angle) % 360) + 360) % 360;
      const quarterTurn = rotation === 90 || rotation === 270;
      const displayWidth = quarterTurn ? crop.height : crop.width;
      const displayHeight = quarterTurn ? crop.width : crop.height;
      const expectedWidth = Number(expectedPage.width) * 72 / 25.4;
      const expectedHeight = Number(expectedPage.height) * 72 / 25.4;
      if (Math.abs(displayWidth - expectedWidth) > 2 || Math.abs(displayHeight - expectedHeight) > 2) {
        throw new Error('ابعاد یا چرخش صفحه PDF با مشخصات قالب هم‌خوانی ندارد؛ برای جلوگیری از جابه‌جایی اطلاعات، خروجی متوقف شد.');
      }
      let options = { x: crop.x, y: crop.y, width: crop.width, height: crop.height };
      if (rotation === 90) {
        options = {
          x: crop.x + (crop.width - crop.height) / 2,
          y: crop.y + (crop.height - crop.width) / 2,
          width: crop.height, height: crop.width, rotate: PDFLib.degrees(-90)
        };
      } else if (rotation === 180) {
        options.rotate = PDFLib.degrees(180);
      } else if (rotation === 270) {
        options = {
          x: crop.x + (crop.width - crop.height) / 2,
          y: crop.y + (crop.height - crop.width) / 2,
          width: crop.height, height: crop.width, rotate: PDFLib.degrees(90)
        };
      }
      return options;
    },
    drawPdfOverlayOnSourcePage: function (page, image, PDFLib, expectedPage) {
      page.drawImage(image, this.getPdfOverlayPlacement(page, PDFLib, expectedPage));
    },
    drawPdfOverlayPageOnSourcePage: function (page, overlayPage, PDFLib, expectedPage) {
      page.drawPage(overlayPage, this.getPdfOverlayPlacement(page, PDFLib, expectedPage));
    },
    getImageBytesForPdf: async function (dataUrl) {
      const match = String(dataUrl || '').match(/^data:(image\/[a-z0-9.+-]+);base64,([\s\S]+)$/i);
      if (!match) throw new Error('فایل تصویر اصلی برای درج در PDF معتبر نیست.');
      const mime = match[1].toLowerCase();
      const binary = window.atob(match[2].replace(/\s/g, ''));
      const originalBytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index++) originalBytes[index] = binary.charCodeAt(index);
      if (mime === 'image/jpeg' || mime === 'image/png') return { mime: mime, bytes: originalBytes };
      if (mime !== 'image/webp') throw new Error('فرمت تصویر برای درج مستقیم در PDF پشتیبانی نمی‌شود.');
      const image = new Image();
      image.src = dataUrl;
      if (typeof image.decode === 'function') await image.decode();
      else await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => reject(new Error('خواندن تصویر WebP برای تبدیل lossless ناموفق بود.'));
      });
      const width = Number(image.naturalWidth || image.width);
      const height = Number(image.naturalHeight || image.height);
      if (!width || !height) throw new Error('ابعاد تصویر WebP معتبر نیست.');
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      try {
        const context = canvas.getContext('2d', { alpha: true });
        if (!context) throw new Error('مرورگر امکان تبدیل lossless تصویر WebP را ندارد.');
        context.drawImage(image, 0, 0, width, height);
        const png = await new Promise((resolve, reject) => {
          canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('تبدیل lossless تصویر WebP ناموفق بود.')), 'image/png');
        });
        return { mime: 'image/png', bytes: new Uint8Array(await png.arrayBuffer()) };
      } finally {
        canvas.width = 0;
        canvas.height = 0;
      }
    },
    drawTemplateImageOnSourcePage: async function (pdfDocument, page, item, pageSpec, PDFLib) {
      const source = this.imageSources && this.imageSources[item.assetId || item.id];
      if (!source) throw new Error('فایل اصلی تصویر قالب در دسترس نیست: ' + (item.fileName || item.assetId || 'تصویر'));
      const imageData = await this.getImageBytesForPdf(source);
      const overlayDocument = await PDFLib.PDFDocument.create();
      const pageWidth = Number(pageSpec.width) * 72 / 25.4;
      const pageHeight = Number(pageSpec.height) * 72 / 25.4;
      if (!(pageWidth > 0 && pageHeight > 0)) throw new Error('ابعاد صفحه برای درج تصویر معتبر نیست.');
      const overlayPage = overlayDocument.addPage([pageWidth, pageHeight]);
      const embeddedImage = imageData.mime === 'image/jpeg'
        ? await overlayDocument.embedJpg(imageData.bytes)
        : await overlayDocument.embedPng(imageData.bytes);
      const mmToPt = 72 / 25.4;
      const frameX = Number(item.x || 0) * mmToPt;
      const frameY = Number(item.y || 0) * mmToPt;
      const frameWidth = Math.max(0.1, Number(item.width || 30) * mmToPt);
      const frameHeight = Math.max(0.1, Number(item.height || 15) * mmToPt);
      const ratio = embeddedImage.width / Math.max(1, embeddedImage.height);
      let drawWidth = frameWidth;
      let drawHeight = frameHeight;
      if (String(item.fit || 'contain').toLowerCase() === 'contain') {
        drawWidth = Math.min(frameWidth, frameHeight * ratio);
        drawHeight = drawWidth / ratio;
      }
      const x = frameX + (frameWidth - drawWidth) / 2;
      const y = pageHeight - frameY - frameHeight + (frameHeight - drawHeight) / 2;
      overlayPage.drawImage(embeddedImage, { x: x, y: y, width: drawWidth, height: drawHeight });
      const embeddedPages = await pdfDocument.embedPdf(await overlayDocument.save());
      if (!embeddedPages || !embeddedPages[0]) throw new Error('درج تصویر اصلی در PDF ناموفق بود.');
      this.drawPdfOverlayPageOnSourcePage(page, embeddedPages[0], PDFLib, pageSpec);
    },
    renderPdfOverlaySegment: async function (node, visibleElements, html2canvas, pdfDocument, page, pageSpec, PDFLib, scale, cssWidth, cssHeight) {
      if (!visibleElements || !visibleElements.length) return;
      const allElements = Array.from(node.querySelectorAll('.pt-output-element'));
      const previousVisibility = allElements.map(element => element.style.visibility);
      try {
        allElements.forEach(element => { element.style.visibility = 'hidden'; });
        visibleElements.forEach(element => {
          const index = allElements.indexOf(element);
          if (index >= 0) element.style.visibility = previousVisibility[index];
        });
        const canvas = await html2canvas(node, {
          backgroundColor: null, scale: scale, logging: false, useCORS: false,
          width: Math.ceil(cssWidth), height: Math.ceil(cssHeight),
          windowWidth: Math.max(window.innerWidth, Math.ceil(cssWidth)),
          windowHeight: Math.max(window.innerHeight, Math.ceil(cssHeight))
        });
        try {
          const png = await new Promise((resolve, reject) => {
            if (typeof canvas.toBlob !== 'function') {
              reject(new Error('مرورگر امکان آماده‌سازی لایه اطلاعاتی PDF را ندارد.'));
              return;
            }
            canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('ساخت لایه اطلاعاتی صفحه ناموفق بود.')), 'image/png');
          });
          const pngBytes = new Uint8Array(await png.arrayBuffer());
          const overlayImage = await pdfDocument.embedPng(pngBytes);
          this.drawPdfOverlayOnSourcePage(page, overlayImage, PDFLib, pageSpec);
        } finally {
          canvas.width = 0;
          canvas.height = 0;
        }
      } finally {
        allElements.forEach((element, index) => { element.style.visibility = previousVisibility[index]; });
      }
    },
    generateSourcePdfOutput: async function (template, project, data) {
      if (!template || (!template.ID && !this.pdfFile) || !template.Definition || !template.Definition.pdf ||
          !Array.isArray(template.Definition.pdf.pages) || !template.Definition.pdf.pages.length) {
        throw new Error('مشخصات PDF اصلی قالب کامل نیست؛ قالب را دوباره ذخیره کن.');
      }
      const PDFLib = await this.loadExternalScript('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js', 'PDFLib');
      const html2canvas = await this.loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js', 'html2canvas');
      if (!PDFLib || !PDFLib.PDFDocument || typeof html2canvas !== 'function') {
        throw new Error('موتور ساخت PDF با حفظ سند اصلی در دسترس نیست.');
      }
      this.setStatus('pt-output-status', 'در حال دریافت PDF اصلی و آماده‌سازی لایه اطلاعات…');
      const sourceBytes = await this.fetchOutputPdfBytes(template.ID, this.pdfFile);
      const pdfDocument = await PDFLib.PDFDocument.load(sourceBytes);
      const sourcePages = pdfDocument.getPages();
      const pageMetadata = template.Definition.pdf.pages;
      if (sourcePages.length !== pageMetadata.length) {
        throw new Error('تعداد صفحات PDF اصلی با مشخصات قالب یکسان نیست؛ قالب را دوباره ذخیره کن.');
      }
      const host = document.createElement('div');
      host.className = 'pt-output-overlay-render-host';
      host.style.cssText = 'position:fixed;left:-100000px;top:0;z-index:-1;display:block;width:max-content;direction:rtl;background:transparent;pointer-events:none;';
      try {
        host.innerHTML = await this.renderOutputDocument(template, project, data, { overlayOnly: true });
        document.body.appendChild(host);
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        const attachedImages = Array.from(host.querySelectorAll('img'));
        await Promise.all(attachedImages.map(image => image.decode ? image.decode() : Promise.resolve()));
        const overlayNodes = Array.from(host.querySelectorAll('.pt-print-page'));
        if (overlayNodes.length !== sourcePages.length) {
          throw new Error('تعداد لایه‌های اطلاعاتی با تعداد صفحات PDF اصلی برابر نیست.');
        }
        for (let index = 0; index < sourcePages.length; index++) {
          this.setStatus('pt-output-status', 'در حال افزودن اطلاعات و تصاویر اصلی به صفحه ' + (index + 1) + ' از ' + sourcePages.length + '…');
          const node = overlayNodes[index];
          const pageSpec = {
            width: Number(pageMetadata[index].widthMm),
            height: Number(pageMetadata[index].heightMm)
          };
          const rect = node.getBoundingClientRect();
          const cssWidth = Math.max(1, rect.width);
          const cssHeight = Math.max(1, rect.height);
          const targetScale = 300 / 96;
          const pixelLimitScale = Math.sqrt(12000000 / (cssWidth * cssHeight));
          if (pixelLimitScale < 0.5) throw new Error('ابعاد این صفحه برای ساخت لایه باکیفیت در حافظه مرورگر بیش از حد بزرگ است.');
          const scale = Math.max(0.5, Math.min(targetScale, pixelLimitScale));
          const elements = Array.from(node.querySelectorAll('.pt-output-element'));
          const definitionElements = Array.isArray(template.Definition.elements) ? template.Definition.elements : [];
          let segment = [];
          for (const element of elements) {
            if (element.getAttribute('data-pt-template-image') === 'true') {
              await this.renderPdfOverlaySegment(node, segment, html2canvas, pdfDocument, sourcePages[index], pageSpec, PDFLib, scale, cssWidth, cssHeight);
              segment = [];
              const elementId = element.getAttribute('data-pt-element-id');
              const imageItem = definitionElements.find(item => String(item.id) === String(elementId));
              if (!imageItem || !(imageItem.assetId || this.pendingImageFiles[elementId])) throw new Error('مشخصات تصویر مستقل قالب برای خروجی PDF پیدا نشد.');
              await this.drawTemplateImageOnSourcePage(pdfDocument, sourcePages[index], imageItem, pageSpec, PDFLib);
            } else {
              segment.push(element);
            }
          }
          await this.renderPdfOverlaySegment(node, segment, html2canvas, pdfDocument, sourcePages[index], pageSpec, PDFLib, scale, cssWidth, cssHeight);
        }
        this.setStatus('pt-output-status', 'در حال ذخیره PDF نهایی با حفظ صفحات اصلی…');
        const outputBytes = await pdfDocument.save({ useObjectStreams: true });
        return new Blob([outputBytes], { type: 'application/pdf' });
      } finally {
        if (host.parentNode) host.parentNode.removeChild(host);
      }
    },
    renderFinalPdfPreview: async function (blob, rootId) {
      if (!window.pdfjsLib || typeof window.pdfjsLib.getDocument !== 'function') {
        throw new Error('موتور پیش‌نمایش PDF بارگذاری نشده است؛ صفحه را تازه‌سازی کن.');
      }
      const root = document.getElementById(rootId || 'pt-output-preview');
      if (!root) return;
      root.innerHTML = '';
      const bytes = new Uint8Array(await blob.arrayBuffer());
      const pdf = await window.pdfjsLib.getDocument({ data: bytes }).promise;
      try {
        for (let number = 1; number <= pdf.numPages; number++) {
          const page = await pdf.getPage(number);
          const base = page.getViewport({ scale: 1 });
          const pixelLimitScale = Math.sqrt(3000000 / Math.max(1, base.width * base.height));
          const scale = Math.max(0.2, Math.min(1.25, 900 / Math.max(1, base.width), pixelLimitScale));
          const viewport = page.getViewport({ scale: scale });
          const canvas = document.createElement('canvas');
          canvas.className = 'pt-output-final-page';
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          const context = canvas.getContext('2d', { alpha: false });
          if (!context) throw new Error('ساخت پیش‌نمایش PDF ناموفق بود.');
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: context, viewport: viewport }).promise;
          root.appendChild(canvas);
          if (typeof page.cleanup === 'function') page.cleanup();
        }
      } finally {
        if (typeof pdf.destroy === 'function') await pdf.destroy();
      }
    },
    downloadOutputPdf: function () {
      if (!this.outputPdfBlobUrl) {
        this.setStatus('pt-output-status', 'ابتدا پیش‌نمایش سند را بساز.', true);
        return;
      }
      const link = document.createElement('a');
      link.href = this.outputPdfBlobUrl;
      link.download = this.outputPdfFileName || 'PMS-document.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    loadOutputPdfPages: async function (templateId, definition, options) {
      const metadata=definition&&definition.pdf;
      if(!metadata||!Array.isArray(metadata.pages)||!metadata.pages.length)return null;
      if(!window.pdfjsLib||typeof window.pdfjsLib.getDocument!=='function')throw new Error('موتور نمایش PDF بارگذاری نشده است؛ صفحه را تازه‌سازی کن و دوباره تلاش کن.');
      const response=await PMS.Api.get('/print-templates/'+encodeURIComponent(templateId)+'/pdf',{trackSync:false});
      const file=this.extract(response)||{};
      const base64=String(file.base64||file.Base64||'').replace(/^data:application\/pdf;base64,/i,'').replace(/\s/g,'');
      if(!base64)throw new Error('فایل پس‌زمینه PDF از فضای ذخیره‌سازی دریافت نشد.');
      const binary=window.atob(base64),bytes=new Uint8Array(binary.length);
      for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
      const pdf=await window.pdfjsLib.getDocument({data:bytes}).promise;
      if(pdf.numPages!==metadata.pages.length)throw new Error('تعداد صفحات فایل PDF با مشخصات قالب یکسان نیست؛ قالب را دوباره ذخیره کن.');
      const rendered=[];
      try {
        for(let pageNumber=1;pageNumber<=pdf.numPages;pageNumber++){
          const page=await pdf.getPage(pageNumber),baseViewport=page.getViewport({scale:1});
          const scale=this.getPdfRenderScale(baseViewport,300),viewport=page.getViewport({scale:scale});
          const canvas=document.createElement('canvas');
          try {
            canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
            const context=canvas.getContext('2d',{alpha:false});
            if(!context)throw new Error('امکان آماده‌سازی تصویر صفحه PDF وجود ندارد.');
            context.fillStyle='#ffffff';context.fillRect(0,0,canvas.width,canvas.height);
            await page.render({canvasContext:context,viewport:viewport}).promise;
            const blob=await new Promise((resolve,reject)=>{
              if(typeof canvas.toBlob!=='function'){reject(new Error('مرورگر امکان آماده‌سازی تصویر باکیفیت PDF را ندارد؛ لطفاً مرورگر را به‌روز کن.'));return;}
              canvas.toBlob(result=>result?resolve(result):reject(new Error('ساخت تصویر صفحه PDF ناموفق بود.')),'image/png');
            });
            const background=window.URL.createObjectURL(blob);
            this.outputPdfObjectUrls.push(background);
            const pageMeta=metadata.pages[pageNumber-1]||{};
            rendered.push({width:Number(pageMeta.widthMm)||(baseViewport.width*25.4/72),
              height:Number(pageMeta.heightMm)||(baseViewport.height*25.4/72),background:background});
          } finally {
            canvas.width=0;canvas.height=0;
            if(typeof page.cleanup==='function')page.cleanup();
          }
        }
        return rendered;
      } catch(error) {
        if (!(options && options.preservePdfObjectUrls)) this.clearOutputPdfObjectUrls();
        throw error;
      } finally {
        if(typeof pdf.destroy==='function')await pdf.destroy();
      }
    },
    renderOutputDocument: async function (template, project, data, options) {
      if (!(options && options.preservePdfObjectUrls)) this.clearOutputPdfObjectUrls();
      const definition = template && template.Definition ? template.Definition : {};
      const overlayOnly = !!(options && options.overlayOnly);
      await this.loadTemplateImages(template, definition);
      const pdfPages = !overlayOnly && template && template.Pdf && template.Pdf.HasFile
        ? await this.loadOutputPdfPages(template.ID, definition, options) : null;
      const page = definition.page || {};
      const sizes = {A4:[210,297],A5:[148,210],LETTER:[216,279]};
      const base = sizes[String(page.size || 'A4').toUpperCase()] || sizes.A4;
      const landscape = String(page.orientation || 'portrait').toLowerCase() === 'landscape';
      const defaultSpec = { width: landscape ? base[1] : base[0], height: landscape ? base[0] : base[1] };
      const pageSpecs = overlayOnly && definition.pdf && Array.isArray(definition.pdf.pages)
        ? definition.pdf.pages.map(item => ({width:Number(item.widthMm),height:Number(item.heightMm)}))
        : (pdfPages && pdfPages.length ? pdfPages.map(item => ({width:item.width,height:item.height})) : [defaultSpec]);
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
        const canEditValue = !overlayOnly && this.projectOutputMode &&
          this.isProjectOutputBindingEditable(binding, raw, item.type);
        const editableValue = canEditValue
          ? '<span class="pt-output-editable-value" data-pt-output-editable="true" data-pt-binding-id="' + this.esc(item.bindingId) + '" tabindex="0" role="button" title="برای ویرایش کلیک کن">' + this.esc(value) + '</span>'
          : this.esc(value);
        const fieldContent = item.type === 'field' && item.showLabel && item.label
          ? '<span class="pt-output-field-label">' + this.esc(item.label) + ':</span> ' + editableValue
          : editableValue;
        const style = 'left:'+Number(item.x||0)+'mm;top:'+Number(item.y||0)+'mm;width:'+Number(item.width||30)+'mm;min-height:'+Number(item.height||15)+'mm;font-size:'+Number(item.fontSize||12)+'pt;text-align:'+this.esc(item.align||'right')+';color:'+this.esc(item.color||'#1f2937')+';background:'+this.esc(item.background||'transparent')+';';
        if (isImage) {
          let image = '';
          if (imageAttachment) {
            try {
              const src = await this.loadOutputImage(raw);
              image = '<img class="pt-output-image-content" src="' + src + '" alt="' + this.esc(imageAttachment.id) + '">';
            } catch (error) {
              if (overlayOnly) throw error;
              image = '<div class="pt-output-image pt-output-image-error">بارگذاری تصویر ناموفق بود</div>';
            }
          } else if (item.type === 'image' && this.imageSources[item.assetId || item.id]) {
            image = '<img class="pt-output-image-content" src="' + this.esc(this.imageSources[item.assetId || item.id]) + '" alt="' + this.esc(item.fileName || 'تصویر قالب') + '">';
          } else if (item.type === 'image') {
            if (overlayOnly) throw new Error('تصویر ثابت قالب بارگذاری نشده است: ' + (item.fileName || item.assetId || 'تصویر'));
            image = '<div class="pt-output-image pt-output-image-error">تصویر قالب در دسترس نیست</div>';
          } else {
            image = '<div class="pt-output-image pt-output-image-empty" aria-hidden="true"></div>';
          }
          const directTemplateImage = item.type === 'image' && !!(item.assetId || this.pendingImageFiles[item.id]) && !imageAttachment;
          const imageStyle = style + 'height:' + Number(item.height || 15) + 'mm;';
          const imageLabel = item.type === 'field' && item.showLabel && item.label
            ? '<div class="pt-output-field-label">' + this.esc(item.label) + ':</div>' : '';
          return '<div class="pt-output-element pt-output-image-frame"'+(directTemplateImage ? ' data-pt-template-image="true" data-pt-element-id="'+this.esc(item.id)+'"' : '')+' style="'+imageStyle+'">'+imageLabel+image+'</div>';
        }
        if (item.type === 'table') {
          const rows = Array.isArray(raw) ? raw : (item.rows || []);
          const columns = item.columns || [];
          const tableEditable = !overlayOnly && this.projectOutputMode &&
            this.isProjectOutputBindingEditable(binding, raw, item.type);
          const tableRows = rows.map((row, rowIndex) => {
            const cells = Array.isArray(row) ? row : (row && typeof row === 'object'
              ? (item.columnKeys || columns).map((key,i) => row[key] !== undefined ? row[key] : Object.values(row)[i])
              : [row]);
            return '<tr>'+columns.map((_,i)=>{
              const key = !Array.isArray(row) && row && typeof row === 'object'
                ? String((item.columnKeys && item.columnKeys[i]) || Object.keys(row)[i] || '') : '';
              const cellValue = this.esc(this.formatOutputValue(cells[i]));
              const editable = tableEditable
                ? '<span class="pt-output-editable-value" data-pt-output-editable="true" data-pt-binding-id="' + this.esc(item.bindingId) +
                  '" data-pt-row-index="' + rowIndex + '" data-pt-column-index="' + i + '"' +
                  (key ? ' data-pt-column-key="' + this.esc(key) + '"' : '') +
                  ' tabindex="0" role="button" title="برای ویرایش کلیک کن">' + cellValue + '</span>'
                : cellValue;
              return '<td>'+editable+'</td>';
            }).join('')+'</tr>';
          }).join('');
          return '<div class="pt-output-element pt-output-table" style="'+style+'"><strong>'+this.esc(item.text||'')+'</strong><table><thead><tr>'+columns.map(col=>'<th>'+this.esc(col)+'</th>').join('')+'</tr></thead><tbody>'+tableRows+'</tbody></table></div>';
        }
        if (item.type === 'line' || item.type === 'divider') return '<div class="pt-output-element pt-output-shape pt-output-'+item.type+'" style="'+style+'" aria-hidden="true"></div>';
        if (item.type === 'rectangle' || item.type === 'ellipse') return '<div class="pt-output-element pt-output-shape pt-output-'+item.type+'" style="'+style+'" aria-hidden="true"></div>';
        return '<div class="pt-output-element'+(item.type === 'field' ? ' pt-output-field' : '')+'" dir="auto" style="'+style+'">'+fieldContent+'</div>';
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
        const margins = overlayOnly ? { top: 0, bottom: 0, right: 0, left: 0 } : (this.outputMargins || { top: 8, bottom: 8, right: 8, left: 8 });
        const safeWidth = overlayOnly ? spec.width : 210;
        const safeHeight = overlayOnly ? spec.height : 297;
        const availableWidth = Math.max(20, safeWidth - margins.left - margins.right);
        const availableHeight = Math.max(20, safeHeight - margins.top - margins.bottom);
        const fitScale = overlayOnly ? 1 : Math.max(0.01, Math.min(availableWidth / Math.max(1, spec.width), availableHeight / Math.max(1, spec.height)));
        const pageContent = '<div class="pt-print-page-content" style="width:'+spec.width+'mm;height:'+spec.height+'mm;left:'+margins.left+'mm;top:'+margins.top+'mm">'+background+elements.join('')+'</div>';
        const pageStyle = 'width:'+spec.width+'mm;height:'+spec.height+'mm;--pt-print-scale:'+fitScale+
          ';--pt-print-width:'+safeWidth+'mm;--pt-print-height:'+safeHeight+'mm';
        pages.push('<article class="pt-print-page'+(pdfPages ? ' pt-has-pdf' : '')+'" data-page-index="'+pageIndex+'" style="'+pageStyle+'" dir="rtl">'+pageContent+'</article>');
      }
      return pages.join('');
    },
    printOutput: async function () {
      if (this.outputPdfBlobUrl) {
        const opened = window.open(this.outputPdfBlobUrl, '_blank');
        if (!opened) this.setStatus('pt-output-status', 'مرورگر پنجره PDF را مسدود کرد؛ از دکمه «دانلود PDF نهایی» استفاده کن.');
        else this.setStatus('pt-output-status', 'PDF اصلی در نمایشگر مرورگر باز شد؛ از گزینه چاپ یا ذخیره همان نمایشگر استفاده کن.');
        return;
      }
      if (!this.projectOutputMode) this.saveOutputMargins();
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
      const initialPrintButton = document.getElementById('pt-output-print');
      const initialDownloadButton = document.getElementById('pt-output-download');
      if (initialPrintButton) initialPrintButton.hidden = true;
      if (initialDownloadButton) initialDownloadButton.hidden = true;
      this.clearGeneratedOutputPdf();
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
        const hasSourcePdf = !!(template.Pdf && template.Pdf.HasFile && template.Definition.pdf && Array.isArray(template.Definition.pdf.pages));
        const marginSettings = document.getElementById('pt-output-margin-settings');
        const downloadButton = document.getElementById('pt-output-download');
        const printButton = document.getElementById('pt-output-print');
        if (hasSourcePdf) {
          if (marginSettings) marginSettings.hidden = true;
          const outputBlob = await this.generateSourcePdfOutput(template, project, data);
          this.outputPdfBlobUrl = window.URL.createObjectURL(outputBlob);
          const safeName = String(template.Code || template.Name || 'PMS-document').replace(/[^\w\u0600-\u06FF-]+/g, '-').replace(/^-+|-+$/g, '');
          this.outputPdfFileName = (safeName || 'PMS-document') + '.pdf';
          let previewWarning = '';
          if (preview) {
            try { await this.renderFinalPdfPreview(outputBlob); }
            catch (previewError) {
              preview.innerHTML = '<div class="pt-empty-state">فایل PDF نهایی ساخته شد، اما پیش‌نمایش در این مرورگر نمایش داده نشد. می‌توانی فایل را دانلود یا باز کنی.</div>';
              previewWarning = ' پیش‌نمایش مرورگر در دسترس نبود، اما فایل نهایی آماده دانلود است.';
            }
          }
          if (downloadButton) downloadButton.hidden = false;
          if (printButton) printButton.textContent = 'بازکردن PDF برای چاپ';
          this.outputPdfPreviewWarning = previewWarning;
        } else {
          if (marginSettings) marginSettings.hidden = false;
          if (preview) preview.innerHTML = await this.renderOutputDocument(template, project, data);
          if (downloadButton) downloadButton.hidden = true;
          if (printButton) printButton.textContent = 'چاپ / ذخیره PDF';
        }
        if (card) card.hidden = false;
        if (printButton) printButton.hidden = false;
        const root = document.getElementById('pt-output-data');
        const keys = Object.keys(data);
        if (root) root.innerHTML = keys.length ? '<div class="pt-resolved-list">' +
          keys.map(key => '<div class="pt-resolved-row"><strong>' + this.esc(key) + '</strong><pre>' +
            this.esc(typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key], null, 2)) +
            '</pre></div>').join('') + '</div>' : '<div class="pt-empty-state">این قالب منبع داده‌ای ندارد.</div>';
        this.setStatus('pt-output-status', hasSourcePdf
          ? 'PDF نهایی آماده شد؛ صفحات و محتوای اصلی سند حفظ شده‌اند. برای دریافت فایل از «دانلود PDF نهایی» استفاده کن.' + (this.outputPdfPreviewWarning || '')
          : 'پیش‌نمایش سند آماده است؛ برای چاپ یا ذخیره PDF از دکمه مربوط استفاده کن.');
      } catch (error) {
        this.setStatus('pt-output-status', error.message || 'ساخت پیش‌نمایش سند ناموفق بود.', true);
      } finally { if (button) button.disabled = false; }
    }
  };
  PMS.Modules = PMS.Modules || {};
  PMS.Modules.PrintDesigner = PrintDesigner;
})();