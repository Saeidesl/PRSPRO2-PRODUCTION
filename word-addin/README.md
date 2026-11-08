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

## کنترل‌های خودکار
Workflow فایل `.github/workflows/word-addin-check.yml` در push شاخه کاری و Pull Request به main اجرا می‌شود و موارد زیر را بررسی می‌کند:
- نحو JavaScript فایل task pane
- معتبر بودن XML manifest و HTTPS بودن نشانی task pane
- وجود فایل‌های موردنیاز
- وجود شناسه‌های شش‌گانه و عدم ذخیره token در localStorage

این کنترل‌ها جایگزین تست در Word واقعی، تست CORS/API یا تأیید Microsoft 365 نیستند.

## میزبانی
نشانی داخل manifest به GitHub Pages مخزن عملیاتی اشاره می‌کند. فعال بودن Pages و دسترسی عمومی این مسیر هنوز از این مرحله تأیید نشده است؛ تا زمان انتشار/تأیید میزبانی، نصب افزونه در Word ممکن نیست. هیچ تغییر یا deployment روی نسخه زنده PMS انجام نشده است.

## امنیت و محدودیت‌ها
- ورود با همان حساب PMS و مسیر فعلی `POST /auth/login` انجام می‌شود.
- توکن فقط در حافظه task pane نگهداری می‌شود و داخل سند یا localStorage نوشته نمی‌شود؛ با بستن/بارگذاری مجدد افزونه باید دوباره وارد شد.
- درخواست‌ها از مسیرهای موجود `GET /projects` و `GET /projects/:id` استفاده می‌کنند و مجوزها در Backend مرجع نهایی‌اند.
- MVP فعلاً فقط فیلدهای ساده پروژه را درج می‌کند؛ جدول‌های چندردیفی، اطلاعات مرکزی، تصاویر و بهبود قالب‌بندی در Task 3 هستند.
- ارتباط Office Add-in با Google Apps Script، ورود، دریافت پروژه و درج Content Control باید در Word Desktop و Word Online واقعی آزمایش شود. تا پیش از این آزمایش، پشتیبانی عملیاتی و سازگاری کامل ادعا نمی‌شود.
- افزونه هیچ داده‌ای را در دیتابیس تغییر نمی‌دهد و قالب اصلی Word را ذخیره یا بازنویسی نمی‌کند.
