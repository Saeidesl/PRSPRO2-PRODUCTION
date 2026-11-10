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
 assert.match(page,/pt-data-picker-content/);
 assert.match(page,/id="pt-open-data-picker"/);
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
 assert.match(index,/20261110-event-picker-visible-groups-1/);
});


test('visual editor module parses and exposes canvas interactions',()=>{
 const module=read('js/modules/print-designer.js');
 const page=read('pages/print-designer.html');
 const css=read('css/print-template-library.css');
 assert.doesNotThrow(()=>new vm.Script(module,{filename:'print-designer.js'}));
 for(const token of ['bindEditor: function','createElement: function','renderCanvas: function','renderInspector: function','commitHistory: function','undo: function','redo: function','pointermove','pointerup','data-pt-resize']) assert.ok(module.includes(token),token);
 for(const id of ['pt-design-canvas','pt-inspector-fields','pt-page-size','pt-page-orientation','pt-prop-columns','pt-prop-rows','pt-prop-color','pt-prop-background','pt-prop-selection','pt-layer-list','pt-data-picker','pt-data-picker-content','pt-data-picker-search','pt-source-count']) assert.ok(page.includes(id),id);
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
 assert.match(module,/openDataPicker: function/);
 assert.match(module,/addSourceItems: function/);
 assert.match(module,/findFreeElementPosition: function/);
 assert.match(module,/existingElements = new Set/);
 assert.match(module,/this\.renderEditor\(\); this\.renderSources\(\); return this\.commitHistory\(\)/);
 assert.match(module,/sourceError/);
 assert.match(module,/اتصال/);
 assert.match(module,/pt-prop-selection/);
 assert.match(module,/color:' \+ this\.esc\(item\.color/);
 assert.match(module,/background:' \+ this\.esc\(item\.background/);
 assert.match(module,/Definition: this\.definition/);
});

test('mobile template editor presents a guided workflow with collapsible tool panels',()=>{
 const page=read('pages/print-designer.html');
 const module=read('js/modules/print-designer.js');
 const css=read('css/print-template-library.css');
 assert.match(page,/مرحله ۱: طراحی صفحه/);
 assert.match(page,/مرحله ۲: تنظیم المان انتخاب‌شده/);
 assert.match(page,/افزودن اطلاعات/);
 assert.doesNotMatch(page,/data-pt-action="add-field"/);
 assert.doesNotMatch(module,/action === 'add-field'/);
 assert.match(page,/مرحله ۴: نام‌گذاری و ذخیره قالب/);
 assert.match(page,/<details class="[^"]*pt-saved-templates"/);
 assert.match(page,/<details class="pt-mobile-tools"/);
 assert.match(page,/pt-data-modal-dialog/);
 assert.doesNotMatch(page,/<details class="pt-editor-source-picker"/);
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
 assert.ok(index.includes('css/print-template-library.css?v=20261110-event-picker-visible-groups-1'));
 assert.ok(index.includes('js/modules/print-designer.js?v=20261110-event-picker-visible-groups-1'));
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
 assert.ok(index.includes('event-picker-visible-groups-1'));
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
 assert.ok(index.includes('event-picker-visible-groups-1'));
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
 assert.ok(index.includes('event-picker-visible-groups-1'));
});


test('manual PDF and image background import remains available',()=>{
 const page=read('pages/print-designer.html');
 const module=read('js/modules/print-designer.js');
 const styles=read('css/print-template-library.css');
 const index=read('index.html');
 assert.ok(page.includes("application/pdf"));
 assert.ok(page.includes("image/jpeg"));
 assert.ok(page.includes("image/png"));
 assert.match(page,/محل فیلدها را با ابزارهای دستی/);
 assert.match(module,/handleImportFile: async function/);
 assert.match(module,/imageFileToPdf: async function/);
 assert.match(module,/Embed the original JPEG bytes/);
 assert.match(module,/PNG is embedded losslessly/);
 assert.match(module,/handlePdfFile: async function/);
 assert.match(module,/loadTemplatePdf: async function/);
 assert.equal(styles.includes(String.fromCharCode(112,116,45,115,109,97,114,116,45,100,101,116,101,99,116)),false);
 assert.ok(index.includes('pdf.js/3.11.174/pdf.min.js'));
});

test('legacy field analysis assets are absent while PDF tools remain',()=>{
 const sources=['pages/print-designer.html','js/modules/print-designer.js','css/print-template-library.css','index.html'].map(read);
 const forbidden=[
  String.fromCharCode(112,116,45,115,109,97,114,116,45,100,101,116,101,99,116),
  String.fromCharCode(114,117,110,83,109,97,114,116,68,101,116,101,99,116,105,111,110),
  String.fromCharCode(116,101,115,115,101,114,97,99,116),
  String.fromCharCode(84,101,115,115,101,114,97,99,116),
  String.fromCharCode(79,67,82)
 ];
 for(const source of sources) for(const token of forbidden) assert.equal(source.includes(token),false,'obsolete asset marker must be absent');
 const module=sources[1];
 assert.ok(module.includes('window.pdfjsLib.getDocument'));
 assert.match(module,/imageFileToPdf: async function/);
});

test('unified source picker groups central data, full forms and event fields in one modal',()=>{
 const page=read('pages/print-designer.html');
 const module=read('js/modules/print-designer.js');
 const css=read('css/print-template-library.css');
 for(const tab of ['central','forms','events']) assert.ok(page.includes('data-pt-source-tab="'+tab+'"'));
 assert.match(page,/افزودن اطلاعات/);
 assert.match(module,/eventTypes: Array\.isArray\(sources\.eventTypes\)/);
 assert.match(module,/Array\.isArray\(eventType\.Forms\)/);
 assert.match(module,/eventTypeId: eventTypeId, formId: formId/);
 assert.match(module,/sourceType: 'EVENT_FORM_FIELD'/);
 assert.match(module,/EVENT_FIELD/);
 assert.match(module,/addSourceItems: function/);
 assert.match(module,/findFreeElementPosition: function/);
 assert.match(module,/this\.definition\.elements\.push\(/);
 assert.match(module,/item\.showLabel && item\.label/);
 assert.match(module,/showLabel: true/);
 assert.match(module,/String\(source\.cardinality \|\| ''\)\.toUpperCase\(\) === 'MULTIPLE'/);
 assert.match(module,/columnKeys: isRepeatable/);
 assert.match(module,/pt-output-field-label/);
 assert.match(css,/\.pt-data-modal:not\(\[hidden\]\)/);
 assert.match(css,/@media\(max-width:600px\)/);
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

test('PDF output renders print backgrounds at 300 DPI and keeps PNG pages lossless',()=>{
 const module=read('js/modules/print-designer.js');
 assert.match(module,/getPdfRenderScale: function/);
 assert.match(module,/this\.getPdfRenderScale\(baseViewport,300\)/);
 assert.match(module,/canvas\.toBlob\(result=>result\?resolve\(result\)/);
 assert.match(module,/window\.URL\.createObjectURL\(blob\)/);
 assert.doesNotMatch(module,/Math\.min\(2, 1800 \/ baseViewport\.width, 2400 \/ baseViewport\.height\)/);
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
 assert.match(module,/page\.drawImage\(image, this\.getPdfOverlayPlacement/);
 assert.match(module,/page\.drawPage\(overlayPage, this\.getPdfOverlayPlacement/);
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
 assert.ok(index.includes('20261110-event-picker-visible-groups-1'));
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
 assert.match(module,/item\.type === 'image' && this\.imageSources\[item\.assetId \|\| item\.id\]/);
 assert.match(module,/pt-output-image-content/);
 assert.match(module,/تصویر ثابت قالب بارگذاری نشده است/);
});


test('JPEG template image bytes are embedded directly without re-encoding or downscaling',async()=>{
 const encoded=Buffer.from([0,1,2,255]).toString('base64');
 const sandbox={window:{PMS:{},atob:value=>Buffer.from(value,'base64').toString('binary')},console,Buffer};
 vm.runInNewContext(read('js/modules/print-designer.js'),sandbox);
 const designer=sandbox.window.PMS.Modules.PrintDesigner;
 designer.imageSources={asset:'data:image/jpeg;base64,'+encoded};
 let originalBytes=[],drawnImageOptions=null,drawnPageOptions=null;
 const overlayPage={
  drawImage:(image,options)=>{drawnImageOptions=options;}
 };
 const overlayDocument={
  addPage:()=>overlayPage,
  embedJpg:async bytes=>{originalBytes=Array.from(bytes);return{width:1200,height:800};},
  embedPng:async()=>{throw new Error('PNG path must not be used for JPEG');},
  save:async()=>new Uint8Array([37,80,68,70])
 };
 const PDFLib={PDFDocument:{create:async()=>overlayDocument},degrees:angle=>({angle})};
 const pdfDocument={embedPdf:async()=>[{}]};
 const targetPage={
  getCropBox:()=>({x:0,y:0,width:595.28,height:841.89}),
  getRotation:()=>({angle:0}),
  drawPage:(page,options)=>{drawnPageOptions=options;}
 };
 await designer.drawTemplateImageOnSourcePage(pdfDocument,targetPage,
  {id:'image-1',assetId:'asset',mimeType:'image/jpeg',x:10,y:20,width:60,height:40,fit:'contain'},
  {width:210,height:297},PDFLib);
 assert.deepEqual(originalBytes,[0,1,2,255]);
 assert.equal(drawnImageOptions.width,60*72/25.4);
 assert.equal(drawnImageOptions.height,40*72/25.4);
 assert.ok(drawnPageOptions);
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
 assert.match(preview,/this\.generateSourcePdfOutput\(template, project, data\)/);
 assert.doesNotMatch(preview,/saveTemplate\(|PMS\.Api\.(post|put)\('\/print-templates'\s*,/);
});

test('live preview exposes a print action and prints the current HTML preview without using the saved output route',()=>{
 const page=read('pages/print-designer.html');
 const module=read('js/modules/print-designer.js');
 const styles=read('css/print-template-library.css');
 assert.match(page,/id="pt-live-preview-print" disabled/);
 assert.match(module,/printLivePreview: async function/);
 assert.match(module,/this\.livePreviewPdfBlob/);
 assert.match(module,/window\.print\(\)/);
 assert.match(module,/window\.open\(printUrl, '_blank'\)/);
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

test('live preview supports unsaved local PDF files and pending image assets without uploading or saving them',async()=>{
 const sandbox={window:{PMS:{}},console,Uint8Array};
 vm.runInNewContext(read('js/modules/print-designer.js'),sandbox);
 const designer=sandbox.window.PMS.Modules.PrintDesigner;
 const localBytes=new Uint8Array([37,80,68,70,45,49]);
 const loaded=await designer.fetchOutputPdfBytes('',{arrayBuffer:async()=>localBytes.buffer});
 assert.deepEqual(Array.from(loaded),Array.from(localBytes));
 const module=read('js/modules/print-designer.js');
 assert.match(module,/this\.imageSources\[item\.assetId \|\| item\.id\]/);
 assert.match(module,/this\.pendingImageFiles\[elementId\]/);
 assert.match(module,/renderFinalPdfPreview: async function \(blob, rootId\)/);
 assert.match(module,/this\.scheduleLivePreview\(650\)/);
});


test('clearing the live preview invalidates in-flight work and removes stale output and PDF state',()=>{
 const nodes={
  'pt-live-preview-content':{innerHTML:'old preview'},
  'pt-live-preview-print':{disabled:false}
 };
 const cleared=[];
 const sandbox={
  window:{PMS:{},clearTimeout:id=>cleared.push(id)},
  document:{getElementById:id=>nodes[id]||null},
  console
 };
 vm.runInNewContext(read('js/modules/print-designer.js'),sandbox);
 const designer=sandbox.window.PMS.Modules.PrintDesigner;
 designer.livePreviewSequence=7;
 designer.livePreviewTimer=42;
 designer.livePreviewPending=true;
 designer.livePreviewReady=true;
 designer.livePreviewPdfBlob={old:true};
 designer.setStatus=()=>{};
 designer.clearLivePreview('پیش‌نمایش پاک شد');
 assert.equal(designer.livePreviewSequence,8);
 assert.deepEqual(cleared,[42]);
 assert.equal(designer.livePreviewTimer,null);
 assert.equal(designer.livePreviewPending,false);
 assert.equal(designer.livePreviewReady,false);
 assert.equal(designer.livePreviewPdfBlob,null);
 assert.equal(nodes['pt-live-preview-print'].disabled,true);
 assert.match(nodes['pt-live-preview-content'].innerHTML,/پروژه انتخاب/);
});

test('scheduling live preview without a selected project invalidates previous results instead of retaining stale content',()=>{
 const nodes={
  'pt-live-preview-project':{value:''},
  'pt-live-preview-content':{innerHTML:'old project result'},
  'pt-live-preview-print':{disabled:false}
 };
 const sandbox={
  window:{PMS:{},clearTimeout:()=>{}},
  document:{getElementById:id=>nodes[id]||null},
  console
 };
 vm.runInNewContext(read('js/modules/print-designer.js'),sandbox);
 const designer=sandbox.window.PMS.Modules.PrintDesigner;
 designer.livePreviewSequence=2;
 designer.livePreviewReady=true;
 designer.livePreviewPdfBlob={old:true};
 designer.setStatus=()=>{};
 designer.scheduleLivePreview(0);
 assert.equal(designer.livePreviewSequence,3);
 assert.equal(designer.livePreviewReady,false);
 assert.equal(designer.livePreviewPdfBlob,null);
 assert.equal(nodes['pt-live-preview-print'].disabled,true);
 assert.match(nodes['pt-live-preview-content'].innerHTML,/پروژه انتخاب/);
});

test('new-template save failures deactivate the partially created template without undoing a committed save',()=>{
 const module=read('js/modules/print-designer.js');
 assert.match(module,/let saveCommitted = false/);
 assert.match(module,/if \(!saveCommitted && wasNew && templateId\)/);
 assert.match(module,/PMS\.Api\.delete\('\/print-templates\/' \+ encodeURIComponent\(templateId\)\)/);
 assert.match(module,/قالب ناقص به‌صورت غیرفعال علامت‌گذاری شد/);
});


test('data source picker modal has bounded layout, an independently scrollable list and accessible touch targets',()=>{
 const css=read('css/print-template-library.css');
 const page=read('pages/print-designer.html');
 const modal=css.slice(css.indexOf('/* Unified data source picker'),css.indexOf('.pt-output-field-label'));
 assert.match(modal,/grid-template-rows:\s*auto\s+auto\s+auto\s+auto\s+minmax\(0,\s*1fr\)/);
 assert.match(modal,/height:\s*min\(760px,\s*calc\(100dvh - 36px\)\)/);
 assert.match(modal,/\.pt-data-modal-dialog\s*\{[\s\S]*?overflow:\s*hidden/);
 assert.match(modal,/\.pt-data-picker-content\s*\{[\s\S]*?min-height:\s*0[\s\S]*?overflow:\s*auto/);
 assert.match(modal,/overscroll-behavior:\s*contain/);
 assert.match(modal,/min-height:\s*44px/);
 assert.match(modal,/@media \(max-width: 700px\)/);
 assert.match(modal,/safe-area-inset-bottom/);
 assert.match(modal,/:focus-visible/);
 assert.match(page,/role="dialog" aria-modal="true"/);
});

test('data source picker modal styles remain isolated from the A4 canvas and print output',()=>{
 const css=read('css/print-template-library.css');
 const modal=css.slice(css.indexOf('/* Unified data source picker'),css.indexOf('.pt-output-field-label'));
 assert.doesNotMatch(modal,/\.pt-design-canvas|\.pt-print-page|@media print/);
 assert.match(modal,/prefers-reduced-motion/);
});


test('data source groups expand and collapse through directly bound disclosure controls',()=>{
 const module=read('js/modules/print-designer.js');
 const render=module.slice(module.indexOf('    renderSources: function'),module.indexOf('    findFreeElementPosition: function'));
 assert.match(render,/root\.querySelectorAll\('\[data-pt-group-toggle\]'\)/);
 assert.match(render,/button\.addEventListener\('click'/);
 assert.match(render,/this\.expandedSourceGroups\[id\] = !this\.expandedSourceGroups\[id\]/);
 assert.match(render,/this\.renderSources\(\)/);
 assert.doesNotMatch(module,/const toggle = event\.target\.closest\('\[data-pt-group-toggle\]'\)/);
});


test('event source groups always render a readable title when API labels use alternate field names',()=>{
 const sandbox={window:{PMS:{}},console,document:{
  getElementById:id=>id==='pt-data-picker-content'?root:id==='pt-source-count'?count:id==='pt-picker-selected-count'?selected:null,
  querySelectorAll:()=>[]
 }};
 let html='';
 const root={set innerHTML(value){html=value;},get innerHTML(){return html;},querySelectorAll:()=>[]};
 const count={textContent:''},selected={textContent:''};
 vm.runInNewContext(read('js/modules/print-designer.js'),sandbox);
 const designer=sandbox.window.PMS.Modules.PrintDesigner;
 designer.sources={projectFields:[],informationTypes:[],forms:[],eventTypes:[
  {ID:'ET-X',Name:'عنوان نوع رویداد',Code:'TYPE_X',Fields:[
   {field:'Description',label:'توضیحات'}
  ],Forms:[]}
 ]};
 designer.sourcePickerTab='events';
 designer.expandedSourceGroups['event-ET-X']=true;
 designer.definition={elements:[]};
 designer.renderSources();
 assert.match(html,/عنوان نوع رویداد/);
 assert.match(html,/توضیحات/);
 assert.match(html,/data-pt-group-toggle="event-ET-X"/);
 assert.equal(count.textContent,'1 منبع در این دسته');
});

test('event source group headers keep visible touch-sized disclosure and action controls',()=>{
 const css=read('css/print-template-library.css');
 const start=css.indexOf('.pt-data-group-heading {');
 const end=css.indexOf('.pt-data-group-count {',start);
 const groupStyles=css.slice(start,end);
 assert.match(groupStyles,/display:\s*flex/);
 assert.match(groupStyles,/min-height:\s*48px/);
 assert.match(groupStyles,/\.pt-data-group-title button[\s\S]*?min-height:\s*26px/);
 assert.match(groupStyles,/\.pt-data-group-actions[\s\S]*?visibility:\s*visible/);
});
