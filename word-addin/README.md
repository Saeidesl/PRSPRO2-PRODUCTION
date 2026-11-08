# افزونه Word برای PMS

## وضعیت
نسخه MVP اولیه؛ هنوز برای استفاده عملیاتی یا توزیع سازمانی تأیید نشده است.

## نصب آزمایشی
1. ابتدا فرانت‌اند عملیاتی باید از شاخه کاری منتشر شود تا مسیر زیر در دسترس باشد:
   `https://saeidesl.github.io/PRSPRO2-PRODUCTION/word-addin/taskpane.html`
2. فایل `manifest.xml` را در Word ویندوز از مسیر Insert > Get Add-ins > My Add-ins > Upload My Add-in بارگذاری کنید (در صورت فعال بودن این قابلیت در سازمان).
3. برای Word Online از Insert > Add-ins > My Add-ins و بارگذاری manifest استفاده کنید؛ روش در دسترس ممکن است به سیاست Microsoft 365 سازمان وابسته باشد.
4. وارد PMS شوید، پروژه را انتخاب کنید و اطلاعات را در Content Controls درج کنید.

## شناسه‌های پشتیبانی‌شده در MVP
در Word از Developer > Controls یک Rich Text Content Control درج و در Properties مقدار Tag را دقیقاً یکی از موارد زیر قرار دهید:
- `PROJECT_NAME` — نام پروژه
- `PROJECT_CODE` — کد پروژه
- `TOTAL_QUANTITY` — تعداد
- `PROJECT_DESCRIPTION` — توضیحات
- `PROJECT_STATUS` — وضعیت
- `PROJECT_ID` — شناسه داخلی

## امنیت و محدودیت‌ها
- ورود با همان حساب PMS و مسیر فعلی `POST /auth/login` انجام می‌شود.
- توکن فقط در حافظه task pane نگهداری می‌شود و داخل سند یا localStorage نوشته نمی‌شود؛ با بستن/بارگذاری مجدد افزونه باید دوباره وارد شد.
- درخواست‌ها از مسیرهای موجود `GET /projects` و `GET /projects/:id` استفاده می‌کنند و مجوزها در Backend مرجع نهایی‌اند.
- MVP فعلاً فقط فیلدهای ساده پروژه را درج می‌کند؛ جدول‌های چندردیفی، اطلاعات مرکزی، تصاویر و بهبود قالب‌بندی در Task 3 هستند.
- ارتباط Office Add-in با Google Apps Script، ورود، دریافت پروژه و درج Content Control باید در Word Desktop و Word Online واقعی آزمایش شود. تا پیش از این آزمایش، پشتیبانی عملیاتی و سازگاری کامل ادعا نمی‌شود.
- افزونه هیچ داده‌ای را در دیتابیس تغییر نمی‌دهد و قالب اصلی Word را ذخیره یا بازنویسی نمی‌کند.
