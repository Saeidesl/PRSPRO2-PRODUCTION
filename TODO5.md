## 🎯 Current Objective
تکمیل تجربه انتخاب پروژه در فرم ثبت رویداد؛ کد پروژه باید در بالا با فونت بزرگ و برجسته و نام پروژه در پایین با فونت کوچک‌تر نمایش داده شود. جست‌وجو، انتخاب، شناسه ProjectID و APIهای فعلی بدون تغییر می‌مانند.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
- مخازن عملیاتی: `Saeidesl/PRSPRO2-PRODUCTION` و `Saeidesl/PRSPRO2BACKEND-PRODUCTION`.
- شاخه کاری فاز: `feature/project-selector-ux-20261106` در هر دو مخزن؛ شاخه مقصد ادغام `main`.
- Frontend: `pages/events.html` نقطه ورود صفحه رویداد؛ فرم ثبت رویداد به‌صورت پویا در `js/modules/events.js` و متد `Events.openForm()` ساخته می‌شود.
- فیلد مرجع پروژه: `#event-form-project` با `name="ProjectID"`؛ گزینه‌ها از `Events.projects` ساخته می‌شوند و شناسه پایدار هر گزینه با `Events.idOf(project)` تعیین می‌شود.
- عنوان نمایشی پروژه: `project.Title || project.Name`؛ کد: `project.ProjectCode`. انتخاب پیش‌فرض از `preselectedProjectId` حفظ می‌شود.
- تغییر پروژه باید همان رویداد change فیلد مرجع را اجرا کند تا `loadWorkflowProgress`, `loadAmendmentSourceEvents`, `updateSubmitAvailability`, `renderEventQuantityField` و `loadEventContext` بدون تغییر مسیر فعلی اجرا شوند.
- استایل صفحه: `css/events.css`؛ متغیرهای تم از `css/variables.css`, `css/dark-theme.css` و `css/unified-theme.css`.
- Backend مرجع: `Router.js` و `EventService.js`؛ قرارداد ثبت `POST /events` و مقدار `ProjectID` حفظ می‌شود. این فاز نباید API، مجوز، Sheet یا schema جدید ایجاد کند.
- تست‌های فرانت‌اند با Node test runner در `tests/*.test.js`؛ تست‌های مرورگر موجود در `tests/*.browser.cjs`.

## 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** بررسی TODO5 و ARCHITECTURE در هر دو مخزن، وضعیت شاخه‌ها و commitها، ساختار فرم و فیلد انتخاب پروژه، قرارداد نام/کد پروژه و مسیر change.
  - *Log:* TODO5.md و ARCHITECTURE.md هر دو مخزن از main خوانده شدند. آخرین commit مبنا در Backend برابر `881663232a51aa457c5717bfaf956aeca3a11af0` و در Frontend برابر `2d9c7b17147a893d9e276a7fe3355f27d8b7f56d` است. شاخه کاری هم‌نام در هر دو مخزن از همین commitهای main ساخته شد. مسیر موجود `Events.openForm()` و فیلد `#event-form-project` شناسایی شد.
- [x] **Task 2 — اجرای انتخاب‌گر حرفه‌ای پروژه:** تبدیل رابط native انتخاب پروژه به انتخاب‌گر سفارشی با نام و کد پروژه، جست‌وجو، حالت انتخاب‌شده، پشتیبانی RTL/موبایل/تم‌ها و حفظ select مرجع و رویداد change.
- *Log:* در `js/modules/events.js` انتخاب‌گر سفارشی با نام/کد پروژه، جست‌وجوی فارسی، وضعیت انتخاب‌شده و فهرست گزینه‌ها افزوده شد؛ select موجود `#event-form-project` و `ProjectID` منبع حقیقت باقی ماند و رویداد change همان جریان‌های گردش‌کار، فرم، پیش‌نمایش مقدار و پنل اطلاعات کمکی را اجرا می‌کند. در `css/events.css` استایل RTL، واکنش‌گرا و سازگار با تم افزوده شد؛ `index.html` نسخه CSS/JS را برای cache-busting به‌روز کرد؛ تست `tests/project-picker.test.js` افزوده و دو تست موجود `tests/event-queue-project-cards.test.js` و `tests/workflow-management.test.js` برای نسخه جدید asset هماهنگ شدند. Backend/API/permission/Sheet تغییر اجرایی ندارد.
- *Log:* CI روی commit `f74b33563b62833c664c7db4f97529e26bd05f9d` موفق شد: `frontend-check` شامل بررسی Syntax، تست‌های رگرسیون و بررسی asset/CSS؛ `Frontend contract and diff review agent`، `Frontend asset and stylesheet QA agent` و `Validate frontend and backend together` همگی success هستند. آزمون مرورگر Chromium برای keyboard/focus و آزمون تقویم شمسی/انتقال تاریخ به ساعت نیز PASS شدند. گزارش جامع UI به دلیل نبود `PMS_STAGING_API_BASE_URL` فقط در حالت login/public اجرا شد؛ ۰ خطای route/network/console/page و ۰ سرریز افقی موبایل ثبت شد، اما فرم‌های احراز هویت‌شده و خود فرم ثبت رویداد پوشش داده نشدند. بنابراین تأیید نهایی عملکرد انتخاب پروژه در محیط واقعی و ادغام به تست کاربر وابسته است.
- *Log:* در شاخه `feature/project-code-display-order-20261106`، `js/modules/events.js` برای نمایش کد در عنصر برجسته و نام در خط بعدی اصلاح شد؛ در `css/events.css` اندازه کد 21px (موبایل 19px) و نام 12px (موبایل 11px) تنظیم شد؛ `index.html` برای cache-busting به‌روزرسانی شد و `tests/project-picker.test.js` تست ترتیب و سلسله‌مراتب فونت را پوشش می‌دهد. API و payload و منطق انتخاب دست‌نخورده‌اند.
- [ ] **Task 3 — آزمون و کنترل سازگاری (IN PROGRESS):** اجرای تست‌های رگرسیون و CI، بررسی حفظ ProjectID و پیش‌انتخاب و گردش‌کار، سپس آماده‌سازی PR برای ادغام پس از تأیید.
