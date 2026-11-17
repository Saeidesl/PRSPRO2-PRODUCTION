## 🎯 Current Objective

کاهش محسوس زمان نمایش خروجی قالب‌های پروژه، به‌ویژه زمانی که یک پروژه چند قالب فعال دارد؛ حذف درخواست‌های resolve تکراری و خواندن چندباره Google Sheets، همراه با نمایش تدریجی خروجی بدون نمایش داده کهنه. اطلاعات پروژه، رویدادها و پاسخ فرم‌ها باید در هر بار بازکردن خروجی از سرور و به‌روز دریافت شوند.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

### مخازن و شاخه‌های عملیاتی
- Backend عملیاتی: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`
- Frontend عملیاتی: `Saeidesl/PRSPRO2-PRODUCTION`
- شاخه مبنا در شروع فاز: `main`
- شاخه پیاده‌سازی ادغام‌شده: `perf/project-print-output-batch-resolve-20261117`.
- Backend main پس از ادغام: `d1c34d72cc8ff9b2e736dc7c880c5cca36e480af`.
- Frontend main پس از ادغام: `0a3a67ff657300f0e79ce193c3c461d248e42691`.
- شاخه ثبت پذیرش و انتقال تسک: `docs/batch-resolve-acceptance-log-20261117`.
- فاز قبلی بهینه‌سازی resolver در 2026-11-16 در ARCHITECTURE.md بسته و آرشیو شده است؛ این TODO5 برای فاز مستقل جدید بازسازی شد.
- مخازن Development خارج از محدوده‌اند.

### مسیرهای واقعی Frontend
- صفحه خروجی پروژه: `pages/print-output.html`؛ شناسه‌های اصلی preview/status: `pt-output-preview` و `pt-output-status`.
- ماژول اصلی: `js/modules/print-designer.js`.
- `PrintDesigner.initProjectOutput(projectId)` در هر ورود:
  - `getTemplateListCached()` را برای فهرست cache‌شده قالب‌ها فراخوانی می‌کند.
  - `GET /projects/:id` را برای اطلاعات تازه پروژه دریافت می‌کند.
  - سپس برای هر قالب، به‌صورت ترتیبی `POST /print-templates/:id/resolve` ارسال می‌کند.
  - پس از resolve، `renderOutputDocument()` را اجرا و بخش قالب را به DOM اضافه می‌کند.
- `renderOutputDocument()`:
  - `loadTemplateImages()` را اجرا می‌کند؛ تصاویر هر قالب درون همان قالب با `Promise.all` بارگیری می‌شوند.
  - در صورت وجود PDF پس‌زمینه، `loadOutputPdfPages()` فایل PDF را دریافت و صفحه‌ها را برای preview رندر می‌کند.
  - عناصر هر صفحه را با Promise.all تولید می‌کند؛ در حالت PDF ممکن است canvas و PDF rendering هزینه پردازشی قابل‌توجه داشته باشد.
- `loadTemplateImages()`: از مسیر `GET /print-templates/:templateId/images/:assetId` برای هر تصویر استفاده می‌کند.
- `loadOutputPdfPages()` و `fetchOutputPdfBytes()`: از `GET /print-templates/:templateId/pdf` استفاده می‌کنند.
- `PrintDesigner.getTemplateListCached()` و cache دائمی تعریف قالب‌ها باید حفظ شوند؛ نتیجه resolve پروژه/فرم‌ها نباید cache شود.
- `bindProjectOutputSection()`، ویرایش متن/فایل/ردیف جدول و عملیات ذخیره باید بدون تغییر رفتار باقی بمانند.

### مسیرهای Backend و قراردادهای موردنیاز Frontend
- فهرست: `GET /print-templates` و revision: `GET /print-templates/revision`.
- داده تازه پروژه: `GET /projects/:id`.
- resolve فعلی: `POST /print-templates/:id/resolve` با payload `{ ProjectID }`.
- مسیر تجمیعی پیاده‌سازی و منتشرشده: `POST /print-templates/resolve` با payload `{ ProjectID, TemplateIDs: [] }`؛ مجوز `PROJECT_VIEW` و اعتبارسنجی tenant در Backend اعمال می‌شود.
- assetها: `GET /print-templates/:id/images/:assetId` و `GET /print-templates/:id/pdf`.
- مسیرهای ویرایش داده متصل به خروجی و آپلود فایل باید حفظ شوند.

### تشخیص عملکرد
- گزارش `test-results/latest-performance-report.json` تولیدشده در 2026-11-17 زمان route-ready صفحه print-output را 4416ms و navigation را 7073ms ثبت کرده است؛ این مقادیر زمان بازشدن خروجی واقعی یک پروژه نیستند.
- ممیزی فعلی تعداد کل درخواست‌های شبکه را ثبت می‌کند، اما timing breakdown درخواست‌های batch resolve، تعداد قالب‌ها، تعداد assetها و زمان render خروجی پروژه را به‌صورت اختصاصی ثبت نمی‌کند.
- در فاز اجرا باید تست هدفمند با چند قالب و ترکیب قالب متنی، تصویری و PDF ساخته شود و تعداد درخواست‌ها، زمان resolve و زمان آماده‌شدن preview اندازه‌گیری شود.

### طرح فنی Frontend
- `initProjectOutput()` پس از دریافت لیست قالب‌ها، یک درخواست batch با TemplateIDs ارسال می‌کند.
- پاسخ batch به map بر اساس TemplateID تبدیل می‌شود؛ خطای هر قالب مستقل است و ترتیب قالب‌ها حفظ می‌شود.
- render قالب‌ها با concurrency محدود انجام شود تا تصاویر/PDFهای بزرگ حافظه مرورگر را اشباع نکنند؛ خطای یک قالب نباید سایر قالب‌ها را متوقف کند.
- بخش هر قالب پس از آماده‌شدن خودش به preview افزوده شود؛ status پیشرفت واقعی نشان دهد و کل صفحه منتظر کندترین قالب نماند.
- درخواست داده پروژه و resolve همچنان تازه باشد؛ فقط definition و metadata قالب از cache دائمی استفاده کنند.
- object URLهای PDF، listenerها، ویرایش inline، جدول‌های چندردیفی و چاپ/PDF فعلی حفظ شوند.

### معیارهای پذیرش
- برای N قالب فعال، یک درخواست batch resolve به‌جای N درخواست resolve ارسال شود.
- preview قالب‌های آماده‌شده به‌تدریج نمایش داده شود و ترتیب قالب‌ها تغییر نکند.
- تصاویر و PDFها با concurrency محدود و بدون افت کیفیت/خرابی خروجی بارگذاری شوند.
- اطلاعات پروژه، رویدادها و فرم‌ها تازه باشند؛ ویرایش و upload همچنان روی منبع اصلی ذخیره شود.
- خطای یک قالب باعث از دست رفتن سایر قالب‌ها نشود.
- رفتار موبایل، چاپ همه قالب‌ها، دانلود PDF و ویرایش متن/فایل/جدول رگرسیون نشود.

## 📋 Macro-Task Queue & Implementation Log

- [x] **Task 1 — Discovery & Planning:** بررسی کامل صفحه خروجی، چرخه بارگذاری، resolveهای ترتیبی، assetها و تست‌های موجود.
  - *Log:* `pages/print-output.html` و `js/modules/print-designer.js` بررسی شدند. `initProjectOutput()` ابتدا لیست cache‌شده قالب‌ها و پروژه تازه را موازی می‌گیرد، اما سپس resolve و render هر قالب را در حلقه ترتیبی انجام می‌دهد. `renderOutputDocument()` تصاویر و PDF پس‌زمینه را برای هر قالب دریافت می‌کند؛ بارگذاری تصاویر فقط در محدوده همان قالب موازی است. نتیجه این است که تأخیر resolve و render قالب‌ها روی هم جمع می‌شود. گزارش performance موجود زمان route را اندازه‌گیری می‌کند و برای سنجش خروجی واقعی پروژه کافی نیست. هیچ کد اجرایی در Discovery تغییر نکرد.
- [x] **Task 2 — Batch Resolve Integration:** اتصال صفحه خروجی به endpoint تجمیعی و تبدیل پاسخ‌ها به render مستقل هر قالب.
  - *Log:* در `js/modules/print-designer.js` تابع `PrintDesigner.initProjectOutput(projectId)` یک درخواست `POST /print-templates/resolve` با `{ ProjectID, TemplateIDs }` می‌فرستد؛ پاسخ‌ها بر اساس TemplateID به قالب‌ها متصل می‌شوند و خطای هر قالب مستقل نمایش داده می‌شود. GET جداگانه پروژه در حالت وجود قالب حذف و عنوان از پاسخ تازه batch خوانده می‌شود. renderer، ویرایش inline، آپلود فایل/تصویر، جدول چندردیفی و چاپ/PDF حفظ شدند. `index.html` cache-bust به `20261117-project-print-batch-resolve-1` تغییر کرد. تست `tests/project-print-output-batch.test.js` اضافه و تست‌های `tests/project-print-designer.test.js` و `tests/print-template-library.test.js` به‌روزرسانی شدند. PR #140 با squash ادغام شد؛ commit عملیاتی Frontend `0a3a67ff657300f0e79ce193c3c461d248e42691` است. GitHub Pages run `44135173608` روی همین SHA با conclusion=success منتشر شد. Product Owner در 2026-11-17 تست چندقالبی، ترتیب و داده‌ها، ویرایش متن/فایل/جدول، چاپ/PDF و موبایل را تأیید کرد.
- [x] **Task 3 — Progressive Rendering & Asset Scheduling:** نمایش تدریجی قالب‌ها، concurrency محدود برای assetها و حفظ کیفیت PDF/تصاویر.
  - *Log:* در `js/modules/print-designer.js`، `PrintDesigner.initProjectOutput(projectId)` ابتدا placeholder تمام قالب‌ها را با ترتیب اصلی درج می‌کند و حداکثر دو قالب را هم‌زمان render می‌کند؛ هر قالب پس از آماده‌شدن مستقل نمایش داده می‌شود و خطای یک قالب به بقیه سرایت نمی‌کند. helper `mapWithConcurrency(items, concurrency, worker)` اضافه شد؛ بارگذاری تصاویر حداکثر سه درخواست هم‌زمان و رندر عناصر هر صفحه حداکثر دو عملیات هم‌زمان دارد. مدیریت `outputPdfObjectUrls` و `releaseOutputPdfObjectUrls(urls)` برای آزادسازی URLهای PDF در محدوده همان قالب اصلاح شد و تداخل متغیرهای page-size در render موازی رفع شد. `index.html` cache-bust به `print-designer.js?v=20261118-project-print-progressive-1` تغییر کرد. تست‌های `tests/project-print-output-batch.test.js`, `tests/project-print-designer.test.js` و `tests/print-template-library.test.js` به‌روزرسانی شدند. PR #145 با squash در main ادغام شد؛ merge commit `07baba1fb07bce07f57e697e12f85934190e71d9`. CI/QAهای PR با runهای `44141840753`, `44141840761`, `44141840908`, `44141840890` و `44141840868` موفق بودند. Product Owner تست نسخه عملیاتی را در 2026-11-17 تأیید کرد.
- [ ] **Task 4 — Regression, Performance & Operational Acceptance (IN PROGRESS):** آزمون یکپارچه خروجی چندقالبی، برابری داده، tenant/permission، تعداد درخواست‌ها و زمان واقعی، چاپ/PDF، موبایل و پذیرش نهایی Product Owner.

### وضعیت اجرا
- Task 1، Task 2 و Task 3 تکمیل و با تست عملیاتی Product Owner پذیرفته شدند.
- Frontend PR #145 با squash در `main` ادغام شد؛ merge commit `07baba1fb07bce07f57e697e12f85934190e71d9`.
- CI و QAهای PR با runهای `44141840753`, `44141840761`, `44141840890`, `44141840908` و `44141840868` موفق بودند؛ پذیرش نهایی تست نسخه عملیاتی توسط Product Owner در 2026-11-17 اعلام شد.
- cache دائمی تعریف قالب‌ها حفظ شده و داده پروژه/فرم و نتیجه resolve همچنان تازه دریافت می‌شوند.
- Task 4 اکنون IN PROGRESS است و شامل رگرسیون جامع، سنجش عملکرد خروجی واقعی و پذیرش نهایی است.
### Task 2 implementation record (ACCEPTED)
- شاخه کاری: `perf/project-print-output-batch-resolve-20261117`.
- `js/modules/print-designer.js`، تابع `PrintDesigner.initProjectOutput(projectId)`: به‌جای resolve جداگانه هر قالب، یک درخواست `POST /print-templates/resolve` با `ProjectID` و `TemplateIDs` ارسال می‌کند؛ نتایج با TemplateID به قالب مربوط متصل می‌شوند و خطای هر قالب در همان بخش نمایش داده می‌شود.
- درخواست جداگانه `GET /projects/:id` در حالت وجود قالب حذف شد؛ اطلاعات عنوان پروژه از پاسخ تازه batch استفاده می‌شود. در حالت بدون قالب، GET پروژه برای نمایش عنوان حفظ شده است.
- مسیرهای ویرایش inline، آپلود فایل، جدول چندردیفی، PDF و renderer موجود حفظ شدند. cache-busting ماژول در `index.html` به `20261117-project-print-batch-resolve-1` تغییر کرد.
- تست جدید `tests/project-print-output-batch.test.js` و assertionهای `tests/project-print-designer.test.js` به قرارداد batch به‌روزرسانی شدند.
- Task 3 (نمایش تدریجی و زمان‌بندی assetها) به‌عنوان Macro-Task بعدی آغاز شده است.


### Task 3 implementation record (ACCEPTED)
- فایل اصلی: `js/modules/print-designer.js`؛ توابع `PrintDesigner.initProjectOutput(projectId)`, `mapWithConcurrency(items, concurrency, worker)` و `releaseOutputPdfObjectUrls(urls)`.
- سقف هم‌زمانی: دو قالب، سه تصویر، دو عنصر صفحه؛ نمایش تدریجی با حفظ ترتیب و خطای مستقل هر قالب.
- Cache-bust: `index.html` → `print-designer.js?v=20261118-project-print-progressive-1`.
- PR #145 و merge commit `07baba1fb07bce07f57e697e12f85934190e71d9`; CI/QA موفق و تست عملیاتی توسط Product Owner تأیید شد.
