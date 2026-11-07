## 🎯 Current Objective

افزودن مودال مستقل و مرحله‌به‌مرحله برای نمایش وضعیت واقعی ثبت رویداد پس از کلیک روی دکمه ثبت؛ شامل آماده‌سازی فرم و آپلود فایل‌ها/تصاویر، ثبت رویداد در API موجود و تازه‌سازی فهرست. نمایش وضعیت‌ها باید بر رویدادهای واقعی جریان اجرا متکی باشد، نه تایمر یا درصد ساختگی. حفظ مسیرهای فعلی، ترتیب تصاویر، cache آپلود، idempotency، فرم اصلاحی، رفتار رویداد مستقل/پروژه‌ای و دسترس‌پذیری الزامی است.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

### مخازن و شاخه‌های عملیاتی
- Frontend: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه `feat/event-submit-progress-modal-20261107`، مبنا از main با HEAD `e44defc54d365cfeb592192052c3dc3423ae3d10`.
- Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه `feat/event-submit-progress-modal-20261107`، مبنا از main با HEAD `776b2e75848d5d74201607191499a2f2c1bd6ad5`.
- هر دو مخزن عملیاتی و مستندات `TODO5.md` و `ARCHITECTURE.md` بررسی شدند. شاخه‌های اختصاصی از SHAهای تأییدشده main ساخته شدند؛ مخازن توسعه و شاخه main تغییر نمی‌کنند.

### مسیر موجود ثبت رویداد در Frontend
- `pages/events.html`: صفحه عملیاتی رویدادها؛ مودال ثبت به‌صورت پویا در ماژول ساخته می‌شود و markup ثابت در HTML صفحه ندارد.
- `js/modules/events.js`:
  - `Events.openForm`: عنصر `#event-create-modal` و فرم `#event-create-form` را می‌سازد. ناحیه فعلی `#event-submit-progress` فقط یک spinner و متن عمومی دارد.
  - `Events.bindEvents`: submit فرم را به `submitForm()` متصل می‌کند؛ Escape و بستن modal در زمان submitting محدود شده‌اند.
  - `Events.submitForm`: اعتبارسنجی همگام، فعال‌سازی فوری submitting، سپس `await collectConfiguredFormResponses(projectId)`، ساخت payload و ارسال درخواست اصلی؛ در حالت اصلاحی مسیر موجود `PUT /events/:eventId/forms/:formId` نیز اجرا می‌شود.
  - `Events.collectConfiguredFormResponses`: پیمایش فرم‌ها، فیلدها و ردیف‌های جدول؛ upload فایل/تصویر را قبل از ارسال رویداد اجرا می‌کند.
  - `Events.uploadConfiguredFormImages`: حداکثر ۲۰ تصویر را با concurrency برابر ۳ از مسیر upload موجود می‌فرستد و ترتیب نتایج را حفظ می‌کند.
  - `Events.uploadConfiguredFormFile`: cache فایل آپلودشده را بررسی می‌کند، فایل را با `getConfiguredFormFileData` آماده و از API موجود پیوست پروژه استفاده می‌کند.
  - `Events.setSubmitState`: وضعیت busy فرم، دکمه، انصراف و spinner فعلی را کنترل می‌کند.
  - پس از API ثبت، cacheها invalid می‌شوند، `closeForm(true)` اجرا و `reloadEvents()` برای تازه‌سازی فهرست فراخوانی می‌شود؛ خطای refresh از موفقیت ثبت جدا شده و `showRefreshNotice()` نمایش داده می‌شود.
  - `showEventSubmissionResult`: پنل نتیجه فعلی بعد از بسته‌شدن فرم را نمایش می‌دهد؛ باید با مودال پیشرفت سازگار بماند.
- `css/events.css`: استایل مودال، spinner، progress فعلی، انیمیشن و breakpointهای موبایل؛ استایل مودال پیشرفت جدید باید در همین فایل و با tokenهای رنگ موجود و تم روشن/تاریک اضافه شود.
- `index.html`: بارگذاری `css/events.css` و ماژول `js/modules/events.js`؛ پس از تغییر باید cache-busting نسخه asset به‌روز شود.

### مراحل واقعی قابل نمایش و قرارداد داده
1. «آماده‌سازی فرم و آپلود پیوست‌ها»: از ورود به `collectConfiguredFormResponses` تا تکمیل واقعی uploadها. شمارنده فایل فقط از تعداد فایل‌های انتخاب‌شده و نتیجه موفق واقعی upload به‌روزرسانی می‌شود؛ فایل cacheشده نباید دوباره upload یا دوبار شمرده شود.
2. «ثبت رویداد»: شروع و پایان واقعی `PMS.Api.post('/events', payload)` یا مسیر اصلاحی `PMS.Api.put('/events/:eventId/forms/:formId')`. وضعیت success فقط پس از پاسخ موفق API.
3. «تازه‌سازی فهرست»: اجرای `reloadEvents()`. شکست این مرحله نباید موفقیت ثبت رویداد را به خطای ثبت تبدیل کند؛ رفتار فعلی `showRefreshNotice()` حفظ شود.
- مودال پیشرفت باید از submit تا پایان refresh روی صفحه باقی بماند، ورودی/بستن فرم زیرین را در زمان عملیات غیرقابل‌استفاده کند و در موفقیت، پایان واضح با تیک‌ها نشان دهد.
- در خطای upload یا API، مرحله واقعی خطا مشخص شود؛ overlay امکان بسته‌شدن داشته باشد تا پیام خطای فعلی و امکان retry با همان idempotency fingerprint حفظ شود. از retry خودکار یا ایجاد رویداد تکراری اجتناب شود.
- اگر هیچ فایل تازه‌ای برای upload وجود ندارد، مرحله upload با وضعیت «نیازی نبود» تکمیل شود.
- رعایت `prefers-reduced-motion`، `role=status`/`aria-live` و فوکوس/کیبورد الزامی است.

### Backend و قراردادهای موجود
- Backend runtime در محدوده این قابلیت نیازمند تغییر نیست.
- `Router.js`: `POST /events` با مجوز `EVENT_CREATE`؛ `POST /projects/:projectId/attachments` با مجوز `ATTACHMENT_UPLOAD`.
- `EventService.js:create` و `_createUnlocked_`: منطق ثبت و idempotency موجود.
- `AttachmentService.js`: اعتبارسنجی مالکیت/tenant و ذخیره پیوست.
- هیچ API، Sheet، schema، permission یا مسیر موازی جدید ایجاد نشود.

## 📋 Macro-Task Queue & Implementation Log

### Task 1 — Discovery & Planning: ردیابی جریان ثبت و تعریف مراحل مودال [x]
- هر دو مخزن عملیاتی، شاخه main، آخرین commit، TODO5 و ARCHITECTURE بررسی شدند؛ شاخه اختصاصی فاز در هر دو مخزن ساخته شد.
- مسیر پویا‌سازی مودال، submit، جمع‌آوری فرم، آپلود تصاویر، API ثبت، refresh و مدیریت نتیجه/خطا ردیابی شد.
- تصمیم: پیاده‌سازی Frontend-only؛ Backend runtime و قراردادهای API بدون تغییر.
- *Log:* Frontend: `pages/events.html`, `js/modules/events.js:openForm`, `bindEvents`, `submitForm`, `collectConfiguredFormResponses`, `uploadConfiguredFormImages`, `uploadConfiguredFormFile`, `getConfiguredFormFileData`, `setSubmitState`, `reloadEvents`, `showRefreshNotice`, `showEventSubmissionResult`, `closeForm`; `css/events.css`; `index.html`. Backend: `Router.js`, `EventService.js:create/_createUnlocked_`, `AttachmentService.js` و APIهای موجود. مبنای شاخه‌ها: FE `e44defc54d365cfeb592192052c3dc3423ae3d10`، BE `776b2e75848d5d74201607191499a2f2c1bd6ad5`.

### Task 2 — پیاده‌سازی مودال پیشرفت واقعی و اتصال به جریان ثبت [x]
- overlay مستقل و responsive با سه مرحله و حالت‌های pending/active/success/warning/error پیاده‌سازی شد؛ در نبود فایل جدید، مرحله آماده‌سازی توضیح «فایل جدیدی برای بارگذاری وجود نداشت» نشان می‌دهد.
- شمارنده آپلود از تعداد فایل‌های انتخاب‌شده و پاسخ موفق واقعی Attachment API تغذیه می‌شود؛ فایل‌های cache‌شده دوباره آپلود یا دوباره شمرده نمی‌شوند.
- مرحله ثبت پس از پاسخ موفق POST/PUT تکمیل می‌شود؛ مرحله refresh به نتیجه واقعی `reloadEvents()` متصل است و شکست refresh با موفقیت ثبت اشتباه نمی‌شود.
- خطاها در مرحله مربوطه نمایش داده می‌شوند؛ بستن مودال خطا کاربر را به فرم موجود برای retry بازمی‌گرداند و idempotency فعلی حفظ می‌شود.
- فوکوس صفحه‌کلید، Escape فقط پس از پایان/خطا، RTL، موبایل، تم روشن/تاریک و `prefers-reduced-motion` پوشش داده شدند.
- *Log:* `js/modules/events.js`: `bindEvents`، `submitForm`، `openSubmitProgressModal`، `renderSubmitProgressModal`، `setSubmitProgressStep`، `recordSubmitProgressUpload`، `completeSubmitProgress`، `failSubmitProgress`، `closeSubmitProgressModal`، `uploadConfiguredFormFile`، `reloadEvents` و focus trap سراسری؛ `css/events.css`: استایل overlay، مراحل، progress bar، حالت‌های موفق/خطا، موبایل و reduced-motion؛ `index.html`: cache-busting برای CSS و JS؛ تست جدید `tests/event-submit-progress-modal.test.js` و به‌روزرسانی نسخه asset در تست‌های رویداد/پروژه/workflow. CI روی commit `17cdcbb2ea36034e3ce1b30f87292f2c6c274367`: syntax، asset/CSS و regression موفق؛ ۲۰۱ تست Frontend از ۲۰۱ موفق؛ Cross-repository QA و Frontend agent suite موفق.

### Task 3 — Regression، QA، ادغام و انتشار Frontend (IN PROGRESS)
- تست‌های خودکار برای no-file، single/multiple image، multi-row image/file، upload failure، POST failure، amendment PUT، refresh failure و جلوگیری از submit تکراری.
- بررسی accessibility، RTL، موبایل، تم روشن/تاریک، reduced-motion، console و network errors.
- اجرای CI و QA؛ بازبینی diff و سازگاری با Backend؛ ادغام فقط پس از موفقیت کنترل‌ها.
- انتشار GitHub Pages و تأیید deployment؛ سپس تست نسخه زنده توسط مالک محصول. Backend deployment لازم نیست مگر اینکه نیاز واقعی به تغییر runtime اثبات شود.
