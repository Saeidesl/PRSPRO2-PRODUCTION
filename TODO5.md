## 🎯 Current Objective
افزودن گالری کامل تصاویر هر پروژه در صفحه رویدادها؛ تصاویر پروژه و پیوست‌های تصویری رویدادهای مرتبط باید در یک گالری گروه‌بندی‌شده بر اساس رویداد و تاریخ قابل مشاهده باشند، بدون دانلود تصویر هنگام بارگذاری اولیه صفحه.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
- مخزن عملیاتی Frontend: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه مبنا `main`؛ شاخه کاری فاز: `feat/project-event-image-gallery-20261119`.
- مخزن عملیاتی Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه مبنا `main`؛ شاخه کاری فاز: `feat/project-event-image-gallery-20261119`.
- نقطه ورود assetها: `index.html`؛ صفحه: `pages/events.html`؛ ماژول اصلی: `js/modules/events.js`؛ API: `js/core/api.js`؛ UI مشترک preview: `js/modules/projects.js`؛ CSS: `css/events.css`.
- رندر کارت‌ها در `Events.renderProjectQueue` (حدود خطوط 1142–1208 در مبنای فعلی) و عملیات کارت در `event-queue-project-actions` انجام می‌شود. صفحه دارای grid واکنش‌گرا با ۴ ستون دسکتاپ است؛ ساختار کارت فعلی حفظ شود.
- مسیر metadata تصویر کارت: `Events.loadQueueProjectImages` → `Projects.getProjectCardAttachments` → `GET /project-card-images`؛ این API فعلاً فقط آخرین PROFILE را برمی‌گرداند و برای گالری کامل کافی نیست.
- مسیر رویدادها: `GET /events` و `GET /projects/:projectId/events`؛ مسیر پیوست‌های هر entity در Backend وجود دارد، اما فراخوانی attachment list برای تک‌تک رویدادها N+1 ایجاد می‌کند و برای گالری استفاده نخواهد شد.
- نمایش پیوست‌های تصویری فرم رویداد در `Events.renderEventInformationValue` و `Events.openEventImageAttachment` انجام می‌شود. دانلود امن تصویر از `GET /attachments/:attachmentId/download` با کنترل MIME/permission و تبدیل Blob به Object URL است.
- preview مشترک: `PMS.Modules.Projects.openImagePreview(src, alt, options)` با Native `<dialog>.showModal()`; از ساخت overlay یا lightbox موازی ممنوع است.
- وضعیت کارت‌ها: `Events.renderProjectQueue` markup کارت و دکمه‌ها را تولید می‌کند؛ `css/events.css` استایل‌های `.event-project-card-unified` و `.event-queue-project-actions` را دارد.
- Backend مرتبط: `Router.js`, `AttachmentService.js`, `AttachmentRepository.js`, `EventRepository.js`; شیت پیوست `15_Attachments`؛ APIهای دانلود و مجوزهای موجود باید حفظ شوند.
- تصمیم محصول: فقط دکمه «گالری تصاویر» و تعداد تصاویر روی کارت؛ thumbnailهای اضافه روی کارت نمایش داده نشوند. تصویر پروفایل فعلی کارت حذف نمی‌شود. گالری داخل Modal واکنش‌گرا باز می‌شود و تصاویر بر اساس رویداد و تاریخ گروه‌بندی می‌شوند.
- عملکرد: فقط تعداد سبک در زمان ورود؛ metadata کامل پس از کلیک؛ thumbnail با Lazy Loading و concurrency محدود؛ دانلود تصویر اصلی فقط پس از انتخاب. metadata بدون Base64؛ عدم تکرار درخواست و عدم ایجاد N+1.
- تست‌های مرتبط موجود: `tests/event-image-preview-modal.test.js`, `tests/event-queue-project-cards.test.js`, `tests/event-history-project-cards.test.js` و تست‌های API/attachment در مخزن Backend.

## 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** بررسی TODO5/ARCHITECTURE، وضعیت شاخه و commitها، ردیابی کارت پروژه، پیوست‌های پروژه/رویداد، APIها، مجوزها و مسیر preview؛ تعیین طرح سازگار و معیارهای عملکرد.
  - *Log:* هر دو مخزن عملیاتی فعال و قابل دسترسی‌اند؛ شاخه مبنای هر دو `main` و غیرمحافظت‌شده است. آخرین commitهای مبنا: Backend `70e1a2812be629ec752285ff1a8bbb71cde9ea1f`؛ Frontend `7fa0964758719e6876c13441c1f3418895b5362e`. فازهای قبلی TODO5 در هر دو مخزن بسته و همه Macro-Taskهای ثبت‌شده تکمیل‌اند. شاخه کاری این فاز در هر دو مخزن از همین commitها ساخته شد. ردیابی نشان داد endpoint فعلی `/project-card-images` فقط آخرین تصویر PROFILE را می‌دهد؛ تصاویر رویدادها در `EVENT` attachments ذخیره می‌شوند و برای هر Event از مسیر `/events/:id/attachments` قابل خواندن‌اند. فراخوانی جداگانه این مسیر برای هر رویداد N+1 ایجاد می‌کند؛ بنابراین Frontend باید فقط از قرارداد تجمیعی Backend استفاده کند. مسیر دانلود امن و Native Dialog مشترک فعلی حفظ می‌شود. هیچ کد اجرایی یا داده عملیاتی تغییر نکرده است.
- [x] **Task 2 — Backend gallery metadata & count contract:** مصرف مسیرهای تجمیعی tenant/project-scoped برای تعداد تصاویر کارت و metadata گالری شامل تصاویر مستقیم پروژه و تصاویر رویدادهای آن؛ بدون Base64 و بدون N+1؛ حفظ مجوزها و قراردادهای فعلی.
  - *Log:* قرارداد Backend در شاخه کاری مخزن عملیاتی آماده و CI آن موفق شد؛ فرانت‌اند در این Task هنوز تغییری نکرده است. PR بک‌اند #97 باز و Draft است و ادغام/استقرار نشده؛ Task 3 اکنون مسیر مصرف دو endpoint را پیاده‌سازی می‌کند.
- [ ] **Task 3 — Frontend gallery experience (IN PROGRESS):** افزودن دکمه/تعداد به کارت‌ها، Modal واکنش‌گرا، گروه‌بندی بر اساس رویداد و تاریخ، بارگذاری تدریجی thumbnailها، بازکردن تصویر اصلی با Native Dialog موجود و مدیریت حافظه/Object URL.
- [ ] **Task 4 — Integration, performance & regression acceptance:** تست قرارداد API، مجوز/tenant، پروژه بدون تصویر و چندتصویری، ترتیب گروه‌ها، صفحه‌بندی/بارگذاری تدریجی، عدم دانلود در بارگذاری اولیه، دسکتاپ/موبایل، CI و بررسی انتشار؛ سپس توقف برای تست Product Owner.
