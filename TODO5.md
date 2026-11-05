## 🎯 Current Objective

انتقال فایل‌ها و تصاویر پروژه به پوشه Google Drive اختصاصی:
https://drive.google.com/drive/folders/1E-nYv5GF8wPn9diOZlfiGXnWQH-2WSmB

تغییر اصلی در Backend است. Frontend فقط سازگاری مسیرهای موجود آپلود، نمایش، دانلود و حذف را حفظ و آزمایش می‌کند؛ هیچ API یا جریان موازی ساخته نمی‌شود.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

- Frontend repository: Saeidesl/PRSPRO2-PRODUCTION
- Branch: feature/drive-project-attachments
- Backend repository: Saeidesl/PRSPRO2BACKEND-PRODUCTION
- Backend branch: feature/drive-project-attachments
- ماژول‌های مرتبط: js/modules/project-detail.js، js/modules/project-images.js، js/modules/events.js
- صفحات مرتبط: pages/project-detail.html و pages/events.html
- Backend storage: AppConfig.gs.js → AppConfig.FILES.GOOGLE_DRIVE_FOLDER_ID؛ GoogleDriveStorage.js → getRootFolder_، uploadBase64، copyFile؛ StorageRepository.js؛ AttachmentService.js؛ metadata در شیت 15_Attachments.
- API و payload فعلی باید ثابت بمانند. StorageKey همچنان شناسه Drive file است.
- فایل‌های قدیمی جابه‌جا یا حذف نمی‌شوند. فرانت‌اند نباید به پوشه Drive دسترسی مستقیم داشته باشد.

## 📋 Macro-Task Queue & Implementation Log

- [x] **Task 1 — Discovery & Planning**
  - *Log:* مخزن عملیاتی Frontend و ARCHITECTURE.md بررسی شد. مسیرهای مرتبط در project-detail.js، project-images.js و events.js شناسایی شدند. تغییر مقصد ذخیره‌سازی در Backend انجام می‌شود؛ تغییر Frontend فقط در صورت مشاهده ناسازگاری واقعی مجاز است.
- [ ] **Task 2 — حفظ سازگاری مسیرهای فعلی فایل در Frontend (IN PROGRESS)**
  - بررسی آپلود پروژه، تصاویر، فایل‌های فرم رویداد، نمایش و دانلود با APIهای موجود.
  - اصلاح حداقلی فقط در صورت اثبات ناسازگاری.
- [ ] **Task 3 — آزمون پذیرش یکپارچه**
  - تست UI پروژه و فرم رویداد با Backend عملیاتی.
  - تأیید نمایش تصویر و دانلود فایل از پوشه جدید، بدون تغییر قرارداد API یا ساختار داده.
