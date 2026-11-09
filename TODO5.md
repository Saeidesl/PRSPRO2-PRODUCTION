## 🎯 Current Objective
افزودن پیش‌نمایش زنده و واقعی خروجی چاپ در محیط قالب‌ساز، بدون ذخیره اجباری قالب.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
### مخازن و شاخه عملیاتی
- Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه `feature/template-image-quality-20261109`؛ مبنا `main` با commit `5bc7b32448323b5f00345c985ea45c5d6eadc8a6`.
- Frontend: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه `feature/template-image-quality-20261109`؛ مبنا `main` با commit `41b03aa19ffaceaa10d5f82c8686ad4076c6ab20`.

### معماری کشف‌شده Frontend
- `pages/print-designer.html`: صفحه فعلی طراح قالب و toolbar؛ دکمه `data-pt-action="add-image"` موجود است و باید به انتخاب فایل واقعی متصل شود.
- `js/modules/print-designer.js`:
  - `createElement(type, overrides)`: عنصر را در `definition.elements` ثبت و تاریخچه را commit می‌کند.
  - `handleEditorAction('add-image')`: اکنون فقط placeholder می‌سازد؛ باید با انتخاب فایل جایگزین شود.
  - `renderCanvas()`: عناصر را از `definition.elements` در لایه صفحه با مختصات میلی‌متری render می‌کند؛ تصویر فعلاً placeholder است و برای عنصر انتخاب‌شده دستگیره resize موجود است.
  - `saveTemplate()`: Definition را با API موجود ذخیره می‌کند و PDF پس‌زمینه را از `POST /print-templates/:id/pdf` جداگانه می‌فرستد.
  - `imageFileToPdf(file)` و `handleImportFile(file)`: مسیر تبدیل تصویر ورودی به PDF برای پس‌زمینه/OCR است؛ قابلیت جدید نباید این مسیر را فراخوانی کند یا آن را حذف کند.
  - `findImageAttachment(value)` و `loadOutputImage(value)`: الگوی موجود دریافت تصویر attachment و اعتبارسنجی MIME در خروجی.
  - `renderOutputDocument()`: رندر HTML عناصر و تصویرهای متصل؛ `generateSourcePdfOutput()` و توابع overlay با `pdf-lib@1.17.1` خروجی PDF را روی سند اصلی می‌سازند.
  - `downloadOutputPdf()`: دانلود Blob خروجی.
- `css/print-template-library.css`: استایل canvas، انتخاب عنصر، resize handle و خروجی چاپ؛ استایل تصویر واقعی باید در همین فایل توسعه یابد.
- `tests/print-template-library.test.js`: تست‌های ساختاری و رگرسیون فعلی برای editor، PDF، تصویرهای attachment و print output.
- `index.html`: cache-busting فایل‌های Print Designer.
- API client استاندارد `PMS.Api` در `js/core/api.js` استفاده شود؛ درخواست مستقیم موازی ممنوع.

### قرارداد هدف و قیود
- تصویر واقعی داخل `Definition.elements` با type=image و asset reference قرار گیرد؛ base64 خام در Definition/Google Sheets ذخیره نشود.
- تصویر در Canvas از endpoint امن asset دریافت و render شود؛ موقعیت/ابعاد بر حسب mm و `pageIndex` حفظ شود.
- فایل ورودی مستقیماً به‌عنوان image asset آپلود شود؛ هرگز به PDF واسط تبدیل نشود. مسیر import پس‌زمینه/OCR فعلی مستقل و بدون تغییر باقی بماند.
- PDF نهایی باید تصویر را مستقیم با APIهای embed تصویری pdf-lib درج کند؛ کیفیت و نسبت ابعاد حفظ شود.
- drag/resize با mouse و touch، انتخاب، حذف، لایه‌بندی، undo/redo، چندصفحه‌ای، ذخیره/بازیابی، پیش‌نمایش و چاپ باید کار کنند.
- قالب‌های قدیمی، PDF اصلی، bindingهای داده، tenant scope و permissionها بدون regression حفظ شوند.

### فاز فوری — اصلاح ثبت فرم‌های متصل به رویداد (2026-11-09)
#### مخازن، شاخه‌ها و مبنا
- Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه `fix/event-form-submit-a4-validation-20261109`، مبنا `main` با commit `683d16d8c69b84bb891739918148a392abafb9a8`.
- Frontend: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه `fix/event-form-submit-a4-validation-20261109`، مبنا `main` با commit `7f7d1c904b0b4dff043ae41bc2388fa8a462d863`.
- تسک قبلی حفظ کیفیت تصویر PDF باز و بدون تغییر در وضعیت پذیرش، به حالت تعلیق منتقل شده است؛ هیچ فایل runtime یا تغییر آن تسک بازنویسی نشده است.

#### یافته‌های واقعی Frontend
- `pages/events.html`: صفحه میزبان جریان اصلی ثبت رویداد؛ فرم اصلی `#event-create-form`.
- `js/modules/events.js`:
  - `renderConfiguredForms()` همان DOM فرم‌های متصل را داخل برگه A4 موجود قرار می‌دهد و فرم جدید/موازی نمی‌سازد.
  - `prepareConfiguredFormsA4()` ظرف فعلی را در برگه A4 قرار می‌دهد؛ `openConfiguredFormsA4()` و `closeConfiguredFormsA4()` فقط وضعیت نمایش `#event-configured-forms-section` را تغییر می‌دهند و داده‌های کنترل‌ها را پاک نمی‌کنند.
  - submit listener نزدیک خطوط 2068–2085 قبل از اجرای `submitForm()` بررسی می‌کند اگر `#event-configured-forms-section.hidden` باشد، A4 را باز و ارسال را متوقف کند. این شرط مستقل از کامل بودن پاسخ‌هاست و علت مستقیم بازشدن دوباره فرم پس از بستن آن است.
  - `submitForm()` در حال حاضر `form.reportValidity()` را پیش از `collectConfiguredFormResponses(projectId)` روی کل فرم اجرا می‌کند؛ کنترل‌های اجباری داخل برگه پنهان ممکن است مانع اعتبارسنجی/تمرکز صحیح شوند.
  - `collectConfiguredFormResponses()` پاسخ‌های SINGLE/MULTIPLE و فایل‌ها را از همان DOM جمع می‌کند و برای فیلدهای اجباری و ستون‌های چندردیفی اعتبارسنجی سفارشی دارد.
  - API ثبت نهایی همان `PMS.Api.post('/events', payload)` با `FormResponses` و `IdempotencyKey` است.
- `css/events.css`: نمایش/پنهان‌سازی overlay A4 و حالت واکنش‌گرا.
- `tests/event-form-a4-modal.test.js`: تست فعلی به‌طور صریح وجود شرط بازکردن اجباری برگه هنگام submit را الزام می‌کند و باید به تست رفتار صحیح تغییر کند.
- `index.html`: cache-busting فایل‌های `events.css` و `events.js` باید پس از تغییر Frontend افزایش یابد.

#### یافته‌های واقعی Backend و قرارداد داده
- `Router.js`: `POST /events` با مجوز `EVENT_CREATE` به `EventService.create(body, params)` می‌رسد.
- `EventService.js`: پیش از ذخیره، `FormService.prepareEventResponses(eventType.ID, event.FormResponses || [], tenantId, projectId)` پاسخ‌ها را اعتبارسنجی می‌کند؛ سپس پس از ایجاد رویداد `FormService.saveEventResponses(...)` پاسخ را ذخیره می‌کند.
- `FormService.js:prepareEventResponses`: mappingهای فعال، اجباری‌بودن فرم، نسخه فرم، فیلدها، visibility و required را اعتبارسنجی می‌کند.
- داده پاسخ در ساختار موجود `35_EventFormData` ذخیره می‌شود؛ endpoint یا Sheet موازی لازم نیست.
- بررسی اولیه نشان می‌دهد باگ گزارش‌شده در submit guard سمت Frontend است؛ در صورت عدم کشف ناسازگاری جدید، Backend runtime/API/schema تغییر نخواهد کرد.

## 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** مسیرهای فعلی Print Designer، مدل عناصر، ورودی import، ذخیره Definition، خروجی PDF و API/Storage بک‌اند بررسی شد.
  - *Log:* `pages/print-designer.html` toolbar افزودن تصویر؛ `js/modules/print-designer.js:createElement`, `handleEditorAction`, `renderCanvas`, `saveTemplate`, `imageFileToPdf`, `handleImportFile`, `findImageAttachment`, `loadOutputImage`, `renderOutputDocument`, `generateSourcePdfOutput`, `downloadOutputPdf`; `css/print-template-library.css`; `tests/print-template-library.test.js`; `index.html`. placeholder فعلی به‌جای تصویر واقعی نمایش داده می‌شود. مسیر تبدیل تصویر به PDF فقط برای import پس‌زمینه/OCR است و از feature جدید جدا می‌ماند. Backend موجود: `Router.js`, `PrintTemplateService.js`, `PrintTemplateRepository.js`, `GoogleDriveStorage.js`, `StorageRepository.js`; شیت `36_PrintTemplates` و فایل‌های Drive tenant-scoped.
- [x] **Task 2 — چرخه امن Asset تصویر قالب در Backend:** API بارگذاری/دریافت تصویر، ذخیره امن و کنترل مالکیت در Backend پیاده‌سازی و در PR #42 ادغام شد.
  - *Log:* Backend: `PrintTemplateRepository.js` ستون افزایشی `ImageAssetsJSON` در `36_PrintTemplates`؛ `PrintTemplateValidator.js` اعتبارسنجی reference با الگوی `IMG_...`؛ `PrintTemplateService.js` توابع `uploadImage/downloadImage`، ذخیره باینری tenant-scoped در Google Drive، metadata غیرحساس، اعتبارسنجی JPG/JPEG/PNG/WebP و سقف 10MB، کنترل مالکیت قالب/Tenant و پاک‌سازی در شکست؛ `Router.js` مسیرهای `POST /print-templates/:id/images` و `GET /print-templates/:id/images/:assetId`؛ `tests/print-templates.test.js` تست‌های upload/download، MIME/signature و tenant isolation. PR #42 با commit `fbd8cb8351201e258b25be2c90ef3ed91624405e` ادغام شد و CI موفق بود.
- [x] **Task 3 — تجربه افزودن و ویرایش تصویر در Frontend:** انتخاب فایل، ایجاد عنصر واقعی، render، drag/resize، حفظ undo/redo و ذخیره/بازیابی در همان مدل موجود؛ تست عملیاتی Product Owner موفق بود.
  - *Log:* `pages/print-designer.html`: ورودی مستقل تصویر؛ `js/modules/print-designer.js`: `handleImageSelection`, `loadTemplateImages`, `uploadPendingImages`, `renderCanvas`, `saveTemplate`, `loadTemplate`؛ `css/print-template-library.css`: نمایش تصویر و کنترل resize؛ `tests/print-template-library.test.js`: تست مسیر upload/download و render خروجی. تصویر به‌عنوان asset اصلی در Drive ذخیره و در Definition با assetId ارجاع می‌شود. کاربر در 2026-11-09 ذخیره، بازگشایی و نمایش تصویر را در نسخه عملیاتی موفق تأیید کرد.
- [ ] **Task 4 — حفظ کیفیت اصلی تصویر در خروجی PDF (PAUSED):** حذف rasterize تصویرهای مستقل در html2canvas؛ embed مستقیم JPG/PNG و تبدیل lossless فرمت WebP به PNG در ابعاد اصلی، حفظ نسبت ابعاد و مختصات روی PDF اصلی، تست چندصفحه‌ای/چرخش/CropBox و سازگاری قالب‌های قدیمی.


### فاز فوری — اصلاح ثبت فرم‌های متصل به رویداد
- [x] **Task 1 — Discovery & Planning:** بررسی TODO5/ARCHITECTURE دو مخزن، branch و آخرین commitها، مسیر A4، submit، جمع‌آوری پاسخ، اعتبارسنجی Backend و تست‌های فعلی انجام شد.
  - *Log:* Frontend: `pages/events.html`، `js/modules/events.js` توابع `renderConfiguredForms`, `prepareConfiguredFormsA4`, `openConfiguredFormsA4`, `closeConfiguredFormsA4`, `collectConfiguredFormResponses`, `submitForm`؛ `css/events.css`؛ `tests/event-form-a4-modal.test.js`؛ `index.html`. شرط submit در خط تقریبی 2071 صرفاً بر اساس hidden بودن A4 ثبت را متوقف می‌کند. Backend: `Router.js`، `EventService.js`، `FormService.js` و شیت موجود `35_EventFormData` بررسی شدند؛ قرارداد فعلی پاسخ فرم معتبر و قابل استفاده مجدد است. شاخه‌های feature در هر دو مخزن از commitهای ثبت‌شده main ساخته شدند.
- [x] **Task 2 — اصلاح اعتبارسنجی و ارسال فرم A4:** حذف شرط بازگشایی اجباری A4 صرفاً به دلیل بسته بودن؛ اعتبارسنجی کنترل‌های اصلی و کنترل‌های فرم متصل بدون خطای focus در حالت پنهان؛ بازکردن A4 فقط هنگام وجود فیلد نامعتبر و هدایت کاربر به همان فیلد؛ حفظ پاسخ‌ها، فایل‌ها، جدول‌های چندردیفی و idempotency.
  - *Log:* Frontend `js/modules/events.js`: listener فرم `#event-create-form` دیگر صرفاً به‌دلیل بسته‌بودن A4، submit را متوقف نمی‌کند؛ `validateEventFormControls(form)` کنترل‌های فرم اصلی و فیلدهای فرم متصل را با نادیده‌گرفتن فیلدهای شرطی مخفی اعتبارسنجی می‌کند و در صورت خطای واقعی A4 را باز می‌کند. `submitForm()` از این اعتبارسنجی استفاده می‌کند و `collectConfiguredFormResponses(projectId)` پاسخ‌ها را جمع می‌کند؛ API موجود `PMS.Api.post('/events', payload)`، `FormResponses`، فایل‌ها، چندردیفی‌ها و `IdempotencyKey` حفظ شده‌اند. `index.html` cache-busting نسخه `20261109-event-form-submit-validation-1` شد. Backend runtime/API/schema تغییر نکرد؛ مسیرهای موجود `POST /events` → `EventService.create` → `FormService.prepareEventResponses/saveEventResponses` و Sheet `35_EventFormData` حفظ شدند. Frontend PR #72 با merge commit `efa1b93a796a253b5153610a4d55028f8a79daca` و Backend PR #44 (مستندات فقط) با merge commit `c4d6d22ac1ea9218300a3056a2b45b03cfd61c1f` در main ادغام شدند. کاربر تست عملیاتی ثبت فرم تکمیل‌شده پس از بستن A4 را در 2026-11-09 موفق اعلام و تأیید کرد.
- [x] **Task 3 — آزمون رگرسیون، ادغام و انتشار:** اصلاح تست A4 قبلی، افزودن سناریوهای فرم تکمیل‌شده در حالت بسته، فرم ناقص در حالت بسته، چندردیفی و فایل؛ اجرای تست‌های Frontend و Cross-repository QA؛ ادغام PR و تأیید عملیاتی.
  - *Log:* `tests/event-form-a4-modal.test.js` سناریوهای A4 بسته، اعتبارسنجی فیلد نامعتبر و conditional hidden را پوشش می‌دهد؛ تست‌های مرتبط event submit و Cross-repository QA موفق شدند. Frontend PR #72 ادغام شد و کاربر رفتار ثبت رویداد در نسخه عملیاتی را موفق تأیید کرد. Backend فقط تغییر مستندات داشت و انتشار مجدد Apps Script لازم نبود.


### فاز فوری — دکمه تأیید و بستن برگه A4 فرم رویداد (2026-11-09)
#### تصمیم رفتاری
- دکمه «تأیید» در پایین محتوای برگه A4 و پس از خود برگه قرار گیرد.
- دکمه فقط `closeConfiguredFormsA4()` را اجرا کند؛ تمام مقادیر، انتخاب‌ها، فایل‌ها و ردیف‌های فرم در همان DOM فعلی باقی بمانند.
- دکمه از نوع `button` باشد (نه submit) و هیچ مسیر API ثبت رویداد را فراخوانی نکند؛ ثبت رویداد همچنان فقط با دکمه اصلی «ثبت رویداد» انجام شود.
- دکمه × فعلی و امکان بازگشایی فرم از launcher حفظ شوند. Backend/API/Sheet تغییری لازم نیست.

#### معماری و مسیرهای کشف‌شده
- Frontend: `js/modules/events.js`، تابع `prepareConfiguredFormsA4(section, container)` همان dialog/toolbar/viewport/paper را می‌سازد؛ `closeConfiguredFormsA4()` برگه را مخفی می‌کند و launcher را نمایش می‌دهد؛ `openConfiguredFormsA4()` همان DOM را دوباره باز می‌کند.
- Frontend: `css/events.css` استایل‌های `.event-forms-a4-dialog`, `.event-forms-a4-viewport`, `.event-forms-a4-paper`, `.event-forms-a4-toolbar` و media query موبایل را دارد.
- Regression: `tests/event-form-a4-modal.test.js` و cache-busting در `index.html`.
- Backend: بدون تغییر runtime، API، مجوز، شیت یا داده.

## 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** بررسی وضعیت پذیرش تسک ثبت فرم، آخرین commitهای main، فایل‌های TODO5/ARCHITECTURE و DOM/توابع فعلی برگه A4 انجام شد.
  - *Log:* Backend main=`c4d6d22ac1ea9218300a3056a2b45b03cfd61c1f` و Frontend main=`17a7a83b715cdf5f0ec747aee485c1087bb72c43`؛ branch مستقل `feat/event-form-a4-confirm-close-20261109` در هر دو مخزن ساخته شد. مسیر ساخت برگه در `js/modules/events.js:prepareConfiguredFormsA4` و بستن/بازکردن در `closeConfiguredFormsA4/openConfiguredFormsA4` بررسی شد؛ دکمه باید به همان close handler متصل شود و از submit فرم اصلی مستقل بماند.
- [x] **Task 2 — افزودن دکمه تأیید:** دکمه «تأیید» در پایین برگه A4 با `type="button"` اضافه شد؛ فقط برگه را می‌بندد و تمام مقادیر فرم را حفظ می‌کند؛ هیچ submit یا API ثبت رویدادی اجرا نمی‌شود.
  - *Log:* Frontend `js/modules/events.js`: در `prepareConfiguredFormsA4(section, container)` عنصر `button#event-forms-a4-confirm` با متن «تأیید» ساخته و فقط به `closeConfiguredFormsA4()` متصل شد؛ دکمه پس از `paper` در viewport قرار گرفت. `css/events.css`: استایل `.event-forms-a4-actions` و `.event-forms-a4-confirm` و مخفی‌سازی در `@media print`. `tests/event-form-a4-modal.test.js`: تست نوع button، متن، listener بستن، ترتیب قرارگیری و حفظ DOM/مقادیر. `index.html`: cache-busting با نسخه `20261109-event-form-a4-confirm-1`. Frontend PR #73 با merge commit `0bcc7f43d17ae1f9388218e798b421fef5a07aad` ادغام شد. Backend PR #45 فقط مستندات TODO5 را sync کرد؛ هیچ تغییر runtime/API/schema/Sheet نداشت و با commit `ec5c890ae296c6421a6512aedb2cdfba3d343fb3` ادغام شد.
- [x] **Task 3 — آزمون رگرسیون، ادغام و انتشار:** تست‌ها و کنترل‌های CI موفق شدند؛ هر دو PR ادغام و انتشار Frontend به GitHub Pages با موفقیت تکمیل شد؛ Product Owner تست عملیاتی را تأیید کرد.
  - *Log:* Frontend PR #73 ادغام شد؛ workflowهای `Frontend checks` run `42633388334`، `PMS cross-repository QA` run `42633388482` و `PMS frontend agent suite` run `42633388613` موفق شدند. انتشار `Publish frontend to GitHub Pages (MAIN)` run `42633389071` و `pages build and deployment` run `42633385825` هر دو با conclusion=success تکمیل شدند. کاربر در 2026-11-09 تست عملیاتی را تأیید کرد: دکمه A4 را بدون ثبت رویداد می‌بندد و اطلاعات فرم پس از بازگشایی حفظ می‌شوند. Backend PR #45 فقط مستندات بود؛ انتشار مجدد Apps Script لازم نبود. ادغام‌ها: Frontend `0bcc7f43d17ae1f9388218e798b421fef5a07aad`، Backend `ec5c890ae296c6421a6512aedb2cdfba3d343fb3`.


## 2026-11-09 — پیش‌نمایش زنده در محیط قالب‌ساز

### 🎯 Current Objective
افزودن پیش‌نمایش واقعی و زنده خروجی چاپ در همان محیط طراحی؛ تغییرات ذخیره‌نشده باید بدون رفتن به صفحه چاپ اسناد و بدون ذخیره قالب قابل مشاهده باشند.

### 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
#### مخازن و شاخه‌های عملیاتی
- Backend: Saeidesl/PRSPRO2BACKEND-PRODUCTION، شاخه feat/live-print-preview-20261109، مبنا main با commit 33c36066d559f0e051fc6525b50c6d0c61c797f9.
- Frontend: Saeidesl/PRSPRO2-PRODUCTION، شاخه feat/live-print-preview-20261109، مبنا main با commit 51a545c8cc6648e60dea6ac06b60fda8edf981e5.
- هر دو شاخه مستقل از main ساخته شده‌اند؛ مخازن توسعه و شاخه‌های قدیمی feature مبنای این کار نیستند.

#### معماری کشف‌شده Frontend
- pages/print-designer.html: صفحه فعلی قالب‌ساز، toolbar، پنل تنظیمات، بوم #pt-design-canvas و فرم ذخیره #pt-template-form.
- js/modules/print-designer.js:
  - definition منبع واحد تغییرات جاری و ذخیره‌نشده است.
  - renderEditor() و renderCanvas() بعد از تغییرات، بوم را رندر می‌کنند؛ drag/resize در bindEditor() و ویرایش تنظیمات در applyInspectorChange() انجام می‌شود.
  - editTemplate() قالب و PDF موجود را بارگذاری می‌کند؛ saveTemplate() تنها مسیر ذخیره صریح است.
  - renderOutputDocument(template, project, data) موتور HTML خروجی و generateSourcePdfOutput() موتور PDF اصلی/overlay است.
  - loadTemplateImages()، loadOutputPdfPages() و fetchOutputPdfBytes() منابع تصویری و PDF را از مسیرهای امن موجود بارگذاری می‌کنند.
  - loadOutputOptions() فهرست پروژه‌ها و قالب‌ها را در صفحه چاپ اسناد می‌گیرد؛ resolveOutput() از POST /print-templates/:id/resolve استفاده می‌کند.
- css/print-template-library.css: استایل بوم، صفحه‌های طراحی، خروجی چاپ و breakpoint موبایل؛ پنل preview در همین فایل توسعه می‌یابد.
- tests/print-template-library.test.js: تست‌های قالب‌ساز، رندر خروجی، PDF، تصاویر، چندصفحه‌ای و نسخه asset.
- index.html: cache-busting فایل‌های print-template-library.css و print-designer.js.

#### قرارداد و قیود
- Backend endpoint هدف POST /print-templates/preview با payload {ProjectID, Definition} و پاسخ {project, data}؛ فقط resolve می‌کند و چیزی ذخیره نمی‌کند. مجوز PROJECT_VIEW و tenant/project scope الزامی است.
- فقط Definition جاری و ذخیره‌نشده preview می‌شود؛ مسیر ذخیره قالب فعلی saveTemplate() و APIهای فعلی دست‌نخورده می‌مانند.
- رندر preview از renderOutputDocument و مسیر PDF موجود reuse شود؛ هیچ موتور چاپ موازی یا کپی Definition ساخته نشود.
- دسکتاپ: صفحه طراحی و preview کنار هم؛ موبایل: تغییر نما/نمایش تمام‌صفحه؛ تغییرات با debounce به‌روز شوند و پاسخ‌های کهنه درخواست‌ها نمایش داده نشوند.
- preview نباید فایل‌های موقت یا Definition را در Google Sheets/Drive ذخیره کند. برای assetهای تازه انتخاب‌شده در مرورگر از داده موقت حافظه استفاده شود تا زمان ذخیره صریح.

### 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** بررسی TODO5.md و ARCHITECTURE.md هر دو مخزن، آخرین commitهای main، شاخه‌ها، Print Designer، موتور خروجی، مسیرهای resolve و منابع داده انجام شد.
  - *Log:* Backend main=33c36066d559f0e051fc6525b50c6d0c61c797f9 و Frontend main=51a545c8cc6648e60dea6ac06b60fda8edf981e5؛ شاخه مستقل feat/live-print-preview-20261109 در هر دو مخزن ایجاد شد. Frontend: pages/print-designer.html، js/modules/print-designer.js توابع bindEditor، renderEditor، renderCanvas، editTemplate، saveTemplate، renderOutputDocument، generateSourcePdfOutput؛ css/print-template-library.css، tests/print-template-library.test.js و index.html بررسی شدند. Backend resolver فعلی و validator Definition نیز برای قرارداد API preview بررسی شدند. خروجی باید از همان موتور چاپ تولید شود و داده پروژه از مسیر tenant-scoped resolve شود.
- [x] **Task 2 — Backend: سرویس امن Resolve برای پیش‌نمایش ذخیره‌نشده:** استخراج منطق resolve مشترک، افزودن POST `/print-templates/preview` با دریافت `ProjectID` و `Definition`، اعتبارسنجی با Validator موجود، اعمال `PROJECT_VIEW` و tenant/project access، و اطمینان از عدم ایجاد/ویرایش رکورد یا Sheet.
  - *Log:* وابستگی API با Backend هماهنگ شد: `POST /print-templates/preview` با payload `{ProjectID, Definition}` و پاسخ `{project, data}`؛ مجوز `PROJECT_VIEW` و عدم ذخیره‌سازی. Backend implementation در PR #46 و CIهای آن موفق است؛ هنوز merge/deploy نشده.
- [x] **Task 3 — Frontend: پیش‌نمایش زنده در همان قالب‌ساز:** افزودن انتخاب پروژه و پنل پیش‌نمایش در کنار بوم، رندر تغییرات ذخیره‌نشده از طریق موتور موجود، debounce، حفظ PDF/تصویر و واکنش‌گرایی.
  - *Log:* `pages/print-designer.html` پنل پیش‌نمایش، انتخاب پروژه، به‌روزرسانی و نمایش بزرگ را اضافه کرد. `js/modules/print-designer.js`: توابع `loadLivePreviewProjects`، `bindLivePreview`، `scheduleLivePreview`، `renderLivePreview` و `toggleLivePreviewExpanded`؛ فراخوانی `POST /print-templates/preview` با Definition جاری؛ debounce و sequence guard؛ reuse `renderOutputDocument` و `generateSourcePdfOutput`؛ پشتیبانی از PDF محلی و تصویرهای موقت بدون آپلود/ذخیره؛ بارگذاری تصاویر قالب هنگام ویرایش؛ استفاده از فاصله‌های چاپ ذخیره‌شده. `css/print-template-library.css` پنل واکنش‌گرا و حالت نمایش بزرگ؛ `tests/print-template-library.test.js` تست قرارداد API، عدم ذخیره، PDF محلی و assetهای تصویر؛ `index.html` cache-busting نسخه `20261109-live-preview-1`. Frontend checks run `42665949449`، cross-repository QA run `42665949108` و frontend agent suite run `42665949084` موفق شدند. PR #74 با head `300e875fafb3c9e7c85ea6e099e6e59867ff2a17` شامل تغییرات اجرایی و مستندات است.
- [ ] **Task 4 — رگرسیون نهایی، بررسی مرورگر، ادغام و انتشار (IN PROGRESS):** تکمیل ممیزی UI/performance، تأیید regression مرورگر، بررسی سازگاری دو مخزن، سپس ادغام و انتشار از workflowهای موجود و تحویل برای تست Product Owner.
  - *Log:* Backend PR #46 با head `95d048eda9a71317bd7f59c5a74afd41d323d9e4` و Frontend PR #74 با head `300e875fafb3c9e7c85ea6e099e6e59867ff2a17` باز و merge نشده‌اند. Backend source checks run `42665150788`، PMS agent suite run `42665150920` و Procurement diagnostics run `42665151381` موفق‌اند. Frontend checks run `42665949449`، cross-repository QA run `42665949108` و frontend agent suite run `42665949084` موفق‌اند. ممیزی مرورگر Frontend run `42665949298` در attempt دوم است؛ تست‌های مرورگر project modal و Jalali date-time picker موفق‌اند اما مرحله UI inventory/performance audit هنوز در حال اجراست. هیچ merge، deploy یا تغییر داده عملیاتی انجام نشده است.


## 2026-11-09 — اصلاح شناسه تصویر موقت در پیش‌نمایش زنده قالب‌ساز

### 🎯 Current Objective
رفع خطای «شناسه تصویر یکی از المان‌های قالب معتبر نیست» هنگام پیش‌نمایش زنده تصویری که هنوز در قالب ذخیره نشده است؛ بدون تغییر در تعریف اصلی و بدون آپلود/ذخیره خودکار.

### 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
- Backend operational: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه اصلاحی `fix/live-preview-pending-image-asset-20261109`، مبنای main برابر `f33f32bd77fc1674ea7c49d7daf17e79ba0b0f3c`.
- Frontend operational: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه اصلاحی `fix/live-preview-pending-image-asset-20261109`، مبنای main برابر `bf8b04c5e6e27db45ce73f02e59d52709c5ca310`.
- Backend: `PrintTemplateValidator.js:parseDefinition` برای هر image که property به نام `assetId` دارد، شناسه با الگوی `IMG_[A-Za-z0-9_-]{8,100}` اعتبارسنجی می‌کند. `PrintTemplateService.js:uploadImage` شناسه دائمی را با پیشوند `IMG_` و UUID بدون خط تیره می‌سازد؛ `preview(body, params)` نیز Definition دریافتی را از همان Validator عبور می‌دهد. مسیر API موجود `POST /print-templates/preview` و مجوز `PROJECT_VIEW` حفظ می‌شود.
- Frontend: `js/modules/print-designer.js:handleImageSelection` المان تصویر جدید را با `assetId:''` و فایل را در `pendingImageFiles[element.id]` نگه می‌دارد؛ `renderLivePreview` پیش از اصلاح، clone تعریف را بدون پاک‌سازی به `POST /print-templates/preview` می‌فرستاد. رندر محلی تصویر با `imageSources[item.assetId || item.id]` و مسیر PDF با فایل pending کار می‌کند.
- علت قطعی: شناسه خالیِ یک asset موقت نباید به Validator سمت سرور ارسال شود؛ اعتبارسنجی سخت‌گیرانه شناسه assetهای دائمی باید بدون تغییر باقی بماند.
- راه‌حل تصویر: فقط clone مخصوص preview پاک‌سازی شود؛ property خالی `assetId` صرفاً برای المان تصویری که فایل متناظر آن در `pendingImageFiles` وجود دارد حذف شود. Definition اصلی، شناسه assetهای ذخیره‌شده و تصاویر خراب/بدون فایل pending تغییر نکنند.
- قابلیت چاپ جدید: دکمه فقط پس از آماده‌شدن پیش‌نمایش فعال است. خروجی HTML با چاپگر مرورگر و قواعد چاپ محدود به همان پنل چاپ می‌شود؛ اگر قالب PDF اصلی دارد، PDF تولیدشده با کیفیت اصلی در نمایشگر PDF باز می‌شود تا از همان‌جا چاپ شود. URL موقت PDF قبلی هنگام جایگزینی آزاد می‌شود. هیچ ذخیره قالب، آپلود یا API جدیدی اجرا نمی‌شود.

### 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** بررسی TODO5.md و ARCHITECTURE.md هر دو مخزن، آخرین commitهای main، شاخه‌های اصلاحی و مسیر انتخاب تصویر → Definition → preview → Validator انجام شد.
  - *Log:* Backend: `PrintTemplateValidator.js:parseDefinition`، `PrintTemplateService.js:uploadImage/preview` و route موجود در `Router.js` بررسی شدند؛ تولید شناسه دائمی با `IMG_ + UUID بدون خط تیره` معتبر است. Frontend: `js/modules/print-designer.js:handleImageSelection/uploadPendingImages/renderLivePreview` و `tests/print-template-library.test.js` بررسی شدند. اشکال فقط در ارسال `assetId:''` برای تصویر pending است؛ Backend validation، قرارداد API و ذخیره‌سازی دست‌نخورده می‌مانند.
- [ ] **Task 2 — تکمیل چرخه پیش‌نمایش و چاپ در همان قالب‌ساز (IN PROGRESS):** رفع شناسه تصویر pending فقط در clone درخواست preview، حفظ Definition اصلی و assetهای دائمی؛ افزودن دکمه «چاپ» در پنل پیش‌نمایش زنده برای چاپ مستقیم خروجی HTML یا بازکردن PDF نهایی تولیدشده، بدون ذخیره قالب و بدون رفتن به صفحه چاپ اسناد.
- [ ] **Task 3 — Regression، ادغام و انتشار:** اجرای Frontend regression، QA بین‌مخزنی و ممیزی مرورگر؛ بررسی چاپ HTML چندصفحه‌ای، PDF اصلی، تصاویر، RTL، A4، موبایل و عدم ذخیره‌سازی؛ ادغام و انتشار از workflowهای موجود و سپس تست عملیاتی Product Owner.
