## 🎯 Current Objective
تکمیل جریان ایجاد پروژه از صفحه رویدادها با استفاده از فرم و مسیر عملیاتی موجود؛ نمایش پروژه در صف مناسب، فوکوس روی اقدام بعدی و نمایش همان انیمیشن پیشرفت ثبت پروژه که در صفحه پروژه‌ها استفاده می‌شود. کاربر باید بتواند بدون جابه‌جایی صفحه، ایجاد پروژه و ثبت اولین رویداد را انجام دهد.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
### مخازن و شاخه
- Frontend عملیاتی: `Saeidesl/PRSPRO2-PRODUCTION`؛ شاخه نهایی: `main`؛ merge commit قابلیت `5b5cf7b370d82e1bdb57b675ed6b96f075564267`؛ آخرین HEAD مشاهده‌شده پس از گزارش ممیزی: `7a30eb4e76d4d2e79c0e1319360e6e0b2130cbd1`.
- Backend عملیاتی: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`؛ شاخه فعال `main`؛ آخرین commit بررسی‌شده `2902eaae4cc7f563799deb58a0b371cf190297c8`؛ این تسک صرفاً Frontend است و تغییری در Backend پیش‌بینی نمی‌شود.
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
  - `Projects.openCreateForm(editProject, options)`: فرم مشترک و عملیاتی ایجاد/ویرایش را می‌سازد؛ در حالت ایجاد `editProject` خالی است؛ lookupها، گردش‌کار و قوانین فعلی را بارگذاری می‌کند. این مسیر از صفحه رویدادها نیز فراخوانی می‌شود، بدون آنکه `Projects.init()` اجرا شده باشد.
  - `Projects.ensureProjectStyles()`: استایل‌های کارت پروژه و progress modal را به‌صورت idempotent در DOM تزریق می‌کند؛ پیش‌تر فقط از `Projects.init()` فراخوانی می‌شد، بنابراین فرم مشترک در صفحه رویدادها می‌توانست progress markup را بدون CSS اختصاصی نمایش دهد. اصلاح فعلی این تابع را در ابتدای `openCreateForm()` نیز اجرا می‌کند.
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
  - *Log:* `pages/events.html` — دکمه `#events-create-project-button` در header صفحه رویدادها اضافه شد؛ `js/modules/events.js` — `Events.init()` مجوز `PROJECT_CREATE` را مستقل از `EVENT_CREATE` بررسی و دکمه را نمایش/مخفی می‌کند؛ `Events.bindEvents()` کلیک را به `PMS.Modules.Projects.openCreateForm()` هدایت می‌کند. `index.html` — cache-busting ماژول رویدادها به `20261112-events-create-project-entry-1` تغییر کرد. تست `tests/events-create-project-entry.test.js` افزوده شد. PR #114 با squash در `main` ادغام شد؛ merge commit `525229f6df40a4eeb548f2c35a97a6310d799b5e`.
- [x] **Task 3 — نمایش، فوکوس و راهنمای بصری پروژه تازه‌ساخته‌شده:** refresh هدفمند داده پروژه در Events؛ قرار دادن پروژه در صف مناسب؛ scroll/focus کارت و دکمه ثبت رویداد؛ انیمیشن ملایم با پشتیبانی reduced-motion و تم‌ها.
  - *Log:* `js/modules/projects.js` — گزینه `onCreated` فقط برای فرم ایجاد ذخیره و پس از ثبت موفق پروژه و پایان انتقال اطلاعات مرجع، بعد از بستن modal اجرا می‌شود؛ خطای callback نتیجه موفق ثبت پروژه را تغییر نمی‌دهد. `js/modules/events.js` — `Events.handleCreatedProject(project)` کلید مشترک `PROJECTS_CACHE_KEY + '_event_picker'` را invalidate و یک بار با `PMS.Api.getFresh('/projects', ..., {query:{view:'event-picker'}})` تازه‌سازی می‌کند؛ سپس صف‌ها را با منطق فعلی رندر، صف واقعی پروژه را فعال، کارت را scroll و دکمه موجود ثبت رویداد را focus می‌کند؛ در خطای GET، پروژه ثبت‌شده به‌صورت fallback محلی نمایش داده می‌شود. `css/events.css` — برجسته‌سازی کارت و اقدام بعدی با انیمیشن کوتاه و پشتیبانی `prefers-reduced-motion`. `index.html` — cache-busting نسخه CSS/JS. تست رگرسیون `tests/events-create-project-followup.test.js` افزوده شد. Product Owner در 2026-11-12 نمایش پروژه در صف صحیح، فوکوس کارت و دکمه ثبت رویداد و ادامه ثبت رویداد بدون خروج از صفحه را تأیید کرد.
- [x] **Task 4 — Regression, Integration & Handoff:** اجرای تست‌های Frontend و QA بین‌مخزنی؛ بررسی permission، قرارداد API، cache، ثبت پروژه/رویداد و موبایل؛ تحویل برای تست زنده Product Owner. Backend runtime و DB فقط در صورت اثبات نیاز تغییر می‌کنند.
  - *Log:* اجرای اولیه `Frontend checks` روی SHA میانی `7420abdcb6fa26d64c1305ae5115948706b1687c` تعداد ۹ شکست نشان داد: ۸ مورد به assertionهای cache-busting قدیمی در تست‌های موجود و یک مورد به escape نادرست assertion تست reduced-motion مربوط بود. نسخه‌های تست به assetهای جدید هماهنگ و assertion جدید اصلاح شد؛ این اصلاحات روی شاخه فعلی اعمال شده‌اند. `PMS cross-repository QA` و `PMS frontend agent suite` روی SHA نهایی موفق شدند؛ `Frontend checks` و انتشار GitHub Pages نیز پس از ادغام موفق بودند. Product Owner تست زنده جریان ایجاد پروژه و ورود به ثبت اولین رویداد را در 2026-11-12 تأیید کرد. پذیرش Task 3 و Task 4 با تأیید کاربر ثبت شد.

- [x] **Task 5 — یکسان‌سازی انیمیشن پیشرفت ثبت پروژه در صفحه رویدادها:** هنگام باز کردن فرم مشترک پروژه از صفحه رویدادها، همان progress animation صفحه پروژه‌ها باید بدون ساخت UI موازی نمایش داده شود.
  - *Log:* کشف شد `Projects.ensureProjectStyles()` استایل‌های `.project-create-progress`، spinner، track و `prefers-reduced-motion` را تزریق می‌کند، اما پیش از این فقط در `Projects.init()` فراخوانی می‌شد؛ Router در صفحه رویدادها فقط ماژول Events را initialize می‌کند. در شاخه `feat/events-project-create-progress-final-20261112`، فراخوانی idempotent `this.ensureProjectStyles()` به ابتدای `Projects.openCreateForm()` اضافه شد؛ `index.html` cache key ماژول Projects به `20261112-project-create-progress-1` تغییر کرد؛ تست جدید `tests/events-project-create-progress.test.js` برای بارگذاری استایل پیش از ساخت modal، وجود انیمیشن و reduced-motion اضافه شد. اجرای اولیه Frontend checks دو شکست صرفاً به‌دلیل assertionهای cache-busting قدیمی در `tests/project-created-at-datetime.test.js` و `tests/project-draft-information-flow.test.js` نشان داد؛ هر دو assertion به cache key جدید هماهنگ شدند. اجرای نهایی روی SHA `77bc032902433f4138e84f10935439daaeac71c8` موفق شد: Frontend checks (run `43284066480`)، Cross-repository QA (run `43284066531`)، Frontend Agent Suite (run `43284066472`) و Comprehensive UI Performance Audit (run `43284066522`) همگی success؛ تست‌های مرورگر modal و تقویم نیز موفق. گزارش ممیزی به artifact `pms-ui-performance-audit-661` پیوست شده است. PR #119 با squash در `main` ادغام شد؛ merge commit: `5b5cf7b370d82e1bdb57b675ed6b96f075564267`. پس از ادغام، workflow انتشار Frontend به GitHub Pages با run `43296139497` و Pages build/deployment با run `43296137639` هر دو success شدند؛ Frontend checks (`43296139482`)، PMS frontend agent suite (`43296139466`) و PMS cross-repository QA (`43296139443`) نیز success شدند. Backend و Google Sheets تغییری نداشتند و انتشار Backend لازم نبود. Product Owner در 2026-11-12 تست نسخه عملیاتی را موفق اعلام کرد: انیمیشن پیشرفت در فرم ایجاد پروژه از صفحه رویدادها همانند صفحه پروژه‌ها نمایش داده شد. Task 5 پذیرفته و بسته شد. Live browser verification مستقل از این محیط انجام نشده است؛ پذیرش عملیاتی بر اساس تست مستقیم Product Owner ثبت می‌شود.
