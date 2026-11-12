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

### Task 2 — Shared Cache و حفظ وضعیت صفحات [x]
- تکمیل رفتار cache موجود به‌جای ساخت سیستم موازی.
- پیشرفت پیاده‌سازی:
  - `js/core/api.js`: گزینه `refreshCached: false` اضافه شد؛ در cache hit معتبر، تابع بدون اجرای `Api.get` داده را فوری برمی‌گرداند. در cache miss/expiry مسیر GET فعلی و ذخیره TTL حفظ می‌شود؛ رفتار پیش‌فرض سایر مصرف‌کنندگان تغییر نکرده است.
  - `js/modules/projects.js`: فهرست پروژه با TTL سی‌ثانیه و lookup وضعیت‌ها با TTL شصت‌ثانیه cache-first شدند.
  - `js/modules/events.js`: فهرست رویداد با TTL پانزده‌ثانیه، انواع رویداد با TTL شصت‌ثانیه و `/projects?view=event-picker` با cache مستقل سی‌ثانیه‌ای cache-first شدند. نتیجه picker cache‌شده نیز پس از دریافت render می‌شود و cache آن پس از ثبت رویداد invalid می‌شود.
  - `js/modules/attachments.js`: فهرست `GET /attachments` با TTL شصت‌ثانیه از همان `Api.getCached` دریافت می‌شود؛ پس از upload، invalidation فعلی باعث fetch تازه خواهد شد.
  - `index.html`: cache-busting چهار ماژول تغییرکرده به‌روزرسانی شد.
  - تست‌های `tests/shared-page-cache.test.js` و `tests/event-project-picker-performance.test.js` اضافه/اصلاح شدند؛ CI نهایی Frontend، agent suite، cross-repository QA و UI/performance audit روی commit `cd0ced0ef52ba34ac06fbadddca0fc04f697790c` موفق شدند.
  - PR فرانت‌اند #104 با squash merge در `main` ادغام شد (merge commit `833e3a1ebb1e7e9965fa784d390dbb01763c67dc`) و GitHub Pages deployment run `43184842781` و Pages build run `43184842894` موفق شدند.
- تعریف سیاست cache hit بدون درخواست شبکه در navigation عادی، TTL کنترل‌شده، refresh پس‌زمینه فقط در موعد لازم و force refresh دستی.
- یکپارچه‌سازی کلید و query برای `/projects` و `/projects?view=event-picker` بدون اشتراک پاسخ‌های ناسازگار.
- انتقال ماژول فایل‌ها به الگوی مشترک cache و حذف GET تکراری در ورود مجدد.
- بررسی lifecycle و state preservation در Router برای حفظ فیلتر/جستجو/مرتب‌سازی/تب/scroll؛ جلوگیری از duplicate listeners و پاسخ‌های async منسوخ.
- ایزوله‌سازی داده cache بر اساس نشست/کاربر و پاک‌سازی امن هنگام logout، auth-expired و تغییر token.
- حفظ APIها، permissions، فرم‌ها، ثبت رویداد، upload/delete و رفتار موبایل.

- *Log:* پس از تأیید تست زنده Product Owner، Task 2 تکمیل شد. در Frontend فایل‌های `js/core/api.js` (گزینه `refreshCached:false` در `Api.getCached` برای cache hit بدون GET پس‌زمینه)، `js/modules/projects.js` (cache-first فهرست پروژه و lookup وضعیت‌ها)، `js/modules/events.js` (cache-first رویدادها، انواع رویداد و `/projects?view=event-picker`)، `js/modules/attachments.js` (cache-first فهرست پیوست‌ها)، `js/core/router.js` (ذخیره و بازیابی جستجو، فیلتر، مرتب‌سازی، تب، وضعیت پنل و موقعیت اسکرول؛ پاک‌سازی snapshot در reset نشست) و `index.html` (cache-busting assetها) تغییر کردند. تست‌های `tests/shared-page-cache.test.js` و `tests/event-project-picker-performance.test.js` و تست‌های رگرسیون وابسته به asset/API به‌روزرسانی شدند. Frontend PR #104 با روش squash در `main` ادغام شد؛ merge commit: `833e3a1ebb1e7e9965fa784d390dbb01763c67dc`. Frontend GitHub Pages deployment run `43183779308` با نتیجه success منتشر شد؛ URL: `https://saeidesl.github.io/PRSPRO2-PRODUCTION/`. تست‌های خودکار Frontend، Cross-Repository QA، Browser Regression و UI/Performance Audit موفق شدند. Product Owner جابه‌جایی بین صفحات پروژه‌ها/رویدادها/فایل‌ها و حفظ state را در نسخه زنده تست و موفق تأیید کرد. Backend runtime، API contract، permissions، Google Sheets schema و داده‌های عملیاتی تغییر نکردند.

### Task 3 — Invalidation هدفمند، آزمون و تحویل [x]
- وضعیت نهایی: تغییرات تکمیلی invalidation در Frontend PR #105 با روش Squash در شاخه عملیاتی `main` ادغام شد؛ merge commit: `c441965b92364733ac98d1c64aca3eebbbc5a41e`.
- شاخه کاری: `feat/shared-page-cache-invalidation`؛ head بررسی‌شده: `9dac8c5d1422f2086b2ea6ef4aea310e7f4c6c1e`.
- *Log:* در `js/modules/projects.js`، توابع invalidation پروژه برای پاک‌سازی metadata کارت پروژه و cache اختصاصی پیوست‌های `project_attachments_<id>` تکمیل شدند؛ invalidation ایجاد/ویرایش/تنظیمات پروژه فقط پس از پاسخ موفق API اجرا می‌شود. در `js/modules/attachments.js`، پس از upload پیوست رویداد cacheهای `PMS.Cache.keys.EVENTS` و `PMS.Cache.keys.DASHBOARD` باطل می‌شوند و برای پیوست پروژه helper `invalidateProjectCardAttachmentMetadata(entityId)` اجرا می‌شود. در `js/modules/project-detail.js`، پس از upload فایل از فرم جزئیات پروژه همان helper فراخوانی می‌شود. مسیر حذف پیوست پروژه نیز cache جزئیات پیوست همان پروژه را پاک می‌کند. در `index.html` نسخه assetهای ماژول‌های projects، attachments و project-detail به‌روزرسانی شد. تست‌های `tests/shared-page-cache.test.js` برای invalidation ایجاد/ویرایش/تنظیمات پروژه، upload پیوست پروژه، upload پیوست رویداد، invalidation رویداد پس از submit و حذف پیوست پروژه اضافه/اصلاح شدند؛ assertionهای نسخه asset در تست‌های رگرسیون وابسته نیز به‌روزرسانی شدند. PR #105 شامل ۱۲ فایل و ۱۴ commit بود و با Squash در `main` ادغام شد. تمام بررسی‌های CI روی head PR موفق شدند: Frontend checks، cross-repository QA، frontend agent suite، print designer regression، browser audit و UI/performance audit. پس از ادغام، Frontend checks، cross-repository QA، print designer regression و frontend agent suite همگی موفق شدند. GitHub Pages Publish run `43188981314` و Pages build/deployment run `43188980054` با نتیجه success تکمیل شدند. Product Owner چهار سناریوی زنده upload فایل پروژه، اتصال فایل به رویداد، ویرایش پروژه و حذف پیوست را تست و موفقیت را تأیید کرد. Backend runtime، API contract، permissions، Google Sheets schema و داده‌های عملیاتی تغییر نکردند.


