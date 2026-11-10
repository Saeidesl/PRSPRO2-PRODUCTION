## 🎯 Current Objective
فاز اصلاح پایداری و یکپارچگی تجربه صفحه طراحی قالب چاپ (Print Designer)؛ تمرکز فعلی بر وضعیت پیش‌نمایش زنده و چرخه ذخیره قالب، بدون تغییر معماری موجود یا حذف قابلیت‌های تأییدشده.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
### مخازن و مبنای فاز
- Frontend: `Saeidesl/PRSPRO2-PRODUCTION`
- Backend همکار: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`
- شاخه کاری مشترک: `feature/print-designer-stability` (از main عملیاتی ساخته شد؛ main دست‌نخورده می‌ماند).
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
- `tests/print-template-library.test.js`: baseline شامل ۳۴ تست؛ پوشش کتابخانه، طراحی، PDF اصلی، تصاویر، preview و خروجی.
### قرارداد Backend که Frontend مصرف می‌کند
- `GET /print-templates`, `GET /print-templates/sources`
- `POST /print-templates`, `GET/PUT/DELETE /print-templates/:id`
- `POST /print-templates/preview` با `{ProjectID, Definition}`
- `GET/POST /print-templates/:id/pdf`
- مسیرهای موجود `/print-templates/:id/images` و `/print-templates/:id/images/:assetId`.
- مدل Definition و bindingهای فعلی حفظ می‌شوند؛ PDF اصلی در خروجی با overlay نگهداری می‌شود.
### یافته‌های قطعی Discovery
- `resetForm()` Definition و state داخلی را پاک می‌کند، اما انتخاب پروژه/محتوای پیش‌نمایش و درخواست در حال اجرا را invalidate/پاک نمی‌کند.
- `scheduleLivePreview()` در صورت خالی بودن پروژه بدون افزایش sequence خارج می‌شود؛ پاسخ قبلی async می‌تواند پس از تغییر وضعیت هنوز معتبر تلقی شود.
- تغییر پروژه فقط preview را schedule می‌کند؛ مسیر صریح پاک‌سازی پیش‌نمایش در انتخاب خالی وجود ندارد.
- `saveTemplate()` برای قالب جدید ابتدا رکورد می‌سازد و سپس فایل‌های تصویری/PDF را آپلود می‌کند؛ شکست عملیات بعدی می‌تواند رکورد اولیه را باقی بگذارد.
- در HTML خط‌به‌خط، وجود متن اضافی literal `\\n` تأیید نشد؛ این مورد باگ محسوب نمی‌شود.
### قابلیت‌هایی که باید بدون رگرسیون حفظ شوند
- ورود PDF به‌عنوان پس‌زمینه و حفظ PDF اصلی در خروجی.
- ورود تصویر به‌عنوان پس‌زمینه و افزودن تصویر مستقل به صفحه.
- پیش‌نمایش زنده با Definition ذخیره‌نشده و اطلاعات پروژه.
- کتابخانه و فرم موجود، bindingهای موجود، ویرایش/ذخیره، خروجی چاپ و دانلود.

## 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** بررسی مستندات و baseline دو مخزن، شناسایی مسیرها و stateها، مرور تست‌ها و ثبت نقشه فنی و یافته‌های تأییدشده.
- [ ] **Task 2 — Stabilize preview and save lifecycle (IN PROGRESS):** پاک‌سازی preview و invalidate درخواست‌ها هنگام تغییر پروژه/Reset/قالب جدید؛ مدیریت خطا و rollback امن ذخیره چندمرحله‌ای؛ هماهنگی با Backend برای پاک‌سازی امن PDF قبلی پس از جایگزینی موفق.
- [ ] **Task 3 — Regression validation & delivery:** تست خودکار و سناریوهای عملی، بررسی عدم رگرسیون PDF/تصویر/Binding/خروجی، commit و push روی شاخه کاری و گزارش تست/انتشار.
