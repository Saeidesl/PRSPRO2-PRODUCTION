## 🎯 Current Objective
ساخت افزونه Microsoft Word برای اتصال مستقیم و امن به PMS عملیاتی؛ افزونه باید در Word ویندوز و Word Online کار کند. کاربر قالب را آزادانه در Word طراحی می‌کند، محل درج داده را با Content Controls دارای Tag مشخص می‌کند، پروژه را از فهرست PMS انتخاب می‌کند و اطلاعات در همان محل‌ها درج می‌شوند. قالب اصلی نباید تغییر کند؛ تکمیل روی یک نسخه کاری انجام شود.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
### مخازن و شاخه
- Backend عملیاتی: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه کاری `feature/word-pms-connector-20261108`؛ شاخه پایه `main` در زمان شروع: `2ea57b4cf8066eaeec49633d0936c60cfa710834`.
- Frontend عملیاتی: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه کاری `feature/word-pms-connector-20261108`؛ شاخه پایه `main` در زمان شروع: `b383b2aca875b04b7f1c0b61fe624d50532aa101`.
- مخازن توسعه `PRSPRO2BACKEND` و `PRSPRO2` خارج از محدوده‌اند و نباید تغییر کنند.
- شاخه‌های `main` فقط مبنای انشعاب بوده‌اند؛ تغییرات این فاز فقط روی شاخه کاری انجام می‌شوند.

### معماری موجود Frontend
- `js/core/api.js`: API client فعلی PMS؛ `API_BASE_URL` از `window.PMS_API_BASE_URL` می‌آید و token فعلی با `pms_api_token`/حافظه مدیریت می‌شود. افزونه Word کلاینت مستقل است و token را فقط در حافظه task pane نگه می‌دارد.
- `js/modules/print-designer.js`: ماژول موجود کتابخانه قالب، منبع داده، binding و خروجی؛ از `PMS.Api` استفاده می‌کند.
- `pages/print-designer.html`: رابط فعلی Print Designer.
- `index.html`: نقطه بارگذاری assetها و cache-busting فرانت‌اند.
- قالب‌ساز موجود و مسیرهای آن حفظ می‌شوند؛ افزونه Word کلاینت Office جداگانه است و نباید مسیر چاپ فعلی را حذف یا جایگزین کند.

### قرارداد Backend موجود که افزونه مصرف می‌کند
- `POST /auth/login`: ورودی دقیق `{username,password}`؛ پاسخ موفق `Response.success({token,expiresAt,user})` و توکن در `data.token`.
- `GET /projects`: فهرست پروژه با کنترل دسترسی سرور؛ مجوزهای لازم `PROJECT_VIEW` یا `PROJECT_CREATE`.
- `GET /projects/:id`: دریافت جزئیات پروژه با کنترل دسترسی و محدودیت Tenant.
- `POST /auth/logout`: ابطال نشست فعلی.
- `Response.js`: پاسخ استاندارد خطا در `error.message` و پاسخ موفق در `data`.
- `Router.js` و `AuthService.js` بازبینی شدند؛ قرارداد ورود و مسیرهای پروژه با کلاینت MVP منطبق‌اند.
- درخواست‌های فعلی PMS از `js/core/api.js` عبور می‌کنند؛ افزونه Word کلاینت مستقل دارد و مجوز/tenant را به Backend واگذار می‌کند.

### تصمیم‌ها و محدودیت‌های طراحی
- Office.js Add-in با manifest مشترک برای Word Desktop و Word Online؛ حداقل نیازمندی WordApi 1.1.
- قالب DOCX توسط Product Owner در Word طراحی می‌شود؛ محل داده با Content Controls و Tagهای پایدار مشخص می‌شود.
- پنل افزونه امکان جستجو و انتخاب پروژه از فهرست مجاز را فراهم می‌کند.
- عملیات درج داده متن را در Content Control هدف جایگزین می‌کند؛ قالب اصلی و دیتابیس تغییر نمی‌کنند.
- token در سند، localStorage یا کد ثابت ذخیره نمی‌شود؛ token در حافظه task pane است و برای API در query parameter ارسال می‌شود، مطابق قرارداد فعلی Backend. این روش به دلیل قرار گرفتن token در URL یک ریسک باقی‌مانده است و قبل از تأیید امنیتی/تست واقعی نباید به‌عنوان راهکار امنیتی نهایی پذیرفته شود.
- HTTPS در Manifest تنظیم شده؛ دسترسی عمومی GitHub Pages و CORS/redirect پاسخ GAS در محیط Word هنوز از بیرون تأیید نشده‌اند.
- سازگاری Word Desktop/Online باید با تست واقعی ثابت شود؛ جدول‌های پویا و تصاویر در Task 3 هستند.

## 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** بررسی مخازن عملیاتی، اسناد فاز قبلی، Print Designer موجود و APIهای پروژه/قالب؛ تعریف معماری افزونه مشترک Word.
  - *Log:* فایل‌های `js/core/api.js`, `js/modules/print-designer.js`, `pages/print-designer.html`, `index.html` بررسی شدند. Print Designer فعلی و bindingهایش حفظ می‌شود و افزونه Word به‌عنوان کلاینت Office مستقل تعریف شد.
- [ ] **Task 2 — Word Add-in MVP (IN PROGRESS):** تکمیل روش احراز هویت و ارتباط امن با Backend؛ نمایش/جستجوی پروژه‌های مجاز؛ درج فیلدهای ساده در Content Controls؛ تأیید میزبانی HTTPS و تست واقعی Word Desktop/Online.
  - *Log:* فایل‌های `word-addin/manifest.xml`, `word-addin/taskpane.html`, `word-addin/taskpane.css`, `word-addin/taskpane.js`, `word-addin/README.md` و Workflow `.github/workflows/word-addin-check.yml` اضافه شدند. افزونه Office.js/WordApi 1.1، ورود از `POST /auth/login`، دریافت فهرست از `GET /projects` و جزئیات از `GET /projects/:id`، جستجوی محلی و جایگذاری Tagهای `PROJECT_NAME`, `PROJECT_CODE`, `TOTAL_QUANTITY`, `PROJECT_DESCRIPTION`, `PROJECT_STATUS`, `PROJECT_ID` را پیاده می‌کند. قرارداد `AuthService.login`, `Router.get/post` و `Response.success/error` بازبینی شد و با payload/response کلاینت تطبیق دارد. خطاهای استاندارد با `response.error.message` نمایش داده می‌شوند. رمز پس از ورود پاک می‌شود؛ token فقط در حافظه task pane است و در localStorage یا سند ذخیره نمی‌شود. کنترل‌های خودکار روی commit `f27f0f7eb7c98609079f54bb790aef4195c57e35` اجرا شدند: Word Add-in Checks Run `42511538519` موفق؛ Frontend checks Run `42511538513` موفق؛ Cross-repository QA Run `42511538408` موفق. PMS comprehensive UI performance audit Run `42511538404` هنگام بررسی هنوز در حال اجرا بود. وضعیت PR #67 باز، Draft و mergeable است. Backend PR #39 فقط TODO5 را تغییر می‌دهد و هیچ runtime/database change ندارد. آزمون مرورگر/Office.js در Word واقعی، CORS و redirect سرویس GAS، دسترسی عمومی GitHub Pages و رفتار توکن در URL هنوز تأیید نشده‌اند؛ بنابراین Task 2 باز می‌ماند و هیچ merge یا deployment انجام نمی‌شود.
- [ ] **Task 3 — داده‌های پیچیده و قالب‌بندی:** جدول‌های چندردیفی، تصاویر، فیلدهای اطلاعات مرکزی و پاسخ فرم؛ حفظ قالب اصلی و نسخه کاری؛ تست RTL و صفحه‌بندی در هر دو Word.
- [ ] **Task 4 — آزمون یکپارچه و تحویل:** تست ویندوز و آنلاین، API، مجوز، tenant isolation، token، سازگاری و رگرسیون؛ مستندات نصب/استفاده و دستور تست کاربر. انتشار نهایی پس از تأیید جداگانه.
