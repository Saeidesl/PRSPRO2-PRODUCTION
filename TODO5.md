## 🎯 Current Objective
افزودن قابلیت ورود فایل HTML طراحی‌شده توسط کاربر به همان محیط Print Designer؛ ظاهر و ساختار HTML پس از ورود ثابت و حفظ شود و کاربر فقط فیلدهای داده PMS را روی نقاط دلخواه قرار دهد، جابه‌جا کند و تنظیم نماید. قابلیت‌های فعلی PDF، OCR، تصویر، bindingها، ذخیره قالب و خروجی PDF باید بدون اختلال باقی بمانند.

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
### فاز HTML Template Import — تصمیم محصول و نقشه فنی (2026-11-09)
#### تصمیم قطعی محصول
- HTML واردشده به‌عنوان لایه طراحی اصلی حفظ می‌شود؛ اجزای HTML به عناصر قابل ویرایش مستقل تبدیل نمی‌شوند.
- کاربر فقط عناصر داده PMS را روی لایه HTML اضافه/جابجا/تنظیم می‌کند؛ ظاهر، متن‌ها، جدول‌ها و چیدمان HTML ثابت می‌مانند.
- قابلیت باید در Print Designer و چرخه موجود قالب‌ها ادغام شود؛ صفحه، کتابخانه، فرم، API یا مسیر ذخیره موازی ایجاد نشود.
- مسیر فعلی PDF/OCR و قالب‌های قدیمی باید کاملاً backward-compatible بمانند.

#### یافته‌های واقعی Frontend روی main
- pages/print-designer.html: ورودی فعلی #pt-pdf-file فقط PDF و تصویر را می‌پذیرد؛ بوم فعلی #pt-design-canvas و ابزارهای داده/متن/جدول/تصویر/اشکال در همان صفحه موجودند.
- js/modules/print-designer.js (SHA 555037e4d599929ce3739f4bc91b4e3a092acb50): handleImportFile فقط PDF و تصویر را می‌پذیرد؛ imageFileToPdf مسیر تصویر به PDF پس‌زمینه/OCR است و نباید برای HTML استفاده شود؛ createElement, renderCanvas, saveTemplate, renderOutputDocument, generateSourcePdfOutput, renderFinalPdfPreview, downloadOutputPdf و مدل definition.page/elements/bindings مسیرهای موجودند.
- index.html: نسخه asset ماژول Print Designer با query version مدیریت می‌شود.
- css/print-template-library.css: استایل‌های بوم و خروجی چاپ در همین فایل توسعه می‌یابند.
- tests/print-template-library.test.js: تست‌های فعلی CRUD، binding، canvas، PDF، تصویر، اشکال و خروجی چاپ باید گسترش یابند.
- API Client واحد PMS.Api است؛ درخواست مستقیم یا مسیر موازی ممنوع.

#### یافته‌های واقعی Backend روی main
- Router.js: مسیرهای CRUD قالب، POST/GET /print-templates/:id/pdf و مسیرهای image asset موجودند؛ مجوزها و tenant scope باید حفظ شوند.
- PrintTemplateService.js: create/update, _template, _public, uploadPdf/downloadPdf, uploadImage/downloadImage و کنترل Tenant در همان سرویس موجودند.
- PrintTemplateRepository.js: شیت 36_PrintTemplates و ستون‌های DefinitionJSON، metadata PDF و ImageAssetsJSON موجودند.
- GoogleDriveStorage.uploadBase64ToTenant/getFileAsBase64/delete و facade StorageRepository برای ذخیره فایل tenant-scoped موجودند.
- PrintTemplateValidator.parseDefinition قرارداد JSON و اندازه Definition را اعتبارسنجی می‌کند؛ HTML حجیم یا باینری نباید در سلول Google Sheets یا DefinitionJSON ذخیره شود.
- تست‌های Backend در tests/print-templates.test.js چرخه سرویس و storage را پوشش می‌دهند.

#### اصول فنی و امنیتی الزامی
- HTML/CSS منبع باید به‌صورت asset مستقل و tenant-scoped در Google Drive نگهداری شود؛ در DefinitionJSON فقط metadata/reference و تنظیمات صفحه/لایه و bindingهای PMS قرار گیرند.
- رندر HTML باید در محیط ایزوله و بدون دسترسی به origin اصلی PMS اجرا شود؛ اجرای scriptهای واردشده، handlerهای inline، فرم‌ها، navigation و درخواست‌های شبکه ناخواسته مجاز نیست.
- CSS و layout واردشده باید در preview و خروجی چاپ تا حد ممکن یکسان باشند؛ محدودیت منابع خارجی، فونت‌ها، تصاویر و relative paths باید در import مشخص و امن مدیریت شود.
- overlay داده‌ها باید از definition.elements و bindingهای موجود استفاده کند و روی HTML قرار گیرد؛ مدل جدیدی برای فیلدهای داده ساخته نشود.
- PDF نهایی باید HTML را با ابعاد و مقیاس صفحه تعریف‌شده رندر کند و لایه داده PMS را با همان pipeline فعلی اضافه کند؛ مسیر PDF اصلی و تصویر/OCR مستقل باقی بمانند.
- کنترل اندازه فایل، MIME، محتوا، tenant isolation، مجوزها، پاک‌سازی asset در شکست و عدم افشای storage key الزامی است.


## 📋 Macro-Task Queue & Implementation Log
- [x] Task 1 — Discovery & Planning: بررسی TODO5 و ARCHITECTURE دو مخزن عملیاتی، آخرین commitهای main، وضعیت شاخه‌ها، ورودی import، مدل Definition، چرخه CRUD/asset، خروجی PDF و تست‌های موجود انجام شد؛ تصمیم محصول برای حفظ کامل طراحی HTML تأیید شد.
  - *Log:* شاخه مستقل feat/html-template-import-20261109 در هر دو مخزن از Backend main 33c36066d559f0e051fc6525b50c6d0c61c797f9 و Frontend main 51a545c8cc6648e60dea6ac06b60fda8edf981e5 ساخته شد. Frontend: pages/print-designer.html, js/modules/print-designer.js, css/print-template-library.css, tests/print-template-library.test.js, index.html. Backend: Router.js, PrintTemplateService.js, PrintTemplateRepository.js, PrintTemplateValidator.js, GoogleDriveStorage.js, StorageRepository.js, tests/print-templates.test.js, Sheet 36_PrintTemplates. فایل HTML باید در Drive tenant-scoped نگهداری و فقط reference در Definition ذخیره شود؛ bindingهای موجود و API Client فعلی حفظ می‌شوند.
- [ ] Task 2 — ورود امن و ذخیره HTML در قالب موجود (IN PROGRESS): افزودن ورودی HTML در همان Print Designer؛ اعتبارسنجی نوع/حجم/ساختار؛ ذخیره tenant-scoped از مسیر موجود Storage و API قالب؛ نگهداری metadata/reference در مدل موجود؛ نمایش HTML در بوم ایزوله بدون اجرای script یا دسترسی به origin برنامه.
- [ ] Task 3 — اتصال داده‌های PMS روی HTML: افزودن/جابجایی/تنظیم عناصر داده روی لایه HTML با استفاده از definition.elements و bindingهای فعلی؛ حفظ HTML اصلی و پشتیبانی از داده‌های پروژه، اطلاعات مرکزی و پاسخ فرم‌ها؛ ذخیره و بازیابی کامل قالب.
- [ ] Task 4 — خروجی، رگرسیون و پذیرش عملیاتی: تطبیق preview، چاپ و PDF نهایی با طراحی HTML؛ تست صفحات A4 و چندصفحه‌ای، CSS/فونت/تصویر، امنیت HTML، tenant isolation، قالب‌های قدیمی، مسیر PDF/OCR و عملکرد Frontend/Backend؛ سپس ادغام و انتشار طبق workflow موجود و ارائه تست به Product Owner.


## سابقه و لاگ‌های فازهای پیشین (بدون حذف)

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
