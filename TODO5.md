## 🎯 Current Objective

نمایش فرم‌های متصل به نوع رویداد در مودال تمام‌صفحه با تجربه بصری شبیه تکمیل یک برگه کاغذی A4؛ با حفظ کامل مسیر فعلی ثبت رویداد، اعتبارسنجی، فایل‌ها، فرم‌های چندردیفی و پاسخ‌های موجود.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

### مخازن و شاخه
- Frontend عملیاتی: `Saeidesl/PRSPRO2-PRODUCTION`
- Backend عملیاتی: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`
- شاخه کاری فاز: `feat/event-form-a4-modal-20261108` در هر دو مخزن؛ از آخرین commit شاخه main ساخته شد.
- Frontend baseline: `dd54957585cabb6c1dcb1c13f87abe4d7bef1c9a`
- Backend baseline: `5247d9872509f6e9e2a26a5b3f0607444c441a1a`
- فاز قبلی Frontend در TODO5 تکمیل شده بود.
- تسک قبلی Backend درباره اعلان تلگرام هنوز در Task 4 بود؛ بنا به دستور مالک محصول در وضعیت متوقف‌شده حفظ می‌شود و بخشی از این فاز نیست.

### معماری و جریان فعلی فرم رویداد
- `pages/events.html`: صفحه میزبان ثبت رویداد؛ مودال ثبت در `js/modules/events.js:Events.openForm` به‌صورت پویا ساخته می‌شود.
- `js/modules/events.js:Events.loadEventForms`: بارگذاری فرم‌های متصل به نوع رویداد.
- `Events.loadConfiguredForms`: دریافت از API موجود `GET /event-types/:eventTypeId/forms` یا cache تعاریف.
- `Events.renderConfiguredForms`: ساخت کنترل‌های فرم داخل `#event-configured-forms-section` و `#event-configured-forms`.
- `Events.collectConfiguredFormResponses`: خواندن پاسخ‌ها از DOM موجود و ساخت payload فرم‌ها.
- `Events.submitForm`: ارسال رویداد از مسیر موجود `POST /events`؛ فایل‌ها از مسیر موجود پیوست پروژه آپلود می‌شوند.
- فرم‌های چندردیفی با `data-form-table`, `data-form-row`, `addConfiguredFormRow` ساخته و جمع‌آوری می‌شوند.
- اعتبارسنجی فیلدهای اجباری، visibility rules، تصویر/فایل و پروفایل تصویر باید بدون تغییر رفتار حفظ شوند.
- پنل اطلاعات زمینه‌ای پروژه `#event-context-panel` و مودال پیشرفت ثبت مستقل از نمایش A4 باقی می‌مانند.
- Backend/API/Google Sheets برای این تجربه UI نیازی به تغییر اجرایی ندارند؛ پاسخ‌ها همچنان از همان قرارداد موجود ارسال و ذخیره می‌شوند.

### تصمیم طراحی
- با انتخاب نوع رویداد دارای فرم متصل، همان بخش فرم موجود به‌صورت خودکار در overlay تمام‌صفحه نمایش داده شود.
- محتوای فرم روی صفحه سفید با تناسب A4 و حاشیه چاپ‌مانند قرار گیرد؛ هدر فرم، نام فرم و بخش‌بندی خوانا باشند.
- کنترل‌ها و پاسخ‌ها همان DOM و همان فرم HTML اصلی را حفظ کنند تا ارتباط submit و اعتبارسنجی قطع نشود.
- امکان بستن برگه و بازکردن مجدد آن از فرم ثبت رویداد وجود داشته باشد.
- در موبایل، برگه در عرض قابل استفاده با اسکرول عمودی نمایش داده شود؛ در دسکتاپ نسبت A4 حفظ شود.
- فرم‌های بدون فرم متصل، روال فعلی را بدون بازشدن overlay اضافی ادامه دهند.

## 📋 Macro-Task Queue & Implementation Log

- [x] **Task 1 — Discovery & Planning**: بررسی وضعیت مخازن عملیاتی، شاخه‌ها، TODO5/ARCHITECTURE و مسیر واقعی ساخت، بارگذاری، نمایش و جمع‌آوری پاسخ فرم انجام شد.
  - *Log:* Frontend آخرین commit شاخه main برابر `dd54957585cabb6c1dcb1c13f87abe4d7bef1c9a` و Backend برابر `5247d9872509f6e9e2a26a5b3f0607444c441a1a` بود. شاخه کاری `feat/event-form-a4-modal-20261108` در هر دو مخزن از main ساخته شد؛ هیچ protected branch تغییر نکرد. نقاط اتصال اجرایی در `js/modules/events.js` شامل `openForm`, `loadEventForms`, `loadConfiguredForms`, `renderConfiguredForms`, `collectConfiguredFormResponses` و `submitForm` هستند. فرم فعلی داخل `#event-create-form` قرار دارد؛ بنابراین overlay باید همان DOM را درون فرم اصلی نگه دارد تا اعتبارسنجی، submit و کنترل‌های فایل/چندردیفی از کار نیفتند. Backend و قراردادهای API/Sheet بدون تغییر اجرایی می‌مانند.
- [ ] **Task 2 — پیاده‌سازی تجربه فرم A4 (IN PROGRESS)**: تبدیل نمایش فرم‌های متصل به overlay تمام‌صفحه A4، سازگار با موبایل و بدون تغییر DOM/قرارداد داده اصلی.
- [ ] **Task 3 — آزمون یکپارچگی و رگرسیون**: آزمون فرم تکی و چندفرمی، فیلدهای اجباری، visibility rules، جدول‌های چندردیفی، فایل/تصویر، رویداد مستقل/پروژه‌ای، بستن و بازکردن مجدد، موبایل و submit موجود.
- [ ] **Task 4 — ادغام و انتشار عملیاتی**: بررسی CI و سازگاری، PR و ادغام فقط پس از بررسی؛ انتشار GitHub Pages و تأیید نسخه زنده. انتشار Backend فقط در صورت تغییر واقعی Backend.
