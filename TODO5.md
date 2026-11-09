## 🎯 Current Objective
حفظ کیفیت اصلی تصویرهای مستقل در خروجی PDF قالب چاپ؛ فایل اصلی باید بدون فشرده‌سازی مجدد یا rasterize شدن همراه لایه طراحی، مستقیماً در PDF embed شود و ابعاد/نسبت تصویر حفظ گردد.

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

## 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** مسیرهای فعلی Print Designer، مدل عناصر، ورودی import، ذخیره Definition، خروجی PDF و API/Storage بک‌اند بررسی شد.
  - *Log:* `pages/print-designer.html` toolbar افزودن تصویر؛ `js/modules/print-designer.js:createElement`, `handleEditorAction`, `renderCanvas`, `saveTemplate`, `imageFileToPdf`, `handleImportFile`, `findImageAttachment`, `loadOutputImage`, `renderOutputDocument`, `generateSourcePdfOutput`, `downloadOutputPdf`; `css/print-template-library.css`; `tests/print-template-library.test.js`; `index.html`. placeholder فعلی به‌جای تصویر واقعی نمایش داده می‌شود. مسیر تبدیل تصویر به PDF فقط برای import پس‌زمینه/OCR است و از feature جدید جدا می‌ماند. Backend موجود: `Router.js`, `PrintTemplateService.js`, `PrintTemplateRepository.js`, `GoogleDriveStorage.js`, `StorageRepository.js`; شیت `36_PrintTemplates` و فایل‌های Drive tenant-scoped.
- [x] **Task 2 — چرخه امن Asset تصویر قالب در Backend:** API بارگذاری/دریافت تصویر، ذخیره امن و کنترل مالکیت در Backend پیاده‌سازی و در PR #42 ادغام شد.
  - *Log:* Backend: `PrintTemplateRepository.js` ستون افزایشی `ImageAssetsJSON` در `36_PrintTemplates`؛ `PrintTemplateValidator.js` اعتبارسنجی reference با الگوی `IMG_...`؛ `PrintTemplateService.js` توابع `uploadImage/downloadImage`، ذخیره باینری tenant-scoped در Google Drive، metadata غیرحساس، اعتبارسنجی JPG/JPEG/PNG/WebP و سقف 10MB، کنترل مالکیت قالب/Tenant و پاک‌سازی در شکست؛ `Router.js` مسیرهای `POST /print-templates/:id/images` و `GET /print-templates/:id/images/:assetId`؛ `tests/print-templates.test.js` تست‌های upload/download، MIME/signature و tenant isolation. PR #42 با commit `fbd8cb8351201e258b25be2c90ef3ed91624405e` ادغام شد و CI موفق بود.
- [x] **Task 3 — تجربه افزودن و ویرایش تصویر در Frontend:** انتخاب فایل، ایجاد عنصر واقعی، render، drag/resize، حفظ undo/redo و ذخیره/بازیابی در همان مدل موجود؛ تست عملیاتی Product Owner موفق بود.
  - *Log:* `pages/print-designer.html`: ورودی مستقل تصویر؛ `js/modules/print-designer.js`: `handleImageSelection`, `loadTemplateImages`, `uploadPendingImages`, `renderCanvas`, `saveTemplate`, `loadTemplate`؛ `css/print-template-library.css`: نمایش تصویر و کنترل resize؛ `tests/print-template-library.test.js`: تست مسیر upload/download و render خروجی. تصویر به‌عنوان asset اصلی در Drive ذخیره و در Definition با assetId ارجاع می‌شود. کاربر در 2026-11-09 ذخیره، بازگشایی و نمایش تصویر را در نسخه عملیاتی موفق تأیید کرد.
- [ ] **Task 4 — حفظ کیفیت اصلی تصویر در خروجی PDF (IN PROGRESS):** حذف rasterize تصویرهای مستقل در html2canvas؛ embed مستقیم JPG/PNG و تبدیل lossless فرمت WebP به PNG در ابعاد اصلی، حفظ نسبت ابعاد و مختصات روی PDF اصلی، تست چندصفحه‌ای/چرخش/CropBox و سازگاری قالب‌های قدیمی.

