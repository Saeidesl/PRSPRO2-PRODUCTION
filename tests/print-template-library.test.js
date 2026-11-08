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


test('print output page exposes a real document preview and print action',()=>{
  const root=path.join(__dirname,'..');
  const page=fs.readFileSync(path.join(root,'pages/print-output.html'),'utf8');
  const module=fs.readFileSync(path.join(root,'js/modules/print-designer.js'),'utf8');
  const styles=fs.readFileSync(path.join(root,'css/print-template-library.css'),'utf8');
  assert.match(page,/id="pt-output-preview"/);
  assert.match(page,/id="pt-output-print"/);
  assert.match(module,/renderOutputDocument/);
  assert.match(module,/loadOutputPdfPages: async function/);
  assert.match(module,/pt-output-pdf-background/);
  assert.match(module,/item\.pageIndex \|\| 0/);
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
 assert.ok(module.includes("--pt-print-height:'+safeHeight+'mm"), 'each PDF output page uses a bounded physical print height');
 assert.match(styles,/\.pt-section-title\{display:none!important\}/);
 assert.match(styles,/page-break-after:auto!important/);
});


test('print output assets use refreshed cache keys for the current print fixes',()=>{
 const index=read('index.html');
 assert.ok(index.includes('css/print-template-library.css?v=20261108-smart-form-conversion-1'));
 assert.ok(index.includes('js/modules/print-designer.js?v=20261108-smart-form-conversion-1'));
});


test('final print document omits the entire automatic form and project header',()=>{
 const module=read('js/modules/print-designer.js');
 assert.doesNotMatch(module,/pt-print-heading/);
 assert.ok(module.includes("pageContent+'</article>'"), 'each RTL page wraps its PDF background and configured elements in one scalable content layer');
 assert.match(module,/pt-print-page-content/);
});


test('mobile print scales each complete PDF page into a safe Letter/A4 printable area',()=>{
 const module=read('js/modules/print-designer.js');
 const styles=read('css/print-template-library.css');
 const index=read('index.html');
 assert.match(module,/const fitScale = Math\.max\(0\.01, Math\.min\(availableWidth \/ Math\.max\(1, spec\.width\), availableHeight \/ Math\.max\(1, spec\.height\)\)\)/);
 assert.ok(module.includes('safeWidth - margins.left - margins.right'));
 assert.ok(module.includes('safeHeight - margins.top - margins.bottom'));
 assert.ok(module.includes('const safeWidth = 210;'));
 assert.ok(module.includes('const safeHeight = 297;'));
 assert.match(module,/--pt-print-scale/);
 assert.match(module,/--pt-print-width/);
 assert.match(module,/pt-print-page-content/);
 assert.ok(module.includes("@page{size:A4 portrait;margin:0}"));
 assert.ok(styles.includes('transform:scale(var(--pt-print-scale,1))'));
 assert.ok(styles.includes('width:var(--pt-print-width,210mm)!important'));
 assert.ok(styles.includes('height:var(--pt-print-height,297mm)!important'));
 assert.ok(styles.includes('break-inside:avoid!important'));
 assert.ok(index.includes('smart-form-conversion-1'));
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
 assert.ok(index.includes('smart-form-conversion-1'));
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
 assert.ok(index.includes('smart-form-conversion-1'));
});


test('smart form conversion accepts PDF and image formats in the existing designer import flow',()=>{
 const page=read('pages/print-designer.html');
 const module=read('js/modules/print-designer.js');
 assert.match(page,/accept="[^"]*application\/pdf[^"]*image\/jpeg[^"]*image\/png/);
 assert.match(page,/id="pt-smart-detect"/);
 assert.match(module,/handleImportFile: async function/);
 assert.match(module,/imageFileToPdf: async function/);\n assert.match(module,/Embed the original JPEG bytes/);\n assert.match(module,/PNG is embedded losslessly/);\n assert.match(module,/image\\.width \\* 25\\.4 \\/ 300/);\n assert.doesNotMatch(module,/maxDimension = 2400/);\n assert.doesNotMatch(module,/image\\.toDataURL\\('image\\/jpeg',0\\.92\\)/);
 assert.match(module,/\/print-templates\/.*\/pdf/);
 assert.match(module,/createWorker\('fas\+eng'/);
});

test('smart conversion extracts PDF text first and uses on-device OCR only for scanned pages',()=>{
 const module=read('js/modules/print-designer.js');
 assert.match(module,/page\.getTextContent\(\)/);
 assert.match(module,/if \(!lines\.length \|\|/);
 assert.match(module,/tesseract\.js@5\.1\.1/);
 assert.match(module,/worker\.recognize\(canvas\)/);
 assert.match(module,/worker\.terminate\(\)/);
 assert.match(module,/runSmartDetection: async function/);
 assert.match(module,/smartLineToElements: function/);\n assert.match(module,/const itemCenter = Number\\(item\\.y \\|\\| 0\\) \\+ Number\\(item\\.height \\|\\| 0\\) \\/ 2/);\n assert.match(module,/const arabicCount =/);
 assert.match(module,/suggestSmartBinding: function/);
 assert.match(module,/renderBindings\(\); this\.renderEditor\(\); this\.commitHistory\(\)/);
});

test('smart detection remains a suggestion and uses existing template definitions and PMS binding sources',()=>{
 const module=read('js/modules/print-designer.js');
 assert.match(module,/smartSourceCatalog: function/);
 assert.match(module,/PROJECT_FIELD/);
 assert.match(module,/PROJECT_INFORMATION/);
 assert.match(module,/EVENT_FORM_FIELD/);
 assert.match(module,/type:'field'/);
 assert.match(module,/this\.definition\.elements = previousElements\.concat\(detected\)/);
 assert.match(module,/برای ثبت دائمی، قالب را ذخیره کن/);
});


test('smart-detected fields remain editable blank slots without duplicating the printed label',()=>{
 const module=read('js/modules/print-designer.js');
 const styles=read('css/print-template-library.css');
 assert.match(module,/type:'field',text:'',label:text/);
 assert.match(module,/pt-field-hint/);
 assert.match(module,/pt-output-field/);
 assert.match(module,/filter\(item => !String\(item\.id \|\| ''\)\.startsWith\('smart_'\)\)/);
 assert.match(styles,/\.pt-output-field/);
});


test('smart conversion recognizes common Persian and English factory form labels',()=>{
 const module=read('js/modules/print-designer.js');
 assert.match(module,/name\|code\|number\|date\|quantity\|qty\|amount\|color\|size\|model\|fabric/);
 assert.match(module,/name\|code\|number\|date\|quantity\|qty\|color\|size\|description/);
});
