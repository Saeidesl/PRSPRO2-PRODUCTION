## 🎯 Current Objective

افزودن دکمه «رویدادهای ثبت‌شده برای این پروژه» کنار «ثبت رویداد» در صفحه جزئیات پروژه. با کلیک، صفحه موجود رویدادها باز شود و فهرست تاریخچه فقط رویدادهای همان پروژه را نمایش دهد؛ همه رویدادهای مجاز (نه فقط ثبت‌شده توسط کاربر فعلی) دیده شوند. فیلترهای قبلی مزاحم نباشند و مسیر/صفحه/ API موازی ایجاد نشود.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

### مخازن و شاخه‌های عملیاتی
- Frontend: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه `fix/project-event-history-button-permission-20261107`، شاخه از main پس از ادغام قابلیت با مبنای `60c6ff4908d1e22f3a5eacbeb814b1cae8cad708`.
- Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه `feat/project-registered-events-button-20261107`، شاخه از main با مبنای آخرین commit `5838f1ccca5959d87fbdfe8dbb7561ef7414400e`.
- هر دو مخزن عملیاتی، TODO5 و ARCHITECTURE بررسی شدند؛ فاز قبلی مودال پیشرفت ثبت رویداد بسته و TODO5 پاک‌سازی شده بود. مخازن توسعه و main نباید تغییر کنند.

### Frontend — مسیر موجود و نقاط اتصال
- `pages/project-detail.html`: نوار `.page-header-actions` و دکمه فعلی `#project-add-event-button`؛ دکمه جدید باید در همین نوار کنار آن قرار گیرد.
- `js/modules/project-detail.js`: `ProjectDetail.bindEvents()` نقطه اتصال کلیک؛ `ProjectDetail.projectId` شناسه پایدار پروژه؛ `ProjectDetail.load()` و `applyEventDetailsBundle()` بارگذاری bundle موجود پروژه.
- `js/modules/events.js`: صفحه تاریخچه موجود؛ `Events.init()`، `Events.load()`، `renderFilters()`، `applyFilters()` و `clearHistoryFilters()` مسئول بارگذاری، ساخت فیلتر و نمایش فهرست‌اند.
- `Events.applyFilters()` از فیلتر `event-project-filter` استفاده می‌کند، اما scope پیش‌فرض `mine` است؛ ورود از صفحه پروژه باید scope را به `all` تغییر دهد و فیلتر پروژه را بدون وابستگی به وجود option در select اعمال کند.
- `pages/events.html`: فیلترهای تاریخچه در `#events-filter-content` و فهرست در `#events-table-container` قرار دارند. همان UI فعلی استفاده شود.
- `css/events.css`: استایل‌های موجود تاریخچه و کنترل‌ها؛ از کلاس‌های دکمه استاندارد استفاده شود و CSS موازی غیرضروری ساخته نشود.
- `index.html`: cache-busting نسخه فایل‌های تغییرکرده باید به‌روز شود.
- `js/core/api.js`: transport استاندارد `PMS.Api`؛ درخواست جدید لازم نیست.

### Backend و قراردادهای داده
- `GET /events` فهرست مجاز رویدادها را از مسیر فعلی تأمین می‌کند؛ فیلتر پروژه در Frontend با `ProjectID` اعمال می‌شود.
- `GET /projects/:id/details` در صفحه جزئیات پروژه، bundle رویدادهای پروژه را از مسیر موجود می‌دهد؛ این دکمه عمداً از تاریخچه سراسری فعلی استفاده می‌کند تا همان فیلترهای تاریخچه اعمال شوند.
- هیچ تغییر runtime در Backend، endpoint، permission، Sheet، ستون، schema یا migration موردنیاز نیست؛ فقط سازگاری قرارداد بررسی شود.
- داده مرجع: `ProjectID` در رویداد؛ شناسه پروژه از `ProjectDetail.projectId`.

## 📋 Macro-Task Queue & Implementation Log

### Task 1 — Discovery & Planning: بررسی جریان صفحه پروژه و تاریخچه رویدادها [x]
- هر دو مخزن عملیاتی، آخرین commitهای main، TODO5 و ARCHITECTURE بررسی شدند؛ شاخه اختصاصی فاز از main ساخته شد.
- دکمه فعلی ثبت رویداد، مسیر ورود به صفحه `#events`، بارگذاری `GET /events` و منطق فیلتر پروژه/scope بررسی شد.
- تصمیم: پیاده‌سازی Frontend-only با استفاده از فیلتر فعلی؛ Backend بدون تغییر runtime.
- *Log:* FE: `pages/project-detail.html:#project-add-event-button`، `js/modules/project-detail.js:ProjectDetail.bindEvents/load/applyEventDetailsBundle`، `pages/events.html:#events-filter-content/#event-project-filter/#event-history-scope/#events-table-container`، `js/modules/events.js:Events.init/load/renderFilters/applyFilters/clearHistoryFilters`، `index.html` و تست `tests/event-history-project-cards.test.js`. BE: `Router.js` و قرارداد `GET /events`؛ هیچ endpoint یا ساختار داده جدید لازم نیست. مبنای شاخه‌ها: FE `1126b6be3908ae0ddf590747586b78c53bbeb53f`، BE `5838f1ccca5959d87fbdfe8dbb7561ef7414400e`.

### Task 2 — پیاده‌سازی دکمه و فیلتر مستقیم تاریخچه پروژه [x]
- افزودن دکمه کنار «ثبت رویداد» با رعایت مجوز مشاهده رویدادها.
- انتقال شناسه پروژه به صفحه موجود رویدادها و اعمال فیلتر اجباری ProjectID؛ scope برابر all و پاک‌سازی فیلترهای قبلی.
- بازکردن بخش فیلترها/نمایش تاریخچه و حفظ امکان پاک‌کردن فیلتر برای بازگشت به فهرست عادی.
- عدم تغییر Backend runtime و حفظ مسیر ثبت رویداد فعلی.
- *Log:* `pages/project-detail.html`: افزودن `#project-view-events-button` کنار `#project-add-event-button`. `js/modules/project-detail.js:ProjectDetail.bindEvents`: کنترل مجوز `EVENT_VIEW`/ادمین و انتقال `ProjectDetail.projectId` در `Events.pendingProjectHistoryId` به route موجود `#events`. `js/modules/events.js:Events.init`: مصرف شناسه پس از پایان `load()`؛ `applyProjectHistoryFilter(projectId)`: پاک‌سازی فیلترهای قبلی، انتخاب پروژه، scope=`all`، بازکردن `#events-filter-content` و اسکرول به تاریخچه؛ `applyFilters()` و `clearHistoryFilters()` همچنان مسیر استاندارد فیلتر/پاک‌سازی را اجرا می‌کنند. `index.html`: cache-busting هر دو ماژول به `20261107-project-event-history-shortcut-1`. تست جدید `tests/project-event-history-shortcut.test.js`.
 
### Task 3 — Regression، QA، ادغام و انتشار
- *یافته رفع باگ:* انتشار GitHub Pages پس از ادغام PR #47 با موفقیت اجرا شد. شرط نمایش دکمه فقط `EVENT_VIEW` را می‌پذیرفت، درحالی‌که route موجود رویدادها `EVENT_VIEW` یا `EVENT_CREATE` را می‌پذیرد؛ این ناهماهنگی باعث مخفی‌شدن دکمه برای کاربران دارای فقط مجوز ثبت رویداد می‌شد.
- *اقدام اصلاحی:* شرط نمایش/کلیک دکمه به `Router.hasRouteAccess('events')` متصل می‌شود تا دقیقاً از همان قواعد دسترسی route موجود استفاده کند؛ نسخه `project-detail.js` در `index.html` نیز cache-bust می‌شود.
- تست خودکار برای دکمه، انتقال projectId، فیلتر فقط همان پروژه، نمایش رویدادهای ثبت‌شده توسط دیگر کاربرانِ مجاز و پاک‌کردن فیلتر.
- بررسی مجوزها، حالت بدون رویداد، فیلترهای قبلی، cache و واکنش‌گرایی.
- اجرای CI و Cross-repository QA؛ ادغام شاخه‌های عملیاتی و انتشار Frontend پس از موفقیت کنترل‌ها؛ Backend deployment لازم نیست مگر تغییر runtime اثبات شود.
- ارائه مراحل تست نسخه منتشرشده به مالک محصول و توقف تا تأیید.
