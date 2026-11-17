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
- [ ] **Task 2 — Batch Resolve Integration (IN PROGRESS):** اتصال صفحه خروجی به endpoint تجمیعی و تبدیل پاسخ‌ها به render مستقل هر قالب.
- [ ] **Task 3 — Progressive Rendering & Asset Scheduling:** نمایش تدریجی قالب‌ها، concurrency محدود برای assetها و حفظ کیفیت PDF/تصاویر.
- [ ] **Task 4 — Regression, Performance & Operational Acceptance:** تست خروجی پروژه با چند قالب، ویرایش متن/فایل/جدول، چاپ/PDF، موبایل، شمار درخواست‌ها و زمان واقعی؛ پذیرش Product Owner.

### وضعیت اجرا
- در این مرحله فقط Discovery و مستندسازی انجام شده است.
- cache دائمی قالب‌ها و revision sync قبلی حفظ می‌شوند؛ داده پروژه و نتیجه resolve هرگز cache دائمی نمی‌شوند.
- تغییرات فقط روی شاخه کاری انجام می‌شوند؛ merge به main نیازمند تأیید صریح Product Owner است.
