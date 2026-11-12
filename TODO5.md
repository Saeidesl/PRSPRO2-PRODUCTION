## 🎯 Current Objective
حذف دو المان غیرضروری از سربرگ صفحه رویدادها در نسخه عملیاتی، بدون تغییر مسیرهای ثبت، مجوزها، داده‌ها یا سایر اجزای صفحه.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
- مخازن عملیاتی: `Saeidesl/PRSPRO2-PRODUCTION` و `Saeidesl/PRSPRO2BACKEND-PRODUCTION`.
- شاخه کاری این فاز در هر دو مخزن: `feat/events-page-remove-intro-20261112`؛ شاخه مبنا `main`.
- Frontend: HTML/CSS/JavaScript؛ صفحه رویدادها از `pages/events.html` بارگذاری می‌شود.
- محل دقیق المان‌ها در `pages/events.html`:
  - `.events-page-intro`: شامل kicker «مرکز عملیات»، عنوان «ثبت و پیگیری رویدادها» و متن توضیحی.
  - `.event-center-status`: برچسب «محیط یکپارچه ثبت» در `.page-header-actions`.
  - دکمه `#events-create-project-button` در همان ناحیه یک کنترل مستقل و دارای رفتار پویا است؛ حذف یا مختل نشود.
- ساختارهای بعدی صفحه که باید حفظ شوند: `.event-entry-grid`، پنل انتخاب پروژه `#events-project-entry-panel`، صف‌های پروژه `#event-project-queues`، تب‌ها و پنل‌های وضعیت، سوابق `.events-history-section`، جستجو و فیلترها.
- `js/modules/events.js` منطق صفحه، ثبت رویداد، بارگذاری داده‌ها و تعاملات را مدیریت می‌کند؛ برای این تغییر نیازی به دست‌کاری آن نیست.
- `index.html` فایل‌های صفحه و ماژول‌ها را بارگذاری می‌کند؛ فقط در صورت نیاز واقعی به cache-busting تغییر می‌کند.
- Backend: Google Apps Script V8، Router.js و سرویس‌های موجود رویداد؛ در این تغییر هیچ API، payload، permission، شیت یا داده‌ای نیاز به تغییر ندارد.
- مسیرها و جریان‌های موجود ثبت پروژه‌محور، کارهای من، ثبت مستقل و سوابق باید عیناً حفظ شوند.

## 📋 Macro-Task Queue & Implementation Log
- [x] Task 1 — Discovery & Planning
  - بررسی TODO5.md و ARCHITECTURE.md هر دو مخزن عملیاتی؛ هر دو TODO5 در شروع فاز آماده بودند.
  - شاخه‌های کاری اختصاصی از main ایجاد شدند؛ main و شاخه‌های محافظت‌شده دست‌نخورده می‌مانند.
  - محل دقیق دو المان و اجزای همسایه شناسایی شد. دکمه ایجاد پروژه و همه ساختارهای اصلی صفحه باید حفظ شوند.
- [ ] Task 2 — حذف هدفمند المان‌ها و اعتبارسنجی رگرسیون (IN PROGRESS)
  - حذف فقط `.events-page-intro` و `.event-center-status` از `pages/events.html`.
  - حفظ `#events-create-project-button` و تمام بخش‌های عملیاتی صفحه.
  - اجرای تست‌های موجود Frontend و بررسی diff برای اطمینان از عدم تغییر API/Backend.
- [ ] Task 3 — تحویل و پذیرش عملیاتی
  - بازبینی نهایی سازگاری، ایجاد PR و ادغام فقط پس از بررسی CI.
  - انتشار Frontend از workflow رسمی و ارائه سناریوی تست زنده به Product Owner؛ تا پیش از تأیید کاربر، فاز بسته نشود.
