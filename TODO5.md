## 🎯 Current Objective

افزودن امکان ویرایش مستقیم مقادیر نمایش‌داده‌شده روی قالب‌های پروژه و ذخیره تغییرات در منبع اصلی اطلاعات؛ ویرایش پاسخ فرم و فیلدهای رویداد باید روی همان رویداد قبلی اعمال شود و رویداد جدیدی ایجاد نکند.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

### مخازن و شاخه‌ها
- Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه `feat/template-inline-data-edit-20261113`؛ مبنا: `main` در commit `a313b06aa96ed3bebc844a219df30d0df75a0213`.
- Frontend: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه `feat/template-inline-data-edit-20261113`؛ مبنا: `main` در commit `9595b3e060ab7b544830045e1db08170db3cdbd6`.
- هر دو مخزن مجوز push دارند؛ هیچ تغییر مستقیمی روی `main` انجام نمی‌شود.

### معماری کشف‌شده
- Frontend صفحه رویدادها: `pages/events.html`؛ کارت‌ها و رفتارها در `js/modules/events.js` و استایل در `css/events.css`.
- تابع `Events.renderProjectQueues()` دکمه فعلی `.event-queue-view-button` را با حالت disabled تولید می‌کند؛ handler کلیک سراسری در `Events.bindEvents()` قرار دارد.
- صفحه خروجی موجود: مسیر `print-output` با فایل `pages/print-output.html` و ماژول مشترک `js/modules/print-designer.js`.
- `PrintDesigner.loadOutputOptions()` قالب‌های فعال را از `GET /print-templates` و پروژه‌ها را از `GET /projects` می‌گیرد.
- `PrintDesigner.resolveOutput()` از `POST /print-templates/:templateId/resolve` با payload شامل `ProjectID` استفاده می‌کند؛ خروجی از `PrintDesigner.renderOutputDocument(template, project, data)` رندر می‌شود. قالب‌های PDF اصلی نیز با مسیر موجود `GET /print-templates/:id/pdf` و تصاویر قالب با مسیرهای موجود بارگذاری می‌شوند.
- Router سمت Frontend مسیر `print-output` را به `pages/print-output.html` متصل می‌کند و route segmentها را به ماژول صفحه می‌دهد.
- Backend: `Router.js` مسیرهای GET `/print-templates`، GET `/print-templates/:id`، GET `/print-templates/:id/pdf` و POST `/print-templates/:id/resolve` را به `PrintTemplateService` متصل می‌کند.
- `PrintTemplateService.list()` فقط قالب‌های فعال همان Tenant را برمی‌گرداند؛ `resolve()`، `_resolveProjectData()` و `PrintTemplateValidator.parseDefinition()` اطلاعات پروژه، اطلاعات مرکزی، پاسخ فرم‌ها و رویدادهای مرتبط را بر اساس bindingهای ذخیره‌شده حل می‌کنند.
- داده قالب در تعریف `DefinitionJSON` و اطلاعات قالب در مخزن `PrintTemplateRepository` نگهداری می‌شود؛ مقادیر پروژه از مخازن پروژه/اطلاعات مرکزی/رویداد/فرم خوانده می‌شوند. در این قابلیت نباید schema یا داده عملیاتی تغییر کند.
- دسترسی خروجی در Backend با `PROJECT_VIEW` و tenant/project access موجود کنترل می‌شود؛ مجوز صفحه `print-output` در Frontend نیز `PROJECT_VIEW` است.
- فایل‌های آزمون موجود: Backend `tests/print-templates.test.js`؛ Frontend `tests/print-template-library.test.js` و `tests/project-print-designer.test.js` و `tests/event-queue-project-cards.test.js`.

### تصمیم‌های حفاظتی
- استفاده مجدد از کتابخانه قالب، resolver، رندرر، APIها و کنترل‌های دسترسی موجود؛ عدم ایجاد API، جدول، فرم یا مسیر داده موازی.
- حفظ رفتار ثبت رویداد، تاریخچه، وضعیت کارت‌ها و خروجی چاپ فعلی.
- عدم تغییر Google Sheets، Google Drive، permissionها یا داده‌های عملیاتی مگر آنکه بررسی فنی بعدی ضرورت مستند و تأییدشده‌ای نشان دهد.

## 📋 Macro-Task Queue & Implementation Log

- [x] **Task 1 — Discovery & Planning:** بررسی هر دو مخزن عملیاتی، شاخه‌ها و commitهای مبنا، TODO5/ARCHITECTURE، دکمه غیرفعال کارت، Router، صفحه خروجی، resolver و منابع داده قالب انجام شد. نتیجه اولیه: قابلیت با توسعه Frontend روی مسیر خروجی موجود قابل پیاده‌سازی است و فعلاً تغییر Backend/DB پیش‌بینی نمی‌شود.
  - *Log:* Backend: `Router.js`, `PrintTemplateService.js`, `PrintTemplateValidator.js`, `PrintTemplateRepository.js`, `tests/print-templates.test.js` بررسی شدند؛ مسیر resolve موجود `POST /print-templates/:id/resolve` و منابع `PROJECT_FIELD`, `PROJECT_INFORMATION`, `EVENT_FORM_FIELD`, `EVENT_FORM_RESPONSE`, `EVENT_FIELD` تأیید شد. Frontend: `pages/events.html`, `js/modules/events.js`, `pages/print-output.html`, `js/modules/print-designer.js`, `js/core/router.js`, `index.html` و تست‌های قالب/کارت بررسی شدند. هر دو مخزن روی `main` بررسی و شاخه ویژگی از commit مبنای تأییدشده ایجاد شد. TODO5 قبلی در هر دو مخزن «Ready for the next feature» بود؛ کار ناتمامی برای ادامه وجود نداشت.

- [x] **Task 2 — Project-specific Template Output:** اتصال دکمه «مشاهده» کارت پروژه به صفحه خروجی با شناسه پروژه؛ بارگذاری قالب‌های فعال و resolve/render اطلاعات پروژه در همان صفحه با حفظ تجربه و رندرر موجود.
  - *Log:* در `js/modules/events.js`، `Events.renderProjectQueues()` دکمه `.event-queue-view-button` به شناسه پروژه مجهز شد و handler در `Events.bindEvents()` مسیر `print-output/:projectId` را باز می‌کند. در `js/modules/print-designer.js`، `initOutput()` حالت پروژه را از route تشخیص می‌دهد و `initProjectOutput()` پروژه و همه قالب‌های فعال را می‌گیرد؛ هر قالب به‌ترتیب با `POST /print-templates/:id/resolve` و `renderOutputDocument()` موجود آماده می‌شود. مدیریت URLهای پس‌زمینه PDF برای چند قالب حفظ شد؛ قالب ناموفق در صفحه مشخص می‌شود و از خروجی چاپ حذف می‌گردد. `pages/print-output.html` برای نمایش همه خروجی‌ها، نام پروژه، بازگشت و چاپ یکپارچه تغییر کرد؛ `css/print-template-library.css` ظاهر، شکست صفحه و حذف خطاها از چاپ را پوشش می‌دهد؛ نسخه asset در `index.html` به‌روزرسانی شد. تست‌های `tests/event-queue-project-cards.test.js`، `tests/project-print-designer.test.js` و انتظارات نسخه در `tests/print-template-library.test.js` به‌روز شدند. بررسی syntax فایل‌های JavaScript و تعادل CSS موفق است؛ asset QA، بررسی قرارداد Frontend و cross-repository QA موفق شدند. اجرای مجدد CI روی شاخه `feat` تمام ۲۶۸ تست Frontend را با نتیجه ۲۶۸ موفق و صفر ناموفق گذراند؛ بررسی وجود assetها و guard ایمنی E2E نیز موفق شد. Product Owner تست عملیاتی را موفق تأیید کرد. تغییر در Frontend PR #128 با merge commit `52d40d2b27c2ecb30c8f7d0c4a33f6b4fb7fccd1` در main پذیرفته شد؛ جزئیات مستقل workflow انتشار در این TODO ثبت نشده است.
- [x] **Task 3 — Regression, Integration & Delivery:** آزمون کارت/ناوبری، انتخاب و نمایش قالب، resolve اطلاعات پروژه و پاسخ فرم/رویداد، تصاویر و PDF و سازگاری بین مخازن انجام شد؛ Product Owner موفقیت تست عملیاتی را اعلام کرد.
  - *Log:* تغییرات Frontend در PR #128 با commit `52d40d2b27c2ecb30c8f7d0c4a33f6b4fb7fccd1` در main ادغام شد. پذیرش نهایی تست عملیاتی توسط Product Owner اعلام شد. Backend و Google Sheets در آن قابلیت تغییر نکردند.


### معماری کشف‌شده برای ویرایش مستقیم قالب
- Frontend: pages/print-output.html و js/modules/print-designer.js. مسیر پروژه از initOutput() به initProjectOutput(projectId) می‌رسد؛ داده با POST /print-templates/:id/resolve دریافت و با renderOutputDocument(template, project, data) در pt-output-preview رندر می‌شود. چاپ و PDF نیز از همین خروجی استفاده می‌کنند.
- قالب در DefinitionJSON دارای elements و bindings است؛ هر عنصر با bindingId به منبع داده متصل است. ویرایش باید از binding موجود و شناسه منبع واقعی استفاده کند، نه متن نمایشی/مقدار resolve‌شده به‌تنهایی.
- Backend: PrintTemplateService._resolveProjectData() مقدارهای PROJECT_FIELD, PROJECT_INFORMATION, EVENT_FORM_FIELD و EVENT_FIELD را resolve می‌کند. فیلدهای رویداد مجاز نمایشی فعلی شامل EventTypeName, OccurredAt, CreatedAt, Description, CreatorName, PerformedByName, DepartmentName و Status است؛ فیلدهای محاسباتی/هویتی نباید خودکار قابل ویرایش فرض شوند.
- APIهای تغییر موجود: PUT /projects/:id با PROJECT_EDIT؛ POST /projects/:projectId/information/:typeId با PROJECT_EDIT؛ PUT /events/:eventId/forms/:formId با EVENT_EDIT.
- ProjectInformationService.save() مقدار جاری را در 30_ProjectInformation به‌روزرسانی و تاریخچه را در 31_ProjectInformationHistory ثبت می‌کند؛ FormRepository.updateResponse() پاسخ همان ردیف 35_EventFormData را به‌روزرسانی می‌کند؛ EventRepository.update() برای به‌روزرسانی ردیف 13_Events موجود است.
- محدودیت فعلی مهم: FormService.updateEventFormResponse() در مسیر PUT /events/:eventId/forms/:formId الزام می‌کند یک AmendmentEventID جداگانه از همان پروژه وجود داشته باشد و ویرایش را به جریان «رویداد اصلاحی» متصل می‌کند. این رفتار با تصمیم قطعی Product Owner (اصلاح همان رویداد قبلی، بدون ایجاد رویداد جدید) یکسان نیست و باید با حفظ سازگاری جریان اصلاحی فعلی، مسیر مجاز و امن ویرایش مستقیم همان رویداد طراحی شود.
- EventService در حال حاضر عملیات عمومی ویرایش رویداد ندارد؛ Router فقط دریافت/ثبت/ابطال و اصلاح فرم از مسیر رویداد اصلاحی را پوشش می‌دهد. EventRepository.update() موجود است اما نباید مستقیماً از Frontend فراخوانی شود؛ کنترل tenant، مجوز، وضعیت گردش کار، اعتبارسنجی و Audit باید در سرویس Backend باشد.
- کنترل‌های امنیتی: tenant/project access در resolver، مجوزهای PROJECT_EDIT و EVENT_EDIT و اعتبارسنجی نوع اطلاعات/فرم موجود حفظ شوند. ویرایش رویداد نباید رویداد جدید بسازد یا قواعد حرکت Workflow/تأمین را دوباره اجرا کند؛ باید Audit تغییرات را با شناسه همان رویداد ثبت کند.
- منابع/آزمون‌های فعلی: Backend PrintTemplateService.js, ProjectInformationService.js, FormService.js, EventService.js, EventRepository.js, FormRepository.js, Router.js, tests/print-templates.test.js؛ Frontend js/modules/print-designer.js, pages/print-output.html, js/core/api.js, tests/project-print-designer.test.js, tests/print-template-library.test.js.

## تصمیم‌های قطعی محصول برای این تسک
- ویرایش در همان نقطه روی قالب انجام شود و بعد از ذخیره موفق، منبع اصلی اطلاعات سیستم به‌روزرسانی شود.
- ویرایش پاسخ فرم یا فیلد رویداد باید رکورد رویداد/پاسخ قبلی را اصلاح کند؛ ایجاد رویداد جدید یا رویداد اصلاحی برای این مسیر مجاز نیست.
- سابقه تغییرات باید در Audit/History موجود ثبت شود، بدون اینکه رویداد عملیاتی جدیدی برای ممیزی ساخته شود.
- چاپ و PDF باید از آخرین داده تأییدشده سرور ساخته شوند؛ شکست ذخیره نباید به‌عنوان موفقیت نمایش داده شود.

## تسک‌های فاز جاری
- [x] **Task 1 — Discovery & Planning:** بررسی شاخه‌ها و commitهای عملیاتی، TODO5/ARCHITECTURE، مسیر خروجی قالب، bindingها، resolver، APIهای نوشتن اطلاعات پروژه/فرم و محدودیت فعلی اصلاح رویداد انجام شد.
  - *Log:* Frontend: PrintDesigner.initProjectOutput(), renderOutputDocument(), pages/print-output.html و js/core/api.js بررسی شد. Backend: Router.js، PrintTemplateService._resolveProjectData()، ProjectInformationService.save()، FormService.updateEventFormResponse()، EventService، EventRepository.update() و FormRepository.updateResponse() بررسی شدند. مشخص شد API فعلی فرم به AmendmentEventID وابسته است و EventService متد عمومی update ندارد. شاخه‌های ویژگی مستقل از main ایجاد شدند؛ هیچ کد یا داده عملیاتی تغییر نکرد.
- [ ] **Task 2 — Inline Editing UX (IN PROGRESS):** طراحی و پیاده‌سازی ویرایش درجا برای عناصر متصل به bindingهای قابل ویرایش؛ نمایش حالت ویرایش/ذخیره/خطا، لغو و بازخوانی داده ذخیره‌شده؛ حفظ ابعاد، موقعیت، PDF background و چاپ.
- [ ] **Task 3 — Safe Source Persistence:** پیاده‌سازی ذخیره امن اطلاعات پروژه، اطلاعات مرکزی، پاسخ فرم و فیلدهای قابل ویرایش همان رویداد قبلی با حفظ مجوز، اعتبارسنجی، tenant isolation، optimistic concurrency و Audit/History؛ بدون ایجاد رویداد جدید یا اجرای مجدد Workflow.
- [ ] **Task 4 — Integration & Regression:** تست قرارداد API، binding-to-source mapping، داده‌های چندردیفی، دسترسی کاربران، همگام‌سازی resolver پس از ذخیره، چاپ/PDF، موبایل/دسکتاپ و عدم رگرسیون جریان رویداد اصلاحی فعلی.