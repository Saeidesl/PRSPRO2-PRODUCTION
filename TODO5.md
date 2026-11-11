## 🎯 Current Objective

بهینه‌سازی جابه‌جایی بین صفحات «پروژه‌ها»، «رویدادها» و «فایل‌ها» با نمایش فوری داده‌های cache‌شده، جلوگیری از GETهای تکراری و حفظ وضعیت کاربر.

مخزن عملیاتی Frontend: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه `main`.
مخزن عملیاتی Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه `main`.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

### معماری موجود
- Frontend: HTML/CSS/JavaScript؛ برنامه تک‌صفحه‌ای با routeهای hash و جایگزینی محتوای `#page-content`.
- `index.html`: بارگذاری هسته‌ها و ماژول‌های برنامه.
- `js/core/router.js`:
  - `Router.loadPage(page, route)`: fetch فایل HTML صفحه با `cache: 'no-store'`، جایگزینی DOM و init مجدد ماژول.
  - `Router.executePageScripts(container)`: اجرای scriptهای صفحه.
  - `Router.initPageModule(page)`: اجرای init ماژول متناظر.
  - `Router.navigate(route, replace)`: هدایت route.
- `js/core/api.js`:
  - `Api.request(method,path,options)`: توکن، query، خطا، retry و diagnostics.
  - `Api.get(path,options)`: dedup درخواست GET هم‌زمان با کلید مبتنی بر token/path/query/options؛ پس از اتمام درخواست cache نتیجه را نگه نمی‌دارد.
  - `Api.getCached(path,cacheKey,options)`: cache را فوری برمی‌گرداند و در همان فراخوانی GET پس‌زمینه را نیز شروع می‌کند؛ `cacheTtl` برای ورودی‌های قدیمی بدون expiry کنترل دارد.
  - `Api.getFresh()`, `getCachedData()`, `invalidate()`, `invalidateMany()`.
- `js/core/cache.js`:
  - `PMS.Cache.set/get/getMeta/has/remove/clear/clearExpired`.
  - ذخیره‌سازی با `localStorage` و پیشوند `PMS_CACHE_`؛ هر ورودی شامل version، data، cachedAt و expiresAt است.
  - TTL اختیاری است؛ ورودی بدون TTL منقضی نمی‌شود.
- `js/modules/projects.js`:
  - `Projects.init()`: اتصال رویدادها و شروع بارگذاری پروژه/وضعیت‌ها.
  - `Projects.loadProjects()`: `GET /projects` از طریق `getCached` و رندر فوری cache؛ callback تازه‌سازی پس‌زمینه دوباره رندر می‌کند.
  - `loadProjectStatuses()`: `GET /project-dashboard/lookups`.
  - `loadStageLookups()`: `GET /workflows/:workflowId/steps` و نگهداری lookup مراحل.
- `js/modules/events.js`:
  - `Events.init()`: اتصال event handlerها و آغاز بارگذاری.
  - `/events` با `getCached` و TTL برابر 15000ms.
  - `/event-types` با `getCached` و TTL برابر 60000ms.
  - `/projects?view=event-picker` در وضعیت فعلی با `Api.get` مستقیم دریافت می‌شود؛ `PROJECTS_CACHE_KEY` تعریف شده اما در این مسیر reuse نمی‌شود.
  - `reloadEvents()` پس از ثبت رویداد از `getFresh('/events', CACHE_KEY)` استفاده می‌کند.
  - cacheهای وابسته فرم/Workflow در Mapهای درون‌حافظه‌ای با TTL و request dedup نگهداری می‌شوند.
- `js/modules/attachments.js`:
  - `Attachments.init()`، `load()` و `render()`.
  - `load()` داده cache‌شده را ابتدا render می‌کند، اما سپس در هر init مستقیماً `Api.get('/attachments')` اجرا و cache را بازنویسی می‌کند.
- `js/modules/project-images.js`: پنل فایل پروژه؛ پس از upload/delete تابع invalidation موجود را فراخوانی می‌کند.
- صفحات:
  - `pages/projects.html`
  - `pages/events.html`
  - `pages/attachments.html`
- Backend مصرف‌شده:
  - `GET /projects`, `GET /projects?view=event-picker`, `GET /events`, `GET /event-types`, `GET /attachments`
  - `POST /projects`, `PUT /projects/:id`, `POST /events`, `POST /projects/:projectId/attachments`, `DELETE /attachments/:attachmentId`
- داده‌های اصلی در Backend:
  - پروژه‌ها: `08_Projects`
  - پیوست‌ها: `15_Attachments` و فایل باینری در Google Drive
  - اطلاعات مرکزی پروژه: `30_ProjectInformation` و تاریخچه `31_ProjectInformationHistory`
  - رویدادها و snapshot فرم‌ها از سرویس‌ها و شیت‌های موجود Event/Form؛ schema دقیق قبل از هر تغییر Backend از فایل‌های جاری استخراج شود.
- قیود امنیت/سازگاری:
  - cache باید از نظر token/user/tenant و query ایزوله شود.
  - logout، `pms:auth-expired` و تغییر نشست باید داده حساس قبلی را پاک/غیرقابل‌دسترسی کنند.
  - cache صرفاً بهینه‌سازی UI است؛ مجوزهای Router و Backend مرجع نهایی‌اند.
  - ثبت/ویرایش باید فقط cacheهای وابسته را invalid کند؛ داده فایل/دانلود و مجوزها نباید دور زده شوند.
  - API و Sheets در اولویت بدون تغییر باقی می‌مانند.

## 📋 Macro-Task Queue & Implementation Log

### Task 1 — Discovery & Planning [x]
- هر دو مخزن عملیاتی و شاخه `main` بررسی شدند؛ `TODO5.md` و `ARCHITECTURE.md` هر دو مخزن خوانده شدند.
- آخرین commitهای بررسی‌شده:
  - Frontend: `ccb96c3851190d8c873920695d728c8e49136f7e`
  - Backend: `1e43c226f3a7d605a8ea402c9acbb6120fca3b11`
- یافته‌ها:
  - Router در هر navigation، HTML صفحه را با `no-store` دوباره دریافت و DOM صفحه قبلی را جایگزین می‌کند؛ ماژول صفحه نیز مجدداً init می‌شود.
  - `Api.getCached` cache را فوری نمایش می‌دهد اما همیشه GET پس‌زمینه را آغاز می‌کند؛ پس حتی navigation عادی نیز به درخواست شبکه منجر می‌شود.
  - صفحه پروژه‌ها از `getCached('/projects', CACHE_KEY)` استفاده می‌کند؛ cache hit مانع refresh شبکه نیست.
  - صفحه رویدادها `/events` را با cache و TTL پانزده ثانیه می‌گیرد، اما `/projects?view=event-picker` را مستقیم و بدون cache مشترک می‌خواند.
  - صفحه فایل‌ها در `Attachments.load()` ابتدا cache را نمایش می‌دهد ولی سپس در هر init، `GET /attachments` مستقیم اجرا می‌کند.
  - `Api.get` فقط درخواست‌های هم‌زمان یکسان را deduplicate می‌کند؛ این رفتار جایگزین cache پایدار نیست.
  - جایگزینی DOM در Router باعث از بین رفتن state کنترل‌های صفحه، فیلترها، تب و scroll می‌شود؛ بازسازی آن باید بدون نگهداری listenerهای تکراری انجام شود.
  - `PMS.Cache` از localStorage استفاده می‌کند و TTL اختیاری دارد؛ جداسازی نشست و پاک‌سازی cacheهای حساس باید در Task 2 به‌طور صریح آزموده شود.
- نتیجه: علت قابل اثبات در Frontend است. در baseline فعلی نیاز قطعی به تغییر Backend، API، Sheet یا migration دیده نشد.
- فایل‌های بررسی‌شده: `index.html`, `pages/projects.html`, `pages/events.html`, `pages/attachments.html`, `js/core/router.js`, `js/core/api.js`, `js/core/cache.js`, `js/modules/projects.js`, `js/modules/events.js`, `js/modules/attachments.js`, `js/modules/project-images.js`.
- Log: Router هر بار DOM را از نو می‌سازد؛ `getCached` در هر بار استفاده refresh می‌کند؛ ماژول رویدادها برای event-picker و ماژول فایل‌ها برای attachments GET مستقیم دارند. Task 1 صرفاً Discovery بود و هیچ فایل runtime تغییر نکرد.

### Task 2 — Shared Cache و حفظ وضعیت صفحات (IN PROGRESS)
- تکمیل رفتار cache موجود به‌جای ساخت سیستم موازی.
- پیشرفت پیاده‌سازی:
  - `js/core/api.js`: گزینه `refreshCached: false` اضافه شد؛ در cache hit معتبر، تابع بدون اجرای `Api.get` داده را فوری برمی‌گرداند. در cache miss/expiry مسیر GET فعلی و ذخیره TTL حفظ می‌شود؛ رفتار پیش‌فرض سایر مصرف‌کنندگان تغییر نکرده است.
  - `js/modules/projects.js`: فهرست پروژه با TTL سی‌ثانیه و lookup وضعیت‌ها با TTL شصت‌ثانیه cache-first شدند.
  - `js/modules/events.js`: فهرست رویداد با TTL پانزده‌ثانیه، انواع رویداد با TTL شصت‌ثانیه و `/projects?view=event-picker` با cache مستقل سی‌ثانیه‌ای cache-first شدند. نتیجه picker cache‌شده نیز پس از دریافت render می‌شود و cache آن پس از ثبت رویداد invalid می‌شود.
  - `js/modules/attachments.js`: فهرست `GET /attachments` با TTL شصت‌ثانیه از همان `Api.getCached` دریافت می‌شود؛ پس از upload، invalidation فعلی باعث fetch تازه خواهد شد.
  - `index.html`: cache-busting چهار ماژول تغییرکرده به‌روزرسانی شد.
  - تست‌های `tests/shared-page-cache.test.js` و `tests/event-project-picker-performance.test.js` اضافه/اصلاح شدند؛ تست‌های CI هنوز در وضعیت queued هستند و نتیجه موفق گزارش نشده است.
  - PR فرانت‌اند #104 به‌صورت Draft ایجاد شده؛ هنوز merge یا deploy انجام نشده است.
- تعریف سیاست cache hit بدون درخواست شبکه در navigation عادی، TTL کنترل‌شده، refresh پس‌زمینه فقط در موعد لازم و force refresh دستی.
- یکپارچه‌سازی کلید و query برای `/projects` و `/projects?view=event-picker` بدون اشتراک پاسخ‌های ناسازگار.
- انتقال ماژول فایل‌ها به الگوی مشترک cache و حذف GET تکراری در ورود مجدد.
- بررسی lifecycle و state preservation در Router برای حفظ فیلتر/جستجو/مرتب‌سازی/تب/scroll؛ جلوگیری از duplicate listeners و پاسخ‌های async منسوخ.
- ایزوله‌سازی داده cache بر اساس نشست/کاربر و پاک‌سازی امن هنگام logout، auth-expired و تغییر token.
- حفظ APIها، permissions، فرم‌ها، ثبت رویداد، upload/delete و رفتار موبایل.

### Task 3 — Invalidation هدفمند، آزمون و تحویل
- پس از create/update project، ثبت event و upload/delete attachment فقط cacheهای وابسته به‌روزرسانی/باطل شوند.
- بررسی همگامی داده در صفحات پروژه، رویداد و فایل و جزئیات پروژه.
- آزمون شبکه: اولین ورود، رفت‌وبرگشت چندباره، عبور TTL، refresh دستی، ثبت/ویرایش هم‌زمان، نشست جدید، خطای شبکه و موبایل.
- اجرای تست‌های موجود و افزودن regression tests برای cache hit، عدم GET غیرضروری، invalidation و state preservation.
- QA بین Backend/Frontend و بررسی permissions، data integrity و عدم رگرسیون؛ ادغام و انتشار طبق گردش عملیاتی و گزارش جداگانه.

