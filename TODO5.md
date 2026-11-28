## 🎯 Current Objective
جایگزینی مسیر «ثبت رویداد» مرتبط با پروژه با صفحه اختصاصی «ثبت اطلاعات» برای مدیریت اطلاعات طراحی، الگو‌سازی و نمونه‌دوزی؛ اطلاعات هر پروژه در رکورد مستقل و قابل بازیابی/ویرایش ذخیره شود. در این مرحله فقط Discovery انجام شده و هیچ کد اجرایی تغییر نکرده است.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
- مخزن عملیاتی Frontend: `Saeidesl/PRSPRO2-PRODUCTION`؛ مبنا `main`؛ شاخه فاز: `feat/project-information-register-20261128`.
- مخزن عملیاتی Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`؛ مبنا `main`؛ در Discovery فقط بررسی شد. TODO5 بک‌اند `Ready for the next feature` است.
- صفحه رویداد: `pages/events.html`؛ مسیر انتخاب پروژه و ورود فعلی در `js/modules/events.js`. مسیر فعلی مرتبط با پروژه از کارت/entry انتخاب پروژه به فرم ثبت رویداد متصل است و باید با بررسی دقیق handlerها و modalها جایگزین شود، نه به‌صورت مسیر موازی.
- لایه API Frontend: `js/core/api.js`؛ استفاده از API wrapper موجود (token، error handling، caching/invalidation) الزامی است.
- Backend موجود: `Router.js` و `EventService.js`؛ کنترل Tenant/permissions و دسترسی پروژه در سرویس‌های فعلی. هر API جدید باید از Router، AccessControlService و الگوی Response موجود استفاده کند.
- Google Sheets: ساخت Sheet اختصاصی با headerهای داده درخواستی و شناسه ارتباطی پروژه (ProjectID)؛ رکورد واحد به‌ازای هر پروژه، با کنترل duplicate و عملیات update به‌جای insert تکراری. نام دقیق sheet و repository پس از ردیابی DatabaseSetup و repository patterns در Task 2 تعیین شود.
- قرارداد داده پیشنهادی: ProjectID (کلید ارتباطی/unique)، کد، عنوان، طراح، الگو ساز، نمونه دوز، تعداد، جنس پارچه، سایز بندی، شروع الگو سازی، پایان الگو سازی، شروع نمونه دوزی، پایان نمونه دوزی، تاریخ تایید توسط مدیر، تاریخ ارسال به برش. ProjectID ممکن است ستون فنی باشد و در UI نمایش داده نشود؛ کد و عنوان نیز از نظر business rule نیاز به تطبیق با داده پروژه دارد.
- رفتار UI: دکمه مرتبط با پروژه نام «ثبت اطلاعات» داشته باشد؛ بازشدن صفحه/فرم اختصاصی. در بازکردن، وجود رکورد بررسی شود؛ رکورد موجود به فرم populate شود و قابل ویرایش باشد؛ در غیر این صورت فرم خالی. Save برای رکورد موجود update و برای رکورد جدید insert؛ جلوگیری از رکورد تکراری.
- محدوده: بازطراحی مسیر مرتبط با ثبت اطلاعات پروژه؛ ثبت مستقل رویدادها، تاریخچه عمومی و دیگر گردش‌های رویداد بدون بررسی/تصمیم جداگانه دست‌نخورده بمانند. از حذف functionality یا داده موجود اجتناب شود.
- مشخصات سایزبندی و قالب ذخیره‌سازی آن در Task 2 باید با داده/الگوهای فعلی پروژه (رنگ/سایز یا اطلاعات مرکزی) سازگار بررسی شود؛ فرض اولیه ذخیره ساختار قابل بازسازی JSON است، تصمیم قطعی بعد از بررسی.
- فایل‌های معماری/کد در Discovery: `pages/events.html`, `js/modules/events.js`, Backend `Router.js`, `EventService.js`, `DatabaseSetup.js` و repository patterns. بررسی اولیه ساختار UI و event service انجام شد؛ ردیابی کامل API/schema و مجوزها در Macro-task بعدی.

## 📋 Macro-Task Queue & Implementation Log
- [x] Task 1 — Discovery & Planning: مرور TODO5/ARCHITECTURE، baseline مخازن و branch، صفحه ورود به ثبت رویداد، ساختار API و ذخیره‌سازی؛ تعریف نقشه و task queue.
  - *Log:* Frontend `main` آخرین commit مشاهده‌شده `70aeb8252edc458cba4612e6a8ed6a971d9ed710`؛ branch فاز `feat/project-information-register-20261128` از `main` ساخته شد. Backend `main` آخرین commit قابل مشاهده در نتایج commit `98917163a1681f8878f37f9e8b7f49a8ed0b191e` و TODO5 برابر «Ready for the next feature» بود. `pages/events.html` مسیرهای «ثبت از طریق پروژه»، «کارهای من» و «ثبت مستقل» را دارد؛ `js/modules/events.js` ماژول مرکزی entry، فرم، بارگذاری پروژه و رویداد، cache و modal را مدیریت می‌کند. Backend `EventService.js` منطق رویداد، tenant/project access و workflow را دارد؛ `Router.js` و `DatabaseSetup.js` باید در Task 2 به‌طور کامل برای مسیر sheet/repository/permissions بررسی شوند. هیچ کد اجرایی، API یا داده عملیاتی تغییر نکرده است.
- [ ] Task 2 — Data Model, Backend API & Save/Load Contract (IN PROGRESS): بررسی دقیق repository/DB setup، ایجاد Sheet اختصاصی و CRUD ایمن tenant/project-scoped برای اطلاعات فرم، کنترل یکتایی ProjectID، payload/validation و تست runtime.
- [ ] Task 3 — Frontend «ثبت اطلاعات»: جایگزینی entry/action مرتبط با ثبت رویداد پروژه با دکمه «ثبت اطلاعات»، فرم واکنش‌گرا و populate/edit/save متصل به API جدید؛ حفظ مسیرهای مستقل و تاریخچه عمومی.
- [ ] Task 4 — Integration, Regression & Operational Acceptance: تست یکپارچه، permissions/tenant، duplicate/update، سازگاری سایزبندی، responsive، cache invalidation، CI و راهنمای تست کاربر؛ توقف برای تأیید Product Owner.
