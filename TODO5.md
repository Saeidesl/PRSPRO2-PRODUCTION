## 🎯 Current Objective
ساخت افزونه Microsoft Word برای اتصال مستقیم و امن به PMS عملیاتی؛ افزونه باید در Word ویندوز و Word Online کار کند. کاربر قالب را آزادانه در Word طراحی می‌کند، محل درج داده را با Content Controls دارای Tag مشخص می‌کند، پروژه را از فهرست PMS انتخاب می‌کند و اطلاعات در همان محل‌ها درج می‌شوند. قالب اصلی نباید تغییر کند؛ تکمیل روی یک نسخه کاری انجام شود.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
### مخازن و شاخه
- Backend عملیاتی: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه کاری `feature/word-pms-connector-20261108`؛ شاخه پایه `main` در زمان شروع: `2ea57b4cf8066eaeec49633d0936c60cfa710834`.
- Frontend عملیاتی: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه کاری `feature/word-pms-connector-20261108`؛ شاخه پایه `main` در زمان شروع: `b383b2aca875b04b7f1c0b61fe624d50532aa101`.
- مخازن توسعه `PRSPRO2BACKEND` و `PRSPRO2` خارج از محدوده‌اند و نباید تغییر کنند.
- شاخه‌های `main` فقط مبنای انشعاب بوده‌اند؛ تغییرات این فاز فقط روی شاخه کاری انجام می‌شوند.

### معماری موجود Frontend
- `js/core/api.js`: API client فعلی PMS؛ `API_BASE_URL` از `window.PMS_API_BASE_URL` می‌آید و token فعلی با `pms_api_token`/حافظه مدیریت می‌شود. این مدل token مرورگر مستقیماً قابل انتقال به Office Add-in فرض نمی‌شود؛ روش امن مخصوص Office باید در Task 2 طراحی شود.
- `js/modules/print-designer.js`: ماژول موجود کتابخانه قالب، منبع داده، binding و خروجی؛ از `PMS.Api` استفاده می‌کند.
- `pages/print-designer.html`: رابط فعلی Print Designer.
- `index.html`: نقطه بارگذاری assetها و cache-busting فرانت‌اند.
- قالب‌ساز موجود و مسیرهای آن حفظ می‌شوند؛ افزونه Word کلاینت Office جداگانه است و نباید مسیر چاپ فعلی را حذف یا جایگزین کند.

### قرارداد Backend موجود که افزونه باید مصرف کند
- `GET /projects`: فهرست پروژه با کنترل دسترسی سرور.
- `GET /projects/:id`: دریافت جزئیات پروژه با کنترل دسترسی.
- `GET /print-templates/sources`: منابع قابل اتصال شامل فیلدهای پروژه، انواع اطلاعات مرکزی و فرم‌ها.
- `POST /print-templates/:id/resolve` (مسیر دقیق متد/Router در Task 2 بازبینی شود): resolver موجود، با کنترل Tenant و دسترسی پروژه، مقادیر bindingها را برمی‌گرداند.
- قراردادهای داده فعلی: `PROJECT_FIELD`, `PROJECT_INFORMATION`, `EVENT_FORM_RESPONSE`.
- درخواست‌های PMS در فرانت‌اند فعلی از `js/core/api.js` عبور می‌کنند؛ Office Add-in باید احراز هویت و ارتباط را به‌صورت امن و مستقل پیاده کند.

### تصمیم‌های طراحی
- Office.js Add-in با manifest مشترک برای Word Desktop و Word Online.
- قالب DOCX توسط Product Owner در Word طراحی می‌شود؛ محل داده با Content Controls و Tagهای پایدار مشخص می‌شود.
- پنل افزونه امکان جستجو و انتخاب پروژه از فهرست مجاز را فراهم می‌کند.
- عملیات درج داده باید متن/محتوا را در Content Control هدف جایگزین کند و استایل و ساختار قالب را حفظ کند.
- هر عملیات روی سند کاری انجام می‌شود؛ فایل قالب اصلی تغییر نمی‌کند.
- دسترسی و tenant isolation باید توسط Backend اعمال شود؛ token در متن سند یا log ذخیره نشود.
- سازگاری Word Desktop/Online و محدودیت‌های Office.js باید با تست واقعی ثابت شود؛ پشتیبانی از جدول‌های پویا و تصاویر در Task 3 است.

## 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** بررسی مخازن عملیاتی، اسناد فاز قبلی، Print Designer موجود و APIهای پروژه/قالب؛ تعریف معماری افزونه مشترک Word.
  - *Log:* فایل‌های `js/core/api.js`, `js/modules/print-designer.js`, `pages/print-designer.html`, `index.html` بررسی شدند. Print Designer فعلی و bindingهایش حفظ می‌شود و افزونه Word به‌عنوان کلاینت Office مستقل تعریف شد.
- [ ] **Task 2 — Word Add-in MVP (IN PROGRESS):** طراحی و پیاده‌سازی manifest و task pane مشترک؛ اتصال امن به Backend؛ نمایش/جستجوی پروژه‌های مجاز؛ درج فیلدهای متنی و عددی در Content Controls با Tag مشخص.
  - *Log:* فایل‌های `word-addin/manifest.xml`, `word-addin/taskpane.html`, `word-addin/taskpane.css`, `word-addin/taskpane.js` و `word-addin/README.md` اضافه شدند. افزونه Office.js با WordApi 1.1، ورود از `POST /auth/login`, دریافت فهرست از `GET /projects` و جزئیات از `GET /projects/:id`، جستجوی محلی پروژه و جایگذاری فیلدهای تکی در Content Controls با Tag را پیاده می‌کند. قالب اصلی تغییر داده نمی‌شود؛ درج فقط در سند باز جاری انجام می‌شود. token فقط در حافظه task pane نگهداری و هنگام خروج پاک می‌شود. شناسه‌های MVP: `PROJECT_NAME`, `PROJECT_CODE`, `TOTAL_QUANTITY`, `PROJECT_DESCRIPTION`, `PROJECT_STATUS`, `PROJECT_ID`. PR Draft #67 ایجاد شد؛ PR مرتبط Backend #39 فقط TODO5 را به‌روزرسانی می‌کند. پس از بازبینی قرارداد واقعی `Response.success/error` در `Response.js`، مدیریت خطا در `word-addin/taskpane.js` اصلاح شد تا پیام `response.error.message` نمایش داده شود. Workflow کنترل ایستا در `.github/workflows/word-addin-check.yml` اضافه شد: `node --check`، اعتبار XML manifest، HTTPS بودن SourceLocation، وجود assetها، شناسه‌های شش‌گانه و عدم ذخیره token در localStorage. README وضعیت میزبانی و محدودیت تست را مستند می‌کند. اجرای موفق Workflow هنوز از ابزار GitHub قابل تأیید نشده؛ Pages نیز فعال/در دسترس بودنش تأیید نشده است. تست واقعی Word Desktop/Online، CORS/API و انتشار Pages همچنان باقی است؛ Task 2 باز می‌ماند.
- [ ] **Task 3 — داده‌های پیچیده و قالب‌بندی:** جدول‌های چندردیفی، تصاویر، فیلدهای اطلاعات مرکزی و پاسخ فرم؛ حفظ قالب اصلی و نسخه کاری؛ تست RTL و صفحه‌بندی در هر دو Word.
- [ ] **Task 4 — آزمون یکپارچه و تحویل:** تست ویندوز و آنلاین، API، مجوز، tenant isolation، token، سازگاری و رگرسیون؛ مستندات نصب/استفاده و دستور تست کاربر. انتشار نهایی پس از تأیید جداگانه.
