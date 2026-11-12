## 🎯 Current Objective
یکپارچه‌سازی فهرست پروژه‌ها در صفحه رویدادها و بازطراحی کارت‌ها مطابق طرح تأییدشده Product Owner:
- حذف تب‌ها و پنل‌های سه‌گانه «در انتظار اقدام»، «در حال انجام» و «تکمیل‌شده» و نمایش همه پروژه‌ها در یک فهرست واحد.
- حفظ تشخیص وضعیت کسب‌وکاری هر پروژه و نمایش آن به‌صورت برچسب؛ رنگ وضعیت فقط به شکل نوار باریک در لبه راست کارت (نارنجی/آبی/سبز).
- کارت دو نیمه مساوی داشته باشد: تصویر پروفایل در نیمه چپ (۵۰٪ عرض کارت) و اطلاعات در نیمه راست؛ کد پروژه برجسته‌تر از نام پروژه.
- سه دکمه کوچک هم‌اندازه و هم‌ردیف: «ثبت رویداد»، «رویدادهای ثبت‌شده» و «مشاهده». دکمه مشاهده در این فاز فقط نمایشی و بدون اتصال است.
- حفظ ثبت رویداد، درخواست ثبت تغییرات پروژه تکمیل‌شده، مشاهده تاریخچه، بارگذاری تصویر، مجوزها، جستجو/فیلتر/مرتب‌سازی و گردش‌کار موجود.
- تفکیک سه وضعیت مستقل: وضعیت اجرا (محاسبه‌شده از رویدادهای مرتبط با کاربر/واحد)، وضعیت کلی پروژه (فیلد Status و نام از ProjectStatusService)، وضعیت پروژه در مرحله (CurrentStepStatus همراه نام مرحله از CurrentStepID/WorkflowStepRepository).
- نام وضعیت کلی و مرحله در همان پاسخ گروهی GET /projects?view=event-picker ارائه می‌شود؛ بدون تغییر DB/schema.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
- مخازن عملیاتی: `Saeidesl/PRSPRO2-PRODUCTION` و `Saeidesl/PRSPRO2BACKEND-PRODUCTION`.
- شاخه کاری این فاز در هر دو مخزن: `feat/events-unified-project-cards-20261113`؛ مبنا `main`.
- شروع فاز: Frontend main در commit `2ecc0358a3b0df66caec2ef66bd63286fd8618b8`؛ Backend main در commit `913148044a31b0a76ee0a010e36602e5748bb8b5`.
- فایل صفحه: `pages/events.html`. ساختار فعلی `.event-project-queues` شامل `.event-queue-tabs` و `.event-queue-panels` و سه container با شناسه‌های `event-queue-pending`, `event-queue-progress`, `event-queue-completed` است.
- منطق: `js/modules/events.js`.
  - `Events.init()` وضعیت اولیه را با `activateQueue('progress')` فعال می‌کند.
  - `Events.activateQueue(key)` تب و پنل فعال را کنترل می‌کند.
  - `Events.getLatestEventByProject(events)` آخرین رویداد معتبر هر پروژه را استخراج می‌کند.
  - `Events.getProjectStatusTone(status)` وضعیت مرحله را به tone نگاشت می‌کند.
  - `Events.renderProjectQueues()` فعالیت‌های مرتبط با کاربر/واحد را از رویدادهای موجود تجمیع و پروژه‌ها را به سه صف تقسیم می‌کند؛ رندر کارت، دکمه ثبت/درخواست تغییر، تاریخچه و آخرین رویداد در همین تابع انجام می‌شود.
  - `Events.loadQueueProjectImages(projects)` و `Events.queueProjectImageAttachments` تصاویر پروفایل را با ماژول موجود Projects و مجوز `ATTACHMENT_VIEW` بارگذاری می‌کنند.
  - `Events.bindEvents()` و listenerهای delegation مربوط به `.event-queue-register-button`, `.event-queue-change-request-button`, `.event-queue-history-button` رفتارهای فعلی را متصل می‌کنند؛ مسیرها باید حفظ شوند.
  - `Events.applyFilters()` در هر بار اعمال فیلتر `renderProjectQueues()` را فراخوانی می‌کند؛ فیلترهای تاریخچه رویدادها مستقل از فهرست پروژه‌ها باقی بمانند.
  - `Events.highlightCreatedProject(projectId)` در حال حاضر با `data-queue` صف پروژه را فعال می‌کند؛ پس از حذف تب‌ها باید بدون فعال‌سازی صف، کارت یکپارچه را پیدا و برجسته کند.
- استایل‌ها: `css/events.css`؛ ساختارهای `.event-queue-project`, `.event-queue-project-main`, `.event-queue-project-media`, `.event-queue-project-copy`, `.event-queue-latest-event`, `.event-queue-project-actions` و کلاس‌های وضعیت فعلی باید بررسی و در همان فایل گسترش یابند. فایل responsive مشترک `css/responsive.css` نیز در بازبینی breakpointها لحاظ شود.
- بارگذاری assetها در `index.html`؛ cache-busting نسخه CSS و JS پس از تغییر به‌روزرسانی شود.
- داده‌ها از APIهای موجود `GET /projects?view=event-picker`, `GET /events`, `GET /event-types` می‌آیند؛ API جدید یا تغییر payload لازم نیست.
- Backend در `Router.js`, `EventService.js`, `ProjectService.js` و شیت‌های عملیاتی موجود منبع قرارداد و داده است؛ برای این بازطراحی تغییری پیش‌بینی نشده است.
- تصویر پروفایل از مسیر فعلی پیوست‌های پروژه و تابع `Projects.getProjectCardAttachments` خوانده می‌شود؛ ذخیره‌سازی و دسترسی امن موجود حفظ می‌شود.
- آزمون‌های موجود در `tests/` باید برای رفتار فهرست یکپارچه، status tone، حفظ دکمه‌های عملیاتی، تصویر ۵۰٪ و دکمه مشاهده بدون handler پوشش داده شوند. CIهای اصلی: `.github/workflows/frontend-check.yml`, `pms-cross-repo-qa.yml`, `pms-frontend-agent-suite.yml` و `deploy-pages-staging.yml`.

## 📋 Macro-Task Queue & Implementation Log
- [x] Task 1 — Discovery & Planning
  - بررسی `TODO5.md` و `ARCHITECTURE.md` هر دو مخزن عملیاتی؛ Backend TODO5 آماده فاز جدید بود و Frontend TODO5 با وضعیت فاز قبلی باقی مانده بود، در حالی‌که ادغام و پذیرش آن در سوابق main ثبت شده است؛ وضعیت قبلی با این فاز جدید جایگزین شد.
  - دسترسی، مجوز push، شاخه پیش‌فرض `main`، آخرین commitها و شاخه کاری اختصاصی هر دو مخزن بررسی شد؛ هیچ تغییر روی main انجام نشد.
  - ساختار HTML، منطق رندر/تقسیم صف، بارگذاری تصاویر، listenerهای عملیات و CSS صفحه رویدادها بررسی شد.
  - نتیجه: تغییر Backend/API/DB لازم نیست؛ منطق دسته‌بندی وضعیت حفظ و فقط نمایش آن یکپارچه می‌شود.
  - *Log:* فایل‌های `pages/events.html`, `js/modules/events.js`, `css/events.css`, `index.html` و معماری Backend شامل `Router.js`, `EventService.js`, `ProjectService.js` شناسایی شدند؛ نقاط اتصال و APIهای موجود در Technical Spec ثبت شد.
- [ ] Task 2 — یکپارچه‌سازی فهرست و بازطراحی کارت‌های پروژه (IN PROGRESS)
  - حذف تب‌ها و پنل‌های سه‌گانه و جایگزینی با یک container مشترک.
  - حفظ محاسبه وضعیت پروژه و نمایش badge + نوار باریک رنگی در لبه راست کارت.
  - تصویر در ۵۰٪ سمت چپ، اطلاعات در سمت راست؛ کد پروژه در اولویت بصری.
  - سه دکمه هم‌اندازه و هم‌ردیف؛ دکمه «مشاهده» صرفاً نمایشی.
  - حفظ همه handlerها و رفتارهای فعلی و اصلاح highlight پروژه تازه ایجادشده.
  - اصلاح تکمیلی پس از تست Product Owner: متن badge دقیقاً از وضعیت صف یکپارچه (`در انتظار اقدام`، `در حال انجام`، `تکمیل‌شده`) نمایش داده می‌شود و دیگر مقدار خام `project.Status` مانند ACTIVE را نشان نمی‌دهد.
- [ ] Task 3 — آزمون رگرسیون، تحویل و پذیرش عملیاتی
  - اجرای تست‌های خودکار و بررسی responsive/RTL، مجوزها، تصاویر و مسیرهای عملیات.
  - ایجاد PR و ادغام فقط پس از بررسی CI و اجازه Product Owner.
  - انتشار Frontend از workflow رسمی؛ ارائه سناریوهای تست زنده و توقف تا تأیید کاربر.

- [ ] Task 4 — نمایش سه وضعیت مستقل در کارت‌ها (IN PROGRESS)
  - Backend قرارداد `GET /projects?view=event-picker` را با `OverallStatusName` و `CurrentStepName` غنی می‌کند؛ Frontend سه برچسب مستقل را نمایش می‌دهد.
  - وضعیت اجرا همچنان از رویدادهای مرتبط محاسبه می‌شود؛ رنگ نوار کناری و عملکرد دکمه‌ها/فیلترها حفظ می‌شود.
