## 🎯 Current Objective

پشتیبانی سازگار Frontend از قابلیت اعلان تلگرام پس از ثبت رویداد، بدون تغییر مسیر فعلی ثبت رویداد یا ایجاد UI/فرم موازی. تصمیم محصولی تأییدشده: اعلان برای رویدادهای پروژه‌ای و مستقل ارسال شود؛ جزئیات فرم‌های متصل و داده‌های ثبت‌شده در پیام Backend درج می‌شوند.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

### مخازن و شاخه
- Frontend عملیاتی: `Saeidesl/PRSPRO2-PRODUCTION`
- Backend عملیاتی متناظر: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`
- شاخه کاری فاز: `feat/telegram-event-notifications-20261107`
- Frontend baseline: `1758a295b4158d32799667f3cf30644178e90c87`
- Backend baseline: `1c9c9be4cc6c92fdc6e35d5bf19740945740264e`
- `TODO5.md` پیش از شروع «Ready for the next feature» بود؛ `ARCHITECTURE.md` موجود است.

### مسیر فعلی ثبت
- `pages/events.html`: صفحه عملیاتی ثبت رویداد.
- `js/modules/events.js`: `Events.submitForm`، `collectConfiguredFormResponses`، `uploadConfiguredFormImages` و `uploadConfiguredFormFile`؛ اطلاعات فرم و پیوست‌ها را آماده و از همان جریان موجود ارسال می‌کند.
- `js/core/api.js`: لایه transport واحد `PMS.Api`.
- API موجود: `POST /events`؛ پیوست‌ها از مسیر موجود `POST /projects/:projectId/attachments` بارگذاری می‌شوند.
- Backend پس از ثبت موفق رویداد اعلان را می‌فرستد؛ Frontend نباید پیام تلگرام را جداگانه ارسال کند یا مسیر دوم بسازد.
- رویداد مستقل بدون ProjectID در Backend پشتیبانی می‌شود؛ Frontend نباید برای آن پروژه اجباری کند.

### قراردادهای داده مرتبط
- Backend جزئیات را از `13_Events`, `35_EventFormData`, `15_Attachments` و تنظیمات امن Tenant دریافت می‌کند.
- پاسخ فرم‌های چندردیفی و تصویر از همان `FormResponses` موجود ارسال می‌شوند.
- در این فاز هیچ Sheet، API، فرم یا جریان ثبت جدیدی در Frontend تعریف نمی‌شود.

## 📋 Macro-Task Queue & Implementation Log

- [x] **Task 1 — Discovery & Planning**: بررسی صفحه ثبت، submit، upload و قرارداد API انجام شد.
  - *Log:* `pages/events.html` میزبان فرم موجود است؛ `js/modules/events.js:Events.submitForm` پاسخ‌ها را با `collectConfiguredFormResponses` جمع می‌کند و فایل‌ها را از مسیرهای موجود بارگذاری می‌کند؛ `js/core/api.js:PMS.Api` transport واحد است. اعلان از Backend انجام می‌شود و به تغییر UI یا ارسال جداگانه Frontend نیاز ندارد. شاخه کاری فاز از baseline عملیاتی ساخته شد.
- [ ] **Task 2 — بررسی سازگاری Frontend با رویداد مستقل و payloadهای موجود (IN PROGRESS)**: اطمینان از اینکه فرم ثبت، ارسال رویداد مستقل را با همان API موجود پشتیبانی می‌کند و پاسخ‌های چندردیفی/تصویری بدون تغییر قرارداد در payload موجود باقی می‌مانند؛ فقط در صورت کشف نقص واقعی اصلاح شود.
- [ ] **Task 3 — آزمون یکپارچه Frontend/Backend**: بررسی payloadهای پروژه‌ای و مستقل، idempotency، پاسخ فرم‌ها و پیوست‌ها در کنار Backend؛ عدم ارسال اعلان از Frontend.
- [ ] **Task 4 — همگام‌سازی و انتشار Frontend در صورت نیاز**: اگر هیچ تغییر اجرایی Frontend لازم نبود، فقط ثبت سازگاری در PR انجام شود و انتشار Frontend بی‌دلیل اجرا نشود؛ در غیر این صورت تست، PR و GitHub Pages طبق workflow موجود.
