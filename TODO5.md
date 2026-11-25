## 🎯 Current Objective
یکسان‌سازی نمایش رویدادهای ثبت‌شده برای پروژه در صفحه رویدادها با خط زمانی فشرده و بازشونده صفحه جزئیات پروژه.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
- فقط Frontend عملیاتی: `Saeidesl/PRSPRO2-PRODUCTION`; مبنا `main`، شاخه کاری `feat/events-page-compact-project-history-20261125`.
- مسیر نمایش: `pages/events.html` و ماژول `js/modules/events.js`؛ دکمه فعلی `.event-queue-history-button` به `Events.applyProjectHistoryFilter(projectId)` متصل است و فهرست تاریخچه با `Events.render(events)` نمایش داده می‌شود.
- Renderer مرجع: `js/modules/project-detail.js`، `ProjectDetail.renderEvents(events)` و `ensureTimelineStyles()`; کلاس‌های `pms-timeline-compact`, `pms-timeline-details`, `pms-timeline-summary`, `pms-timeline-expanded`؛ مرتب‌سازی OccurredAt نزولی، نمایش اجراکننده و محتوای بازشونده.
- `Events.openDetails(eventId)` و APIهای موجود `GET /events/:id`, `GET /events/:id/data`, `GET /events/:id/forms` برای جزئیات و پاسخ‌های فرم بررسی می‌شوند؛ از مسیر/API موازی پرهیز.
- بدون تغییر Backend/schema مگر اینکه قرارداد موجود واقعاً ناکافی تشخیص داده شود.

## 📋 Macro-Task Queue & Implementation Log
- [x] Task 1 — Discovery & Planning: بررسی TODO5/ARCHITECTURE، branch/main، دکمه history، renderer فعلی تاریخچه و renderer مرجع پروژه.
  - *Log:* `Events.applyProjectHistoryFilter(projectId)` فیلتر تاریخچه عمومی را فعال می‌کند؛ `Events.render(events)` فعلی کارت‌های بلند و دکمه `event-details-button` را تولید می‌کند؛ `Events.openDetails(eventId)` بارگذاری جزئیات، data و forms را از APIهای موجود انجام می‌دهد. Renderer مرجع `ProjectDetail.renderEvents` دارای ردیف‌های native details با 50px حداقل ارتفاع، تاریخ وقوع و اجراکننده است. این task باید مسیر تاریخچه فیلترشده پروژه را به نمایش همسان تبدیل کند بدون تخریب فیلترها.
- [ ] **Task 2 — IN PROGRESS: Compact Project Event History UI:** پیاده‌سازی اولیه renderer فشرده inline در `Events.render` برای حالت فیلتر پروژه؛ ردیف‌های collapsed با تاریخ وقوع، اجراکننده، شرح/واحد/وضعیت/شناسه و دکمه جزئیات کامل از مسیر API/modal موجود. مرتب‌سازی تاریخ وقوع نزولی و حفظ نمایش عادی برای تاریخچه عمومی. هنوز بازبینی و آزمون CI لازم است.
- [ ] Task 3 — Integration, Regression & Operational Acceptance: بررسی CI، سازگاری، انتشار و تست کاربر؛ ترتیب، محتوا، باز/بسته‌شدن و موبایل RTL.

