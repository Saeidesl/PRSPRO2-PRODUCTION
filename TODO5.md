## 🎯 Current Objective
افزودن امکان «ایجاد پروژه جدید» به صفحه رویدادها با استفاده از فرم و مسیر عملیاتی موجود؛ پس از ثبت موفق، نمایش پروژه در صف مناسب، فوکوس خودکار روی کارت و دکمه «ثبت رویداد» و راهنمای بصری ملایم. کاربر مجاز باید بتواند بدون جابه‌جایی صفحه، ایجاد پروژه و ثبت اولین رویداد را پشت سر هم انجام دهد.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
### مخازن و شاخه
- Frontend عملیاتی: `Saeidesl/PRSPRO2-PRODUCTION`؛ شاخه فاز: `feature/events-create-project-flow-20261112`؛ مبنا: `main` با آخرین commit بررسی‌شده `4f258bf4a1e1957b9ea31702fbda890c4c9e7ce1`.
- Backend عملیاتی: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`؛ شاخه فاز: `feature/events-create-project-flow-20261112`؛ مبنا: `main` با آخرین commit بررسی‌شده `2902eaae4cc7f563799deb58a0b371cf190297c8`.
- شاخه feature در هر دو مخزن از `main` ساخته شده است؛ هیچ تغییر مستقیمی روی `main` انجام نمی‌شود.
- Frontend: HTML/CSS/JavaScript؛ Backend: Google Apps Script V8 + Google Sheets؛ درخواست‌ها از `PMS.Api` و مسیریابی سرور از `Router.js`.

### Frontend — مسیرهای واقعی کشف‌شده
- `pages/events.html`: میزبان صفحه مرکز عملیات رویدادها؛ header دارای `.page-header-actions`؛ مسیرهای ورود `.event-entry-grid`؛ صف‌های پروژه با شناسه‌های `event-queue-pending`, `event-queue-progress`, `event-queue-completed`.
- `css/events.css`: استایل صفحه رویداد، دکمه‌های ورود، کارت‌های صف و breakpointهای موبایل؛ محل افزودن استایل کارت/دکمه تازه‌ساخته‌شده و رعایت `prefers-reduced-motion`.
- `js/modules/events.js`:
  - `Events.init()`: مجوزهای `EVENT_CREATE`, `PROJECT_VIEW`, `PROJECT_CREATE` و بارگذاری داده.
  - `Events.bindEvents()`: delegated click handler برای دکمه‌های صفحه؛ مسیر فعلی `.event-queue-register-button` شناسه پروژه را به `preselectedProjectId` منتقل و `openForm()` را اجرا می‌کند.
  - `Events.load()`: داده رویداد، پروژه‌ها و انواع رویداد را با `PMS.Api.getCached` و cache مشترک بارگذاری می‌کند؛ پروژه‌ها از `GET /projects?view=event-picker` با کلید `PROJECTS_CACHE_KEY + '_event_picker'` می‌آیند.
  - `Events.renderProjectQueues()`: پروژه‌ها را در صف‌های pending/progress/completed رندر می‌کند؛ پروژه بدون رویداد مرتبط در صف pending قرار می‌گیرد؛ دکمه ثبت رویداد با کلاس `.event-queue-register-button` ساخته می‌شود.
  - `Events.activateQueue(key)`: تب و panel صف را فعال می‌کند.
  - `Events.openForm()`: فرم موجود رویداد را باز می‌کند و با `preselectedProjectId` پروژه را از قبل انتخاب می‌کند.
- `js/modules/projects.js`:
  - `Projects.openCreateForm(editProject, options)`: فرم مشترک و عملیاتی ایجاد/ویرایش را می‌سازد؛ در حالت ایجاد `editProject` خالی است؛ lookupها، گردش‌کار و قوانین فعلی را بارگذاری می‌کند.
  - `Projects.createProject(modal)`: اعتبارسنجی فعلی، payload و `POST /projects`، پردازش انتقال اطلاعات مرجع در صورت نیاز، بستن modal، پیام موفقیت و refresh فهرست پروژه را انجام می‌دهد.
  - `Projects.invalidateProjectDataCaches()`: cacheهای وابسته به پروژه را پس از ثبت موفق invalid می‌کند؛ ارتباط با `PMS.Events.projectOptionsToken` برای بی‌اعتبارسازی projection صفحه رویداد حفظ شود.
  - فرم ایجاد اخیر فقط چهار ورودی اصلی دارد؛ منطق فرم ویرایش/تکمیل پیش‌نویس نباید تحت تأثیر قرار گیرد.
- `index.html`: بارگذاری `css/events.css`, `js/modules/projects.js` و `js/modules/events.js`؛ پس از تغییر assetها cache-busting باید به‌روزرسانی شود.
- تست موجود `tests/event-project-picker-performance.test.js`: قرارداد cache و projection انتخاب پروژه را کنترل می‌کند؛ تست‌های رگرسیون جدید در کنار آن افزوده شوند.

### Backend — مسیرها و قراردادهای واقعی کشف‌شده
- `Router.js`: `POST /projects` با مجوز `PROJECT_CREATE` به `ProjectService.create(body, params)` متصل است؛ فهرست پروژه‌ها و view انتخاب پروژه در مسیرهای موجود مدیریت می‌شود.
- `ProjectService.js`: `create(project, params)` قواعد tenant، یکتایی کد، گردش‌کار فعال/منتشرشده و مرحله اول، واحدهای مجاز، Audit و اعلان را اجرا می‌کند؛ فهرست view=event-picker داده لازم برای صفحه رویداد را برمی‌گرداند.
- `ProjectValidator.js`: اعتبارسنجی ساخت پروژه و قواعد ACTIVE؛ بدون نیاز به تغییر برای این قابلیت.
- شیت `08_Projects`: ذخیره‌سازی پروژه؛ هیچ ستون، migration یا تغییر داده‌ای برای این قابلیت لازم نیست.
- قراردادهای مورد استفاده و بدون تغییر: `POST /projects`, `GET /projects?view=event-picker`, `GET /events`, `GET /event-types`.
- تصمیم Discovery: قابلیت باید با همان فرم و API موجود پیاده شود؛ تغییر Backend runtime یا Google Sheets در baseline لازم نیست. در صورت کشف نیاز واقعی، پیش از تغییر، قرارداد موجود بازبینی خواهد شد.

### اصول اجرا و اعتبارسنجی
- فقط دو مخزن عملیاتی مجاز و شاخه feature فوق؛ عدم تغییر مخازن توسعه و عدم push/merge به `main` بدون تأیید.
- دکمه ایجاد پروژه فقط برای دارنده `PROJECT_CREATE` نمایش داده شود؛ ثبت رویداد همچنان تابع `EVENT_CREATE` و کنترل مجوز Backend باقی بماند.
- callback تکمیل ایجاد باید فقط پس از ثبت کامل پروژه و عملیات وابسته موفق اجرا شود؛ خطای refresh/focus نباید نتیجه ثبت پروژه را به‌اشتباه ناموفق جلوه دهد.
- refresh صف باید cache مشترک را رعایت کند و از GETهای غیرضروری/تکراری جلوگیری کند.
- فوکوس خودکار باید کارت تازه‌ساخته‌شده و دکمه ثبت رویداد را در صف درست پیدا کند؛ وضعیت فیلتر/تب و دسترسی‌ها بررسی شود.
- انیمیشن کوتاه، کم‌تحرک، سازگار با تم روشن/تاریک و `prefers-reduced-motion` باشد.
- فرم ویرایش پروژه، ثبت رویداد، ثبت مستقل، فرم‌های پویا، cache و permissionهای موجود نباید regression داشته باشند.

## 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** بررسی TODO5 و ARCHITECTURE هر دو مخزن، شاخه‌ها و commitهای مبنا؛ ردیابی فرم ایجاد، صف پروژه‌ها، مسیر ثبت رویداد، cache، مجوزها و قراردادهای Backend.
  - *Log:* Frontend: `pages/events.html`, `css/events.css`, `js/modules/events.js` (`init`, `bindEvents`, `load`, `renderProjectQueues`, `activateQueue`, `openForm`), `js/modules/projects.js` (`openCreateForm`, `createProject`, `invalidateProjectDataCaches`), `index.html`, تست `tests/event-project-picker-performance.test.js`. Backend: `Router.js`, `ProjectService.js`, `ProjectValidator.js`, Sheet `08_Projects`. مبنا: FE `4f258bf4a1e1957b9ea31702fbda890c4c9e7ce1` و BE `2902eaae4cc7f563799deb58a0b371cf190297c8`. قراردادهای `POST /projects` و `GET /projects?view=event-picker` موجودند؛ تغییر Backend/DB در baseline لازم نیست.
- [x] **Task 2 — اتصال فرم ایجاد پروژه موجود به صفحه رویدادها:** دکمه مستقل ایجاد پروژه با کنترل مجوز `PROJECT_CREATE` اضافه شد و فرم موجود پروژه از همان ماژول فراخوانی می‌شود.
  - *Log:* `pages/events.html` — دکمه `#events-create-project-button` در header صفحه رویدادها اضافه شد؛ `js/modules/events.js` — `Events.init()` مجوز `PROJECT_CREATE` را مستقل از `EVENT_CREATE` بررسی و دکمه را نمایش/مخفی می‌کند؛ `Events.bindEvents()` کلیک را به `PMS.Modules.Projects.openCreateForm()` هدایت می‌کند. `index.html` — cache-busting ماژول رویدادها به `20261112-events-create-project-entry-1` تغییر کرد. تست `tests/events-create-project-entry.test.js` افزوده شد. بررسی parse هر دو ماژول JS و کنترل‌های ایستای دکمه، permission، فراخوانی فرم موجود و عدم ایجاد API موازی موفق بود. PR فرانت‌اند #114 باز است و هنوز merge/deploy نشده است.
- [ ] **Task 3 — نمایش، فوکوس و راهنمای بصری پروژه تازه‌ساخته‌شده (IN PROGRESS):** refresh هدفمند داده پروژه در Events؛ قرار دادن پروژه در صف مناسب؛ scroll/focus کارت و دکمه ثبت رویداد؛ انیمیشن ملایم با پشتیبانی reduced-motion و تم‌ها.
- [ ] **Task 4 — Regression, Integration & Handoff:** اجرای تست‌های Frontend و QA بین‌مخزنی؛ بررسی permission، قرارداد API، cache، ثبت پروژه/رویداد و موبایل؛ تحویل برای تست زنده Product Owner. Backend runtime و DB فقط در صورت اثبات نیاز تغییر می‌کنند.
