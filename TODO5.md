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
- [x] **Task 2 — پیاده‌سازی تجربه فرم A4**: نمایش فرم‌های متصل در overlay تمام‌صفحه با صفحه سفید A4، هدر و دکمه بستن/بازگشایی؛ کنترل‌های اصلی و container پاسخ در DOM فرم ثبت باقی می‌مانند.
  - *Log:* `js/modules/events.js:Events.prepareConfiguredFormsA4`, `openConfiguredFormsA4`, `closeConfiguredFormsA4` ساختار موجود `#event-configured-forms-section` و `#event-configured-forms` را در پوسته A4 قرار می‌دهند؛ `renderConfiguredForms` پس از دریافت تعریف فرم، برگه را خودکار باز می‌کند. launcher امکان بازگشایی می‌دهد و submit هنگام بسته بودن برگه ابتدا آن را باز می‌کند تا فیلدهای اجباری پنهان نمانند. Escape و focus trap به‌روزرسانی شدند. `css/events.css` استایل دسکتاپ A4، موبایل، جدول‌ها، فایل‌ها و print را اضافه کرد؛ `index.html` نسخه cache-busting CSS/JS را به `20261108-event-form-a4-modal-1` تغییر داد. تست `tests/event-form-a4-modal.test.js` اضافه شد و asset assertions تست‌های وابسته همگام شدند. قرارداد API/Backend تغییر نکرد.
- [x] **Task 3 — آزمون یکپارچگی و رگرسیون**: آزمون‌های خودکار، سازگاری بین دو مخزن و بررسی مرورگر با موفقیت انجام شد؛ تأیید نهایی Product Owner نیز دریافت شد.
  - *Log:* اجرای GitHub Actions روی commit `d3cc2f3a7d83274b81c501434c8e97571e78bf0d` موفق شد: Frontend regression، syntax، asset/CSS checks، backend unit/integration tests، Apps Script manifest/source validation، contract/diff review و browser UI/performance audit. تست‌های مرورگر برای keyboard و Jalali date-time نیز موفق بودند. Product Owner پس از ادغام، عملکرد نسخه عملیاتی را تأیید کرد.
- [x] **Task 4 — ادغام و تحویل عملیاتی**: تغییرات در مخازن عملیاتی ادغام و نسخه زنده توسط Product Owner تأیید شد.
  - *Log:* Frontend PR #55 با squash در `Saeidesl/PRSPRO2-PRODUCTION:main` ادغام شد؛ merge commit `1219557e076b953e2fd25834315613aaffb760f8`. فایل‌های اجرایی تغییرکرده: `js/modules/events.js`, `css/events.css`, `index.html` و تست‌های مربوطه. Backend PR #30 صرفاً مستندات را با squash در `Saeidesl/PRSPRO2BACKEND-PRODUCTION:main` ادغام کرد؛ merge commit `e65ef9861ef958e362adf51881ef58c36d85572d`. هیچ کد اجرایی/API/Sheet در Backend تغییر نکرد و انتشار Apps Script لازم نبود. Product Owner تست نسخه زنده شامل بازشدن مودال A4، فیلدهای اجباری، تصویر، جدول چندردیفی و ثبت رویداد را موفق اعلام کرد. جزئیات سازوکار انتشار Frontend به‌صورت مستقل از تأیید عملکرد زنده ثبت نشده است.
