## 🎯 Current Objective
افزودن دکمه «تأیید» در انتهای برگه A4 فرم‌های متصل به رویداد؛ این دکمه فقط برگه را می‌بندد و مقادیر فرم را حفظ می‌کند و به هیچ عنوان رویداد را ثبت نمی‌کند.

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
- [ ] **Task 2 — اصلاح اعتبارسنجی و ارسال فرم A4 (IN PROGRESS):** حذف شرط بازگشایی اجباری A4 صرفاً به دلیل بسته بودن؛ اعتبارسنجی کنترل‌های اصلی و کنترل‌های فرم متصل بدون خطای focus در حالت پنهان؛ بازکردن A4 فقط هنگام وجود فیلد نامعتبر و هدایت کاربر به همان فیلد؛ حفظ پاسخ‌ها، فایل‌ها، جدول‌های چندردیفی و idempotency.
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
- [ ] **Task 2 — افزودن دکمه تأیید (IN PROGRESS):** افزودن دکمه پایین برگه A4 با `type="button"`، بستن برگه از طریق تابع موجود و حفظ تمام مقادیر فرم؛ عدم فراخوانی `submitForm` یا `PMS.Api.post('/events')`.
- [ ] **Task 3 — آزمون رگرسیون و انتشار:** پوشش تست برای کلیک دکمه، بسته‌شدن برگه، حفظ مقدارها و عدم فراخوانی submit/API؛ اجرای تست‌ها، PR و بررسی انتشار Frontend؛ بدون تغییر Backend runtime.
