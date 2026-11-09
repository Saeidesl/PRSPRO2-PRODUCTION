'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const test=require('node:test');
const vm=require('node:vm');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');

test('template library uses central CRUD and source catalog APIs',()=>{
 const module=read('js/modules/print-designer.js');
 const page=read('pages/print-designer.html');
 assert.ok(module.includes("PMS.Api.get('/print-templates')"));
 assert.ok(module.includes("PMS.Api.get('/print-templates/sources')"));
 assert.ok(module.includes("PMS.Api.post('/print-templates'"));
 assert.ok(module.includes("PMS.Api.put('/print-templates/'"));
 assert.ok(module.includes("PMS.Api.delete('/print-templates/'"));
 assert.match(page,/pt-source-list/);
 assert.match(page,/pt-binding-list/);
});


test('template bindings use stable project, central-information and form field identifiers',()=>{
 const module=read('js/modules/print-designer.js');
 assert.match(module,/sourceType: 'PROJECT_FIELD'/);
 assert.match(module,/sourceType: 'PROJECT_INFORMATION'/);
 assert.match(module,/sourceType: 'EVENT_FORM_FIELD'/);
 assert.match(module,/informationTypeId: field\.InformationTypeID/);
 assert.match(module,/selection: 'LATEST'/);
});


test('document output resolves a shared template against the selected project',()=>{
 const module=read('js/modules/print-designer.js');
 const page=read('pages/print-output.html');
 assert.match(page,/pt-output-template/);
 assert.match(page,/pt-output-project/);
 assert.ok(module.includes("PMS.Api.post('/print-templates/' + encodeURIComponent(templateId) + '/resolve'"));
 assert.match(module,/resolveOutput: async function/);
});


test('print routes no longer initialize the project detail module',()=>{
 const router=read('js/core/router.js');
 const index=read('index.html');
 assert.ok(router.includes("'print-design': 'PrintDesigner'"));
 assert.ok(router.includes("'print-output': 'PrintDesigner'"));
 assert.match(index,/js\/modules\/print-designer\.js\?v=/);
 assert.match(index,/css\/print-template-library\.css\?v=/);
 assert.doesNotMatch(router,/'print-output': 'ProjectDetail'/);
});


test('template library stylesheet is responsive and uses application theme variables',()=>{
 const css=read('css/print-template-library.css');
 assert.match(css,/@media\(max-width:900px\)/);
 assert.match(css,/@media\(max-width:560px\)/);
 assert.match(css,/var\(--text-secondary/);
 assert.match(css,/var\(--border-color/);
});


test('print designer module parses and is loaded exactly once',()=>{
 const module=read('js/modules/print-designer.js');
 assert.doesNotThrow(()=>new vm.Script(module,{filename:'print-designer.js'}));
 const index=read('index.html');
 assert.equal(index.split('js/modules/print-designer.js').length - 1,1);
});



test('visual editor module parses and exposes canvas interactions',()=>{
 const module=read('js/modules/print-designer.js');
 const page=read('pages/print-designer.html');
 const css=read('css/print-template-library.css');
 assert.doesNotThrow(()=>new vm.Script(module,{filename:'print-designer.js'}));
 for(const token of ['bindEditor: function','createElement: function','renderCanvas: function','renderInspector: function','commitHistory: function','undo: function','redo: function','pointermove','pointerup','data-pt-resize']) assert.ok(module.includes(token),token);
 for(const id of ['pt-design-canvas','pt-inspector-fields','pt-page-size','pt-page-orientation','pt-prop-columns','pt-prop-rows','pt-prop-color','pt-prop-background','pt-prop-selection','pt-layer-list','pt-editor-source-list','pt-source-count']) assert.ok(page.includes(id),id);
 assert.match(css,/\.pt-design-canvas\{position:relative/);
 assert.match(css,/\.pt-canvas-element\.is-selected/);
 assert.match(css,/\.pt-editor-layout/);
});


test('visual editor persists page layout and supports editable table rows and layer order',()=>{
 const module=read('js/modules/print-designer.js');
 assert.match(module,/definition\.elements\.push\(item\)/);
 assert.match(module,/definition\.page\.size/);
 assert.match(module,/pt-prop-rows/);
 assert.match(module,/pt-prop-columns/);
 assert.match(module,/layer-up/);
 assert.match(module,/layer-down/);
 assert.match(module,/previewMode/);
 assert.match(module,/Promise\.allSettled/);
 assert.match(module,/pt-editor-source-list/);
 assert.match(module,/sourceError/);
 assert.match(module,/اتصال/);
 assert.match(module,/pt-prop-selection/);
 assert.match(module,/color:' \+ this\.esc\(item\.color/);
 assert.match(module,/background:' \+ this\.esc\(item\.background/);
 assert.match(module,/Definition: this\.definition/);
});


test('mobile template editor presents a guided workflow with collapsible tool panels',()=>{
 const page=read('pages/print-designer.html');
 const css=read('css/print-template-library.css');
 assert.match(page,/مرحله ۱: طراحی صفحه/);
 assert.match(page,/مرحله ۲: تنظیم المان انتخاب‌شده/);
 assert.match(page,/مرحله ۳: اتصال اطلاعات/);
 assert.match(page,/مرحله ۴: نام‌گذاری و ذخیره قالب/);
 assert.match(page,/<details class="[^"]*pt-saved-templates"/);
 assert.match(page,/<details class="pt-mobile-tools"/);
 assert.match(page,/<details class="pt-editor-source-picker"/);
 assert.match(page,/<details class="pt-layer-details"/);
 assert.match(css,/@media\(max-width:700px\)/);
 assert.match(css,/\.pt-toolbar-actions\{display:grid/);
 assert.match(css,/\.pt-mobile-tools-body/);
});



test('print output page exposes an HTML document preview and browser print action',()=>{
 const page=read('pages/print-output.html');
 const module=read('js/modules/print-designer.js');
 const styles=read('css/print-template-library.css');
 assert.match(page,/id="pt-output-preview"/);
 assert.match(page,/id="pt-output-print"/);
 assert.doesNotMatch(page,/pt-output-download/);
 assert.match(module,/renderOutputDocument/);
 assert.match(module,/window\.print\(\)/);
 assert.match(styles,/body\.pt-printing/);
});

test('drawing toolbar supports editable line, divider, rectangle and ellipse elements in editor and print output',()=>{
 const module=read('js/modules/print-designer.js');
 const page=read('pages/print-designer.html');
 const css=read('css/print-template-library.css');
 for(const action of ['add-line','add-divider','add-rectangle','add-ellipse']) assert.ok(page.includes('data-pt-action="'+action+'"'),action);
 for(const type of ['line','divider','rectangle','ellipse']) assert.ok(module.includes("createElement('"+type+"'"),type);
 assert.ok(module.includes("pt-output-shape pt-output-"+"'+item.type"), 'print output maps shape types to output classes');
 assert.match(module,/item\\.type === 'rectangle' \\|\\| item\\.type === 'ellipse'/);
 assert.match(module,/pt-shape-outline/);
 assert.match(module,/pt-shape-line/);
 assert.match(css,/\.pt-output-rectangle/);
 assert.match(css,/\.pt-output-divider/);
});



test('print output resolves secure image attachments and waits for images before printing',()=>{
 const module=read('js/modules/print-designer.js');
 const css=read('css/print-template-library.css');
 assert.match(module,/findImageAttachment: function/);
 assert.match(module,/loadOutputImage: async function/);
 assert.match(module,/\/attachments\/.*\/download/);
 assert.match(module,/await this\.renderOutputDocument/);
 assert.match(module,/image\.decode/);
 assert.match(module,/pt-output-image-content/);
 assert.match(css,/\.pt-output-image-content/);
});



test('print output hides image helper copy and uses exact page size without forcing a trailing blank page',()=>{
 const module=read('js/modules/print-designer.js');
 const styles=read('css/print-template-library.css');
 assert.match(module,/pt-output-image-empty/);
 assert.doesNotMatch(module,/برای نمایش تصویر، منبع تصویر را به این المان متصل کن/);
 assert.match(module,/@page/);
 assert.ok(module.includes("--pt-print-height:'+safeHeight+'mm"), 'each HTML output page uses a bounded physical print height');
 assert.match(styles,/\.pt-section-title\{display:none!important\}/);
 assert.match(styles,/page-break-after:auto!important/);
});



test('print output assets use refreshed cache keys for the current print fixes',()=>{
 const index=read('index.html');
 assert.ok(index.includes('css/print-template-library.css?v=20261109-remove-background-import-1'));
 assert.ok(index.includes('js/modules/print-designer.js?v=20261109-remove-background-import-1'));
});



test('final print document omits the automatic form and project header',()=>{
 const module=read('js/modules/print-designer.js');
 assert.doesNotMatch(module,/pt-print-heading/);
 assert.match(module,/pt-print-page-content/);
 assert.match(module,/pages\.push\('<article class="pt-print-page"/);
});

test('HTML print scales each complete page into the configured A4 printable area',()=>{
 const module=read('js/modules/print-designer.js');
 const styles=read('css/print-template-library.css');
 const index=read('index.html');
 assert.ok(module.includes('safeWidth-margins.left-margins.right') || module.includes('safeWidth - margins.left - margins.right'));
 assert.ok(module.includes('safeHeight-margins.top-margins.bottom') || module.includes('safeHeight - margins.top - margins.bottom'));
 assert.match(module,/--pt-print-scale/);
 assert.match(module,/--pt-print-width/);
 assert.match(module,/pt-print-page-content/);
 assert.ok(module.includes("@page{size:A4 portrait;margin:0}"));
 assert.ok(styles.includes('transform:scale(var(--pt-print-scale,1))'));
 assert.ok(styles.includes('width:var(--pt-print-width,210mm)!important'));
 assert.ok(styles.includes('height:var(--pt-print-height,297mm)!important'));
 assert.ok(styles.includes('break-inside:avoid!important'));
 assert.ok(index.includes('remove-pdf-background-1'));
});

test('print output exposes persistent user-configurable margins for all templates',()=>{
 const page=read('pages/print-output.html');
 const module=read('js/modules/print-designer.js');
 const styles=read('css/print-template-library.css');
 const index=read('index.html');
 for(const side of ['top','bottom','right','left']) {
  assert.ok(page.includes('id="pt-margin-'+side+'"'),side+' margin input exists');
  assert.ok(module.includes("'"+side+"'"),side+' margin is loaded and saved');
 }
 assert.match(page,/pt-margin-reset/);
 assert.match(module,/PMS_PRINT_OUTPUT_MARGINS_V1/);
 assert.match(module,/window\.localStorage\.getItem/);
 assert.match(module,/window\.localStorage\.setItem/);
 assert.match(module,/availableWidth = Math\.max\(20, safeWidth - margins\.left - margins\.right\)/);
 assert.match(module,/availableHeight = Math\.max\(20, safeHeight - margins\.top - margins\.bottom\)/);
 assert.match(module,/left:'\+margins\.left\+'mm;top:'\+margins\.top\+'mm/);
 assert.match(styles,/\.pt-print-margin-grid/);
 assert.ok(styles.includes('transform:scale(var(--pt-print-scale,1))'));
 assert.ok(index.includes('remove-pdf-background-1'));
});



test('print margin controls apply immediately to the rendered page and persist mobile input',()=>{
 const module=read('js/modules/print-designer.js');
 const index=read('index.html');
 assert.match(module,/input\.addEventListener\('input',\s*\(\) => this\.saveOutputMargins\(\)\)/);
 assert.match(module,/content\.style\.transform = 'scale\(' \+ scale \+ '\)'/);
 assert.match(module,/content\.style\.left = margins\.left \+ 'mm'/);
 assert.match(module,/content\.style\.top = margins\.top \+ 'mm'/);
 assert.match(module,/article\.style\.setProperty\('--pt-print-width', safeWidth \+ 'mm'\)/);
 assert.match(module,/article\.style\.setProperty\('--pt-print-height', safeHeight \+ 'mm'\)/);
 assert.ok(index.includes('remove-pdf-background-1'));
});



test('legacy field analysis and PDF background rendering assets are absent',()=>{
 const sources=['pages/print-designer.html','js/modules/print-designer.js','css/print-template-library.css','index.html'].map(read);
 const forbidden=[
  String.fromCharCode(112,116,45,115,109,97,114,116,45,100,101,116,101,99,116),
  String.fromCharCode(114,117,110,83,109,97,114,116,68,101,116,101,99,116,105,111,110),
  String.fromCharCode(116,101,115,115,101,114,97,99,116),
  String.fromCharCode(84,101,115,115,101,114,97,99,116),
  String.fromCharCode(79,67,82),
  'pt-pdf-file','imageFileToPdf','handleImportFile','handlePdfFile','loadTemplatePdf',
  'pdfjsLib','PDFLib','jspdf','html2canvas','generateSourcePdfOutput','pt-pdf-background'
 ];
 for(const source of sources) for(const token of forbidden) assert.equal(source.includes(token),false,'obsolete asset marker must be absent: '+token);
});

test('manual template fields and existing binding types remain supported',()=>{
 const module=read('js/modules/print-designer.js');
 const styles=read('css/print-template-library.css');
 assert.match(module,/pt-field-hint/);
 assert.match(module,/pt-output-field/);
 assert.match(module,/PROJECT_FIELD/);
 assert.match(module,/PROJECT_INFORMATION/);
 assert.match(module,/EVENT_FORM_FIELD/);
 assert.match(module,/type === 'field'/);
 assert.ok(styles.includes('.pt-field-hint'));
 assert.ok(styles.includes('.pt-output-field'));
});


test('template designer adds real image elements and uses dedicated tenant image asset APIs without converting to PDF',()=>{
 const page=read('pages/print-designer.html');
 const module=read('js/modules/print-designer.js');
 const css=read('css/print-template-library.css');
 assert.match(page,/id="pt-image-file"/);
 assert.match(page,/data-pt-action="add-image">افزودن تصویر/);
 assert.match(module,/handleImageSelection: async function/);
 assert.match(module,/uploadPendingImages: async function/);
 assert.match(module,/\/images\//);
 assert.match(module,/\/images'/);
 assert.match(module,/assetId/);
 assert.match(module,/pt-canvas-image/);
 assert.match(css,/\.pt-canvas-image/);
 const action=module.slice(module.indexOf("if (action === 'add-image')"),module.indexOf("if (action === 'add-line')"));
 assert.match(action,/input\.click\(\)/);
 assert.doesNotMatch(action,/imageFileToPdf/);
});



test('saved template image assets are loaded for output and embedded as image elements instead of empty placeholders',()=>{
 const module=read('js/modules/print-designer.js');
 assert.match(module,/await this\.loadTemplateImages\(template, definition\)/);
 assert.match(module,/item\.type === 'image' && this\.imageSources\[item\.assetId \|\| item\.id\]/);
 assert.match(module,/pt-output-image-content/);
 assert.match(module,/تصویر ثابت قالب بارگذاری نشده است/);
});



test('print designer renders live output beside the canvas using the selected project and unsaved definition',()=>{
 const page=read('pages/print-designer.html');
 const module=read('js/modules/print-designer.js');
 const styles=read('css/print-template-library.css');
 assert.match(page,/id="pt-live-preview-project"/);
 assert.match(page,/id="pt-live-preview-content"/);
 assert.match(page,/id="pt-live-preview-refresh"/);
 assert.match(page,/id="pt-live-preview-expand"/);
 assert.match(styles,/\.pt-editor-preview-layout/);
 assert.match(styles,/\.pt-live-preview-panel\.is-expanded/);
 assert.match(module,/loadLivePreviewProjects: async function/);
 assert.match(module,/scheduleLivePreview: function/);
 assert.match(module,/livePreviewSequence/);
 assert.match(module,/PMS\.Api\.post\('\/print-templates\/preview'/);
 assert.match(module,/ProjectID: projectId,[\s\S]*Definition: definition/);
 const start=module.indexOf('    renderLivePreview: async function');
 const end=module.indexOf('    loadOutputOptions: async function',start);
 const preview=module.slice(start,end);
 assert.ok(start>=0&&end>start);
 assert.match(preview,/this\.renderOutputDocument\(template, project, data\)/);
 assert.doesNotMatch(preview,/generateSourcePdfOutput|pdfFile|Pdf\.HasFile/);
 assert.doesNotMatch(preview,/saveTemplate\(|PMS\.Api\.(post|put)\('\/print-templates'\s*,/);
});


test('live preview exposes a print action and prints the current HTML preview without using the saved output route',()=>{
 const page=read('pages/print-designer.html');
 const module=read('js/modules/print-designer.js');
 const styles=read('css/print-template-library.css');
 assert.match(page,/id="pt-live-preview-print" disabled/);
 assert.match(module,/printLivePreview: async function/);
 assert.doesNotMatch(module,/livePreviewPdfBlob|generateSourcePdfOutput|renderFinalPdfPreview/);
 assert.match(module,/window\.print\(\)/);
 assert.match(module,/this\.livePreviewReady/);
 assert.match(styles,/body\.pt-live-preview-printing #pt-live-preview-content/);
 assert.match(styles,/pt-live-preview-printing #pt-live-preview-content \.pt-print-page:last-child/);
 const start=module.indexOf('    printLivePreview: async function');
 const end=module.indexOf('    toggleLivePreviewExpanded: function',start);
 const printMethod=module.slice(start,end);
 assert.ok(start>=0&&end>start);
 assert.doesNotMatch(printMethod,/saveTemplate\(|PMS\.Api\.(post|put)\(/);
});


test('live preview omits only the empty asset ID of a pending local image without mutating the editor definition',()=>{
 const sandbox={window:{PMS:{}},console};
 vm.runInNewContext(read('js/modules/print-designer.js'),sandbox);
 const designer=sandbox.window.PMS.Modules.PrintDesigner;
 designer.definition={elements:[
  {id:'pending-image-1',type:'image',assetId:'',fileName:'new.png'},
  {id:'saved-image-1',type:'image',assetId:'IMG_1234567890abcdef',fileName:'saved.png'},
  {id:'broken-image-1',type:'image',assetId:'',fileName:'missing.png'}
 ],bindings:[]};
 designer.pendingImageFiles={'pending-image-1':{name:'new.png'}};
 const original=JSON.stringify(designer.definition);
 const preview=designer.createLivePreviewDefinition();
 assert.equal(preview.elements[0].assetId,undefined);
 assert.equal(preview.elements[1].assetId,'IMG_1234567890abcdef');
 assert.equal(preview.elements[2].assetId,'');
 assert.equal(JSON.stringify(designer.definition),original);
});


test('PDF background import and source-PDF rendering are absent while direct page images remain supported',()=>{
 const page=read('pages/print-designer.html');
 const module=read('js/modules/print-designer.js');
 const styles=read('css/print-template-library.css');
 const index=read('index.html');
 const output=read('pages/print-output.html');
 for(const token of ['pt-pdf-file','pt-pdf-import','application/pdf','pt-pdf-status']) assert.equal(page.includes(token),false,token);
 for(const token of ['handleImportFile','handlePdfFile','imageFileToPdf','loadTemplatePdf','renderPdfBackgrounds','pdfjsLib','jspdf','PDFLib','html2canvas','generateSourcePdfOutput','renderFinalPdfPreview','loadOutputPdfPages']) assert.equal(module.includes(token),false,token);
 assert.equal(index.includes('pdf.js/3.11.174'),false);
 assert.equal(styles.includes('pt-pdf-background'),false);
 assert.equal(output.includes('pt-output-download'),false);
 assert.match(page,/id="pt-image-file"/);
 assert.match(page,/data-pt-action="add-image">افزودن تصویر/);
 assert.match(module,/handleImageSelection: async function/);
 assert.match(module,/uploadPendingImages: async function/);
 assert.match(module,/loadTemplateImages: async function/);
 assert.match(module,/\/images\//);
 assert.match(module,/pt-canvas-image/);
 assert.match(module,/pt-output-image-content/);
 assert.match(module,/renderOutputDocument: async function/);
 assert.match(module,/window\.print\(\)/);
});

test('legacy PDF page metadata is not used by the editor or HTML output renderer',()=>{
 const module=read('js/modules/print-designer.js');
 assert.doesNotMatch(module,/\.pdf\b|Pdf\.|pdfFile|pdfDocument|page\.render/);
 assert.match(module,/pageCount = Math\.max\(1,/);
 assert.match(module,/pageIndex/);
});

test('print output renders only HTML pages and keeps browser print-to-PDF available',()=>{
 const page=read('pages/print-output.html');
 const module=read('js/modules/print-designer.js');
 assert.match(page,/id="pt-output-preview"/);
 assert.match(page,/id="pt-output-print"/);
 assert.doesNotMatch(page,/pt-output-download/);
 assert.match(module,/renderOutputDocument: async function/);
 assert.match(module,/printOutput: async function/);
 assert.match(module,/window\.print\(\)/);
 assert.doesNotMatch(module,/generateSourcePdfOutput|renderFinalPdfPreview|loadOutputPdfPages|PDFLib|pdfjsLib/);
});
