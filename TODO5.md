## 🎯 Current Objective

افزودن دکمه «رویدادهای ثبت‌شده برای این پروژه» روی کارت هر پروژه در صفحه «رویدادها»، دقیقاً کنار دکمه «ثبت رویداد برای این پروژه». با کلیک، بدون خروج از صفحه، بخش تاریخچه همان صفحه فقط رویدادهای همان پروژه را نمایش دهد؛ همه رویدادهای مجاز (نه فقط ثبت‌شده توسط کاربر فعلی) دیده شوند. دکمه اشتباهاً اضافه‌شده از صفحه جزئیات پروژه حذف شود. مسیر/صفحه/API موازی ایجاد نشود.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

### مخازن و شاخه‌های عملیاتی
- Frontend: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه اصلاح محل دکمه `fix/project-event-history-shortcut-placement-20261107`، مبنا `c602e34983226a446f54a42004371a2003c4e29e`.
- Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه `feat/project-registered-events-button-20261107`، شاخه از main با مبنای آخرین commit `5838f1ccca5959d87fbdfe8dbb7561ef7414400e`.
- هر دو مخزن عملیاتی، TODO5 و ARCHITECTURE بررسی شدند؛ فاز قبلی مودال پیشرفت ثبت رویداد بسته و TODO5 پاک‌سازی شده بود. مخازن توسعه و main نباید تغییر کنند.

### Frontend — مسیر موجود و نقاط اتصال
- `pages/project-detail.html`: دکمه `#project-add-event-button` فقط برای ثبت رویداد از صفحه جزئیات؛ دکمه تاریخچه در این صفحه نباید وجود داشته باشد.
- `js/modules/project-detail.js`: `ProjectDetail.bindEvents()` فقط مسیر فعلی ثبت رویداد پروژه را نگه می‌دارد؛ مسیر دکمه تاریخچه از این ماژول حذف می‌شود.
- `pages/events.html` کارت‌های صف پروژه را در `#event-queue-pending`, `#event-queue-progress`, `#event-queue-completed` میزبانی می‌کند؛ خود کارت‌ها در `js/modules/events.js` ساخته می‌شوند. دکمه تاریخچه باید در همان گروه عملیات کارت و کنار CTA موجود ثبت رویداد قرار گیرد.
- `js/modules/events.js`: `Events.init()` مجوز `EVENT_VIEW` را برای نمایش دکمه تاریخچه محاسبه می‌کند؛ رندر کارت صف دکمه `.event-queue-history-button` را با `data-project-id` می‌سازد؛ handler کلیک مستقیماً `applyProjectHistoryFilter(projectId)` را در همان صفحه اجرا می‌کند. `applyFilters()` و `clearHistoryFilters()` مسیر استاندارد فیلتر را حفظ می‌کنند.
- `Events.applyProjectHistoryFilter(projectId)` فیلتر موجود را بازاستفاده می‌کند: scope=`all`، انتخاب پروژه، پاک‌سازی فیلترهای مزاحم و اسکرول به تاریخچه؛ نیازی به route/hash یا handoff بین صفحه‌ها نیست.
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

### Task 2 — پیاده‌سازی محل صحیح دکمه تاریخچه پروژه [x]
- حذف دکمه تاریخچه از صفحه جزئیات پروژه؛ دکمه اصلی «ثبت رویداد» و رفتار آن بدون تغییر بماند.
- افزودن دکمه تاریخچه به کارت پروژه‌های صف در صفحه رویدادها، کنار CTA موجود؛ نمایش آن فقط برای کاربران دارای `EVENT_VIEW` یا مدیر.
- کلیک دکمه باید تاریخچه همان صفحه را با `ProjectID` پروژه انتخاب‌شده فیلتر کند؛ scope=`all` و پاک‌سازی فیلترهای مزاحم؛ امکان پاک‌کردن فیلتر برای بازگشت به فهرست عادی حفظ شود.
- دکمه تاریخچه برای کارت‌های تکمیل‌شده نیز در کنار عملیات موجود قابل مشاهده باشد؛ CTA فعلی «درخواست ثبت تغییرات» حفظ شود.
- عدم تغییر Backend runtime و حفظ API/Sheet/permissionهای موجود.
- *Log:* `js/modules/events.js`: افزودن کنترل مجوز `EVENT_VIEW`، ساخت دکمه `.event-queue-history-button` روی کارت‌های پروژه و handler اجرای مستقیم `Events.applyProjectHistoryFilter(projectId)` در همان صفحه؛ CTA ثبت رویداد و CTA درخواست تغییرات حفظ شدند. `pages/project-detail.html` و `js/modules/project-detail.js`: حذف دکمه/handler تاریخچه از صفحه جزئیات و حفظ ثبت رویداد موجود. `css/events.css`: چیدمان واکنش‌گرای گروه دکمه‌ها. `index.html`: cache-busting نسخه `20261107-project-event-history-shortcut-placement-1`. تست‌های `tests/project-event-history-shortcut.test.js` و assertionهای asset در تست‌های وابسته به‌روزرسانی شدند. API، Backend runtime، Sheet، schema و داده تغییر نکردند.

### Task 3 — Regression، QA، ادغام و انتشار [x]
- *اصلاح دامنه:* درخواست مالک محصول مربوط به کارت‌های پروژه در صفحه رویدادهاست، نه صفحه جزئیات پروژه. دکمه قبلی در محل اشتباه قرار گرفته بود؛ این Task محل را اصلاح می‌کند.
- تست رگرسیون برای وجود دکمه در کارت پروژه، اتصال به همان projectId، اجرای فیلتر در همان صفحه، مجوز `EVENT_VIEW`، حفظ CTA ثبت رویداد و حذف دکمه از صفحه جزئیات.
- بررسی کارت‌های pending/progress/completed، حالت بدون رویداد، پاک‌کردن فیلتر، فیلترهای قبلی، cache و واکنش‌گرایی.
- اجرای CI و Cross-repository QA؛ ادغام و انتشار Frontend پس از موفقیت کنترل‌ها؛ Backend deployment لازم نیست چون تغییری در runtime یا قرارداد API وجود ندارد.
- ارائه مراحل تست نسخه عملیاتی به مالک محصول و توقف تا تأیید.
- *Log:* Frontend PR #49 با squash در commit `9c0bed3be00e265d361b446129614a1f21945b45` روی `main` ادغام شد. CI شامل ۲۰۸ تست Frontend، Agent Suite و Cross-repository QA موفق بود؛ Browser/Performance audit پیش از ادغام موفق شد. GitHub Pages deployment موفق و نسخه عملیاتی در `https://saeidesl.github.io/PRSPRO2-PRODUCTION/` منتشر شد. مالک محصول در 2026-11-07 تست عملیاتی را موفق تأیید کرد. Backend PR #26 فقط مستندات سازگاری بود و ادغام شد؛ چون runtime تغییر نکرد، Apps Script deployment لازم نبود. تست پذیرش شامل محل دکمه در صفحه رویدادها، فیلتر پروژه در همان صفحه، نمایش رویدادهای مجاز، پاک‌کردن فیلتر و حفظ CTA ثبت رویداد بود.
