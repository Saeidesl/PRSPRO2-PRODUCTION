## 🎯 Current Objective

کاهش محسوس زمان نمایش خروجی قالب‌های پروژه، به‌ویژه زمانی که یک پروژه چند قالب فعال دارد؛ حذف درخواست‌های resolve تکراری و خواندن چندباره Google Sheets، همراه با نمایش تدریجی خروجی بدون نمایش داده کهنه. اطلاعات پروژه، رویدادها و پاسخ فرم‌ها باید در هر بار بازکردن خروجی از سرور و به‌روز دریافت شوند.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

### مخازن و شاخه‌های عملیاتی
- Backend عملیاتی: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`
- Frontend عملیاتی: `Saeidesl/PRSPRO2-PRODUCTION`
- شاخه مبنا در شروع فاز: `main`
- شاخه کاری هر دو مخزن: `perf/project-print-output-batch-resolve-20261117`
- Backend main در Discovery: `5178c90110e8a7d4dcba9469947b4ca0095c5137`
- Frontend main در Discovery: `c170cff1c0815d8ecf4559c6f200e27493fc5f2c`
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
- مسیر تجمیعی پیشنهادی: `POST /print-templates/resolve` با payload `{ ProjectID, TemplateIDs: [] }`؛ این endpoint هنوز پیاده‌سازی نشده است.
- assetها: `GET /print-templates/:id/images/:assetId` و `GET /print-templates/:id/pdf`.
- مسیرهای ویرایش داده متصل به خروجی و آپلود فایل باید حفظ شوند.

### تشخیص عملکرد
- گزارش `test-results/latest-performance-report.json` تولیدشده در 2026-11-17 زمان route-ready صفحه print-output را 4416ms و navigation را 7073ms ثبت کرده است؛ این مقادیر زمان بازشدن خروجی واقعی یک پروژه نیستند.
- ممیزی فعلی تعداد کل درخواست‌های شبکه را ثبت می‌کند، اما timing breakdown درخواست‌های batch resolve، تعداد قالب‌ها، تعداد assetها و زمان render خروجی پروژه را به‌صورت اختصاصی ثبت نمی‌کند.
- در فاز اجرا باید تست هدفمند با چند قالب و ترکیب قالب متنی، تصویری و PDF ساخته شود و تعداد درخواست‌ها، زمان resolve و زمان آماده‌شدن preview اندازه‌گیری شود.

### طرح فنی Frontend
- `initProjectOutput()` پس از دریافت لیست قالب‌ها، به‌جای حلقه ترتیبی resolve، یک درخواست batch با TemplateIDs ارسال می‌کند.
- پاسخ batch به map بر اساس TemplateID تبدیل شود و هر قالب مستقل render شود؛ ترتیب فعلی قالب‌ها در خروجی حفظ شود.
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
- [ ] **Task 3 — Progressive Rendering & Asset Scheduling (IN PROGRESS):** نمایش تدریجی قالب‌ها، concurrency محدود برای assetها و حفظ کیفیت PDF/تصاویر.
- [ ] **Task 4 — Regression, Performance & Operational Acceptance:** تست خروجی پروژه با چند قالب، ویرایش متن/فایل/جدول، چاپ/PDF، موبایل، شمار درخواست‌ها و زمان واقعی؛ پذیرش Product Owner.

### وضعیت اجرا
- Task 1 Discovery & Planning تکمیل شده است.
- Task 2 اتصال Batch Resolve در Frontend، ادغام، انتشار GitHub Pages و تست عملیاتی Product Owner را با موفقیت پشت سر گذاشته و در این ثبت [x] شده است.
- Backend dependency با PR #87 در `main` ادغام و از طریق Apps Script workflow run `44134620890` روی commit `d1c34d72cc8ff9b2e736dc7c880c5cca36e480af` منتشر شد.
- Frontend PR #140 با squash در `main` ادغام شد؛ merge commit: `0a3a67ff657300f0e79ce193c3c461d248e42691`.
- GitHub Pages workflow رسمی `.github/workflows/deploy-pages-staging.yml` با run `44135173608` روی commit نهایی اجرا شد.
- Product Owner در 2026-11-17 تست عملیاتی خروجی چندقالبی و رفتارهای مرتبط را تأیید کرد.
- cache دائمی تعریف قالب‌ها حفظ شد؛ داده پروژه و نتیجه resolve در cache دائمی ذخیره نمی‌شوند.
- Task 3 اکنون IN PROGRESS است و روی نمایش تدریجی و زمان‌بندی assetها تمرکز دارد.

### Task 2 implementation log — Batch Resolve Integration (ACCEPTED)
- `js/modules/print-designer.js`، تابع `PrintDesigner.initProjectOutput(projectId)`: به‌جای resolve ترتیبی برای هر قالب، یک درخواست `POST /print-templates/resolve` با payload `{ ProjectID, TemplateIDs }` ارسال می‌کند؛ پاسخ‌ها با TemplateID به قالب مربوط متصل می‌شوند و خطای هر قالب مستقل نمایش داده می‌شود.
- درخواست جداگانه `GET /projects/:id` در حالت وجود قالب حذف شد؛ عنوان پروژه از پاسخ تازه batch خوانده می‌شود. حالت بدون قالب همچنان اطلاعات پروژه را جداگانه می‌گیرد.
- مسیرهای renderer، ویرایش inline، آپلود فایل/تصویر، جدول چندردیفی و چاپ/PDF حفظ شدند.
- `index.html`: cache-busting ماژول به `20261117-project-print-batch-resolve-1` تغییر کرد.
- تست جدید `tests/project-print-output-batch.test.js` و تست‌های `tests/project-print-designer.test.js` و `tests/print-template-library.test.js` به‌روزرسانی شدند؛ CIهای Frontend و cross-repository QA موفق شدند.
- Backend endpoint متناظر در `Router.js` و `PrintTemplateService.resolveMany()` اضافه شد؛ legacy endpoint بدون تغییر باقی ماند.
- Frontend PR #140 با squash merge commit `0a3a67ff657300f0e79ce193c3c461d248e42691` در `main` ادغام شد؛ GitHub Pages run `44135173608` روی همین SHA اجرا شد.
- Product Owner تست عملیاتی را در 2026-11-17 تأیید کرد؛ صحت خروجی چندقالبی و حفظ ویرایش متن/فایل، جدول چندردیفی، چاپ/PDF و رفتار موبایل تأیید شد.

### Task 3 — Progressive Rendering & Asset Scheduling (IN PROGRESS)
- هدف: هر قالب پس از آماده‌شدن خودش در preview ظاهر شود؛ کاربر منتظر resolve و render کندترین قالب نماند.
- محدوده: `pages/print-output.html`، `js/modules/print-designer.js`، `renderOutputDocument()`، `loadTemplateImages()`، `loadOutputPdfPages()` و تست‌های مرتبط.
- پیاده‌سازی باید ترتیب اصلی قالب‌ها را حفظ کند، assetها را با concurrency محدود بارگذاری کند و خطای یک قالب را از بقیه جدا نگه دارد.
- چرخه عمر PDF/object URL و listenerها باید بدون memory leak مدیریت شود؛ کیفیت تصاویر/PDF، ویرایش inline، upload، جدول چندردیفی و چاپ همه قالب‌ها حفظ شود.
- داده پروژه/رویداد/فرم همیشه تازه بماند و فقط definition/metadata قالب از cache دائمی استفاده کند.
- معیار پذیرش: نمایش تدریجی قابل مشاهده، ترتیب ثابت، بارگذاری asset کنترل‌شده، عدم توقف کل صفحه با خطای یک قالب، عدم رگرسیون چاپ/PDF و موبایل.
