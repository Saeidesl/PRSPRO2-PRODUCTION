## 🎯 Current Objective
فاز اصلاح پایداری و یکپارچگی تجربه صفحه طراحی قالب چاپ (Print Designer)؛ تمرکز بر وضعیت پیش‌نمایش زنده و چرخه ذخیره قالب، بدون تغییر معماری موجود یا حذف قابلیت‌های تأییدشده.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
### مخازن و مبنای فاز
- Frontend: `Saeidesl/PRSPRO2-PRODUCTION`
- Backend همکار: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`
- شاخه کاری مشترک: `feature/print-designer-stability` (از main عملیاتی ساخته شد؛ تغییرات از طریق PR ادغام شدند).
- Frontend main baseline: `50182ef949c239064d295aee984a327cc40f593f`.
- Backend main baseline: `65e108d349232055628080e6b83ef9f21cd25580`.

### نقشه Frontend
- `pages/print-designer.html`: صفحه واحد کتابخانه/فرم/بوم/پیش‌نمایش؛ شناسه‌های مهم `pt-template-form`, `pt-design-canvas`, `pt-live-preview-project`, `pt-live-preview-content`, `pt-live-preview-print`.
- `js/modules/print-designer.js`:
  - راه‌اندازی و کتابخانه: `initLibrary()`, `loadLibrary()`.
  - چرخه قالب: `resetForm()`, `editTemplate()`, `saveTemplate()`, `deleteTemplate()`.
  - طراحی: `bindEditor()`, `commitHistory()`, `restoreHistory()`, `renderEditor()`, `renderCanvas()`, `renderInspector()`.
  - PDF: `handleImportFile()`, `handlePdfFile()`, `loadTemplatePdf()`, `renderPdfBackgrounds()`.
  - پیش‌نمایش: `bindLivePreview()`, `scheduleLivePreview()`, `createLivePreviewDefinition()`, `renderLivePreview()`, `clearLivePreviewPdf()`, `printLivePreview()`.
  - `saveTemplate()` در ایجاد قالب چند عملیات ترتیبی انجام می‌دهد: ساخت رکورد، آپلود تصاویر موقت، آپلود PDF یا به‌روزرسانی Definition.
- `css/print-template-library.css`: layout دو ستونه/تک‌ستونه، پنل پیش‌نمایش، واکنش‌گرایی و print media.
- `index.html`: وابستگی‌های PDF.js/pdf-lib و cache key ماژول.
- `tests/print-template-library.test.js`: تست‌های ساختاری/رگرسیون کتابخانه، طراحی، PDF اصلی، تصاویر، preview و خروجی.
### قرارداد Backend که Frontend مصرف می‌کند
- `GET /print-templates`, `GET /print-templates/sources`
- `POST /print-templates`, `GET/PUT/DELETE /print-templates/:id`
- `POST /print-templates/preview` با `{ProjectID, Definition}`
- `GET/POST /print-templates/:id/pdf`
- مسیرهای موجود `/print-templates/:id/images` و `/print-templates/:id/images/:assetId`.
- مدل Definition و bindingهای فعلی حفظ می‌شوند؛ PDF اصلی در خروجی با overlay نگهداری می‌شود.
### یافته‌های قطعی Discovery
- `resetForm()`، انتخاب پروژه و درخواست‌های در حال اجرا قبلاً preview را به‌طور کامل invalidate/پاک نمی‌کردند.
- `scheduleLivePreview()` در حالت خالی بودن پروژه sequence را باطل نمی‌کرد و پاسخ async قدیمی ممکن بود برگردد.
- `saveTemplate()` برای قالب جدید ابتدا رکورد می‌ساخت و سپس فایل‌های تصویری/PDF را آپلود می‌کرد؛ شکست مراحل بعدی می‌توانست رکورد ناقص باقی بگذارد.
- در HTML خط‌به‌خط، وجود متن اضافی literal `\\n` تأیید نشد؛ این مورد باگ محسوب نمی‌شود.
### قابلیت‌هایی که باید بدون رگرسیون حفظ شوند
- ورود PDF به‌عنوان پس‌زمینه و حفظ PDF اصلی در خروجی.
- ورود تصویر به‌عنوان پس‌زمینه و افزودن تصویر مستقل به صفحه.
- پیش‌نمایش زنده با Definition ذخیره‌نشده و اطلاعات پروژه.
- کتابخانه و فرم موجود، bindingهای موجود، ویرایش/ذخیره، خروجی چاپ و دانلود.

## 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** بررسی مستندات و baseline دو مخزن، شناسایی مسیرها و stateها، مرور تست‌ها و ثبت نقشه فنی و یافته‌های تأییدشده.
- [x] **Task 2 — Stabilize preview and save lifecycle:** تثبیت پیش‌نمایش زنده، چرخه ذخیره قالب جدید و پاک‌سازی امن PDF جایگزین‌شده؛ تأیید عملی کاربر.
  - *Log:* در `js/modules/print-designer.js` تابع `clearLivePreview(message)` برای invalidate کردن درخواست‌های async، لغو timer، پاک‌کردن state/Blob و غیرفعال‌سازی چاپ افزوده شد؛ `resetForm()` و `editTemplate()` آن را اجرا می‌کنند؛ تغییر به پروژه خالی preview قبلی را حذف می‌کند و پاسخ‌های دیررس دیگر اعمال نمی‌شوند. در شکست ذخیره چندمرحله‌ای قالب جدید، رکورد اولیه با API موجود `DELETE /print-templates/:id` غیرفعال می‌شود؛ فایل‌های پیوست فیزیکی حذف نمی‌شوند. تست‌های `tests/print-template-library.test.js` برای پاک‌سازی preview، sequence، پروژه خالی و rollback افزوده/اصلاح شدند.
- [x] **Task 3 — Regression validation & delivery:** تست خودکار، سازگاری Backend/Frontend، انتشار و تست عملی تکمیل شد.
  - *Log:* `tests/print-template-library.test.js` و `tests/print-templates.test.js` در CI پوشش رگرسیون را تأیید کردند؛ Frontend checks و PMS cross-repository QA موفق؛ GitHub Pages deployment روی commit `c72744611252c1fa45f7feac34dc9ffd2e894cd1` موفق شد. Backend همکار روی commit `af0e82ccd2c169230e0e1785fe63b93d989f7e21` در Workflow رسمی Google Apps Script production با نتیجه success مستقر شد. PR #80 فرانت‌اند و PR #52 بک‌اند squash-merge شدند. تست عملی کاربر موفق تأیید شد. PMS comprehensive UI performance audit در محیط CI به علت authentication failure اجرا/تأیید کامل مرورگر را انجام نداد؛ این شکست مانع انتشار نبود و به‌عنوان محدودیت تست خودکار ثبت شد.

## 🧹 Approved Follow-up Fix — Print Designer Literal Newlines

- [x] **Task 1 — Discovery & Planning:** محل دقیق دو رشته متنی اضافی در `pages/print-designer.html` شناسایی شد.
  - *Log:* دو رشته literal `\\n` در مرز بعد از `#pt-image-file` و بعد از `#pt-page-tabs` پیدا شدند. دامنه اصلاح فقط همین دو محل بود.
- [x] **Task 2 — اصلاح HTML:** دو رشته اضافی با line break واقعی HTML جایگزین شدند.
  - *Log:* فقط `pages/print-designer.html` تغییر کرد؛ هیچ منطق اجرایی، API، داده، فایل PDF، ورودی PDF یا قابلیت افزودن تصویر مستقل حذف یا تغییر داده نشد. تغییر در PR فرانت‌اند #81 با squash merge وارد `main` شد؛ commit ادغام: `698924bbf0d3a5115cef5c63c5f6c8688c51ceec`.
- [x] **Task 3 — Regression، انتشار و پذیرش:** بررسی کد و تست عملی کاربر موفق بود.
  - *Log:* در نسخه `main` تعداد رشته‌های literal `\\n` برابر صفر و ورودی‌های `pt-pdf-file`، `pt-image-file` و بخش `pt-pdf-import` همچنان موجود بودند. Frontend checks و PMS cross-repository QA موفق شدند؛ ممیزی مرورگر نیز با نتیجه success پایان یافت. انتشار GitHub Pages از workflow متصل به push شاخه `main` انجام‌پذیر است؛ کاربر نسخه زنده را بررسی و حذف دو عبارت و حفظ قابلیت‌های فایل را تأیید کرد. Backend runtime/API/DB تغییری نداشت؛ PR #53 صرفاً مستندسازی بود.
