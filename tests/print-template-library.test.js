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
  assert.match(module,/generateSourcePdfOutput: async function/);
  assert.match(module,/renderFinalPdfPreview: async function/);
  assert.match(module,/downloadOutputPdf: function/);
  assert.match(module,/pt-output-pdf-background/);
  assert.match(module,/item\.pageIndex \|\| 0/);
  assert.match(module,/window\.print\(\)/);
  assert.match(page,/pt-output-download/);
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
 assert.ok(index.includes('css/print-template-library.css?v=20261109-template-image-lossless-pdf-1'));
 assert.ok(index.includes('js/modules/print-designer.js?v=20261109-template-image-lossless-pdf-1'));
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
 assert.match(module,/const fitScale = overlayOnly \? 1 : Math\.max\(0\.01, Math\.min\(availableWidth \/ Math\.max\(1, spec\.width\), availableHeight \/ Math\.max\(1, spec\.height\)\)\)/);
 assert.ok(module.includes('safeWidth - margins.left - margins.right'));
 assert.ok(module.includes('safeHeight - margins.top - margins.bottom'));
 assert.match(module,/const safeWidth = overlayOnly \? spec\.width : 210;/);
 assert.match(module,/const safeHeight = overlayOnly \? spec\.height : 297;/);
 assert.match(module,/--pt-print-scale/);
 assert.match(module,/--pt-print-width/);
 assert.match(module,/pt-print-page-content/);
 assert.ok(module.includes("@page{size:A4 portrait;margin:0}"));
 assert.ok(styles.includes('transform:scale(var(--pt-print-scale,1))'));
 assert.ok(styles.includes('width:var(--pt-print-width,210mm)!important'));
 assert.ok(styles.includes('height:var(--pt-print-height,297mm)!important'));
 assert.ok(styles.includes('break-inside:avoid!important'));
 assert.ok(index.includes('template-image-lossless-pdf-1'));
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
 assert.ok(index.includes('template-image-lossless-pdf-1'));
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
 assert.ok(index.includes('template-image-lossless-pdf-1'));
});


test('smart form conversion accepts PDF and image formats in the existing designer import flow',()=>{
 const page=read('pages/print-designer.html');
 const module=read('js/modules/print-designer.js');
 assert.match(page,/accept="[^"]*application\/pdf[^"]*image\/jpeg[^"]*image\/png/);
 assert.match(page,/id="pt-smart-detect"/);
 assert.match(module,/handleImportFile: async function/);
 assert.match(module,/imageFileToPdf: async function/);
 assert.match(module,/Embed the original JPEG bytes/);
 assert.match(module,/PNG is embedded losslessly/);
 assert.ok(module.includes('image.width * 25.4 / 300'));
 assert.doesNotMatch(module,/maxDimension = 2400/);
 assert.ok(!module.includes("image.toDataURL('image/jpeg',0.92)"));
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
 assert.match(module,/smartLineToElements: function/);
 assert.ok(module.includes('const itemCenter = normalized.y + normalized.height / 2'));
 assert.match(module,/const arabicCount =/);
 assert.match(module,/const maxPixels=12000000/);
 assert.match(module,/canvas.toBlob/);
 assert.match(module,/result.data.lines/);
 assert.match(module,/pageViewport.convertToViewportPoint/);
 assert.match(module,/preserve_interword_spaces/);
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


test('PDF output renders print backgrounds at 300 DPI and keeps PNG pages lossless',()=>{
 const module=read('js/modules/print-designer.js');
 assert.match(module,/getPdfRenderScale: function/);
 assert.match(module,/this\.getPdfRenderScale\(baseViewport,300\)/);
 assert.match(module,/canvas\.toBlob\(result=>result\?resolve\(result\)/);
 assert.match(module,/window\.URL\.createObjectURL\(blob\)/);
 assert.doesNotMatch(module,/Math\.min\(2, 1800 \/ baseViewport\.width, 2400 \/ baseViewport\.height\)/);
});

test('PDF text extraction respects page transforms and OCR uses recognized line blocks',()=>{
 const module=read('js/modules/print-designer.js');
 assert.match(module,/convertToViewportPoint\(e,f\)/);
 assert.match(module,/dir:item\.dir\|\|''/);
 assert.match(module,/result\.data\.lines/);
 assert.match(module,/this\.getPdfRenderScale\(viewport,300\)/);
 assert.match(module,/preserve_interword_spaces/);
});

test('smart text grouping separates columns and preserves RTL and LTR reading order',()=>{
 const sandbox={window:{PMS:{}},console};
 vm.runInNewContext(read('js/modules/print-designer.js'),sandbox);
 const designer=sandbox.window.PMS.Modules.PrintDesigner;
 const lines=designer.groupSmartTextLines([
  {text:'نام',x:100,y:10,width:10,height:4,dir:'rtl'},
  {text:'پروژه',x:85,y:10,width:13,height:4,dir:'rtl'},
  {text:'کد',x:20,y:10,width:8,height:4,dir:'rtl'},
  {text:'Project',x:10,y:30,width:20,height:4,dir:'ltr'},
  {text:'Code',x:36,y:30,width:12,height:4,dir:'ltr'},
  {text:'Date',x:10,y:36,width:12,height:4,dir:'ltr'}
 ]);
 assert.equal(lines.find(line=>line.text==='نام پروژه')?.direction,'rtl');
 assert.ok(lines.some(line=>line.text==='کد'));
 assert.ok(lines.some(line=>line.text==='Project Code'));
 assert.ok(lines.some(line=>line.text==='Date'));
 assert.equal(designer.getPdfRenderScale({width:595,height:842},300),300/72);
 assert.ok(designer.getPdfRenderScale({width:2000,height:3000},300)<300/72);
});

test('smart detected fields are positioned according to text direction',()=>{
 const sandbox={window:{PMS:{}},console};
 vm.runInNewContext(read('js/modules/print-designer.js'),sandbox);
 const designer=sandbox.window.PMS.Modules.PrintDesigner;
 designer.definition={bindings:[]};
 designer.suggestSmartBinding=()=>null;
 const rtl=designer.smartLineToElements([{text:'نام',x:100,y:10,width:10,height:4,rtl:true,direction:'rtl'}],0,210,[],0)[0];
 const ltr=designer.smartLineToElements([{text:'Name',x:10,y:10,width:15,height:4,rtl:false,direction:'ltr'}],0,210,[],0)[0];
 assert.ok(rtl.x<100);
 assert.ok(ltr.x>25);
});


test('smart PDF text keeps bidi control marks for mixed Persian and Latin content',()=>{
 const sandbox={window:{PMS:{}},console};
 vm.runInNewContext(read('js/modules/print-designer.js'),sandbox);
 const designer=sandbox.window.PMS.Modules.PrintDesigner;
 const mixed='\u200fکد \u200eA\u200f';
 assert.ok(designer.normalizeSmartLineText(mixed).includes('\u200f'));
 assert.ok(designer.normalizeSmartLineText(mixed).includes('\u200e'));
 assert.equal(designer.getSmartTextDirection(mixed,'ltr'),'rtl');
});

test('smart PDF text joins adjacent glyph fragments and inserts spaces only for measured word gaps',()=>{
 const sandbox={window:{PMS:{}},console};
 vm.runInNewContext(read('js/modules/print-designer.js'),sandbox);
 const designer=sandbox.window.PMS.Modules.PrintDesigner;
 const joined=designer.groupSmartTextLines([
  {text:'ژه',x:90,y:10,width:5,height:4,dir:'rtl'},
  {text:'پرو',x:95,y:10,width:5,height:4,dir:'rtl'}
 ]);
 assert.equal(joined[0].text,'پروژه');
 const spaced=designer.groupSmartTextLines([
  {text:'پروژه',x:80,y:20,width:12,height:4,dir:'rtl'},
  {text:'نام',x:94,y:20,width:8,height:4,dir:'rtl'}
 ]);
 assert.equal(spaced[0].text,'نام پروژه');
});

test('smart PDF text separates nearby columns without merging their labels',()=>{
 const sandbox={window:{PMS:{}},console};
 vm.runInNewContext(read('js/modules/print-designer.js'),sandbox);
 const designer=sandbox.window.PMS.Modules.PrintDesigner;
 const lines=designer.groupSmartTextLines([
  {text:'نام',x:100,y:10,width:10,height:4,dir:'rtl'},
  {text:'کد',x:82,y:10,width:8,height:4,dir:'rtl'}
 ]);
 assert.equal(lines.length,2);
 assert.equal(lines.length,2);
 assert.ok(lines.some(line=>line.text==='نام'));
 assert.ok(lines.some(line=>line.text==='کد'));
});


test('source PDF output keeps original page objects and adds only a transparent PMS overlay',()=>{
 const module=read('js/modules/print-designer.js');
 const page=read('pages/print-output.html');
 const styles=read('css/print-template-library.css');
 const start=module.indexOf('generateSourcePdfOutput: async function');
 const end=module.indexOf('renderFinalPdfPreview: async function',start);
 assert.ok(start>=0&&end>start,'source PDF generation method exists');
 const sourcePath=module.slice(start,end);
 assert.match(sourcePath,/PDFLib\.PDFDocument\.load\(sourceBytes\)/);
 assert.match(sourcePath,/pdfDocument\.getPages\(\)/);
 assert.match(module,/pdfDocument\.embedPng\(pngBytes\)/);
 assert.match(module,/drawPdfOverlayOnSourcePage/);
 assert.match(module,/html2canvas\(node/);
 assert.doesNotMatch(sourcePath,/pdfjsLib\.getDocument|page\.render\(/);
 assert.match(module,/page\.drawImage\(image, options\)/);
 assert.match(module,/page\.getCropBox\(\)/);
 assert.match(module,/page\.getRotation\(\)\.angle/);
 assert.match(module,/hasSourcePdf/);
 assert.match(module,/renderFinalPdfPreview\(outputBlob\)/);
 assert.match(page,/id="pt-output-download"/);
 assert.match(styles,/pt-output-overlay-render-host/);
 assert.match(styles,/pt-output-final-page/);
});

test('source PDF overlay rendering waits for fonts and attached images and rejects missing source files',()=>{
 const module=read('js/modules/print-designer.js');
 assert.match(module,/fetchOutputPdfBytes: async function/);
 assert.match(module,/فایل PDF اصلی از فضای ذخیره‌سازی دریافت نشد/);
 assert.match(module,/document\.fonts\.ready/);
 assert.match(module,/if \(overlayOnly\) throw error/);
 assert.match(module,/drawPdfOverlayOnSourcePage/);
 assert.match(module,/تعداد صفحات PDF اصلی با مشخصات قالب یکسان نیست/);
});

test('original PDF output assets use versioned pinned browser libraries and refreshed cache keys',()=>{
 const index=read('index.html');
 const module=read('js/modules/print-designer.js');
 assert.match(module,/pdf-lib@1\.17\.1/);
 assert.match(module,/html2canvas\/1\.4\.1/);
 assert.ok(index.includes('20261109-template-image-lossless-pdf-1'));
});


test('source PDF overlay aligns with rotated crop boxes without changing source page dimensions',()=>{
 const sandbox={window:{PMS:{}},console};
 vm.runInNewContext(read('js/modules/print-designer.js'),sandbox);
 const designer=sandbox.window.PMS.Modules.PrintDesigner;
 const calls=[];
 const page={
  getCropBox:()=>({x:0,y:0,width:612,height:792}),
  getRotation:()=>({angle:90}),
  drawImage:(image,options)=>calls.push(options)
 };
 designer.drawPdfOverlayOnSourcePage(page,{}, {degrees:angle=>({angle})}, {width:279.4,height:215.9});
 assert.equal(calls.length,1);
 assert.equal(calls[0].width,792);
 assert.equal(calls[0].height,612);
 assert.equal(calls[0].rotate.angle,-90);
 assert.equal(calls[0].x,-90);
 assert.equal(calls[0].y,90);
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
 assert.match(module,/item\.type === 'image' && item\.assetId && this\.imageSources\[item\.assetId\]/);
 assert.match(module,/pt-output-image-content/);
 assert.match(module,/تصویر ثابت قالب بارگذاری نشده است/);
});
