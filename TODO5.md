## 🎯 Current Objective
Remove event submission result panel and dedicated retry API; auto-close successful progress modal after five seconds.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
- Operational Frontend: `Saeidesl/PRSPRO2-PRODUCTION`, `main`; current base commit `bdce6324ebdaf0d3552704634a743992a154dc57`.
- Operational Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`, `main`; no backend changes expected for this UI defect.
- Frontend entry point: `index.html` loads `js/modules/events.js`; query-string version is used for cache busting.
- Frontend page: `pages/events.html`; event detail modal content is populated by `js/modules/events.js`.
- Image preview trigger: `[data-event-image-attachment]`; gallery renderer creates image attachment buttons.
- Preview method: `Events.openEventImageAttachment(attachmentId)`; existing `GET /attachments/:attachmentId/download` via `PMS.Api.get`, MIME validation and Blob/object URL.
- PR #150/#151 changed inline fixed overlay positioning and cache-busting, but the user still reports the preview at page bottom. Discovery shows the modal is appended to `document.body` as a normal `div`; replace this positioning strategy with native `<dialog>.showModal()` (browser top layer), and remove duplicate click listeners that can launch overlapping fetch/modal requests.
- Preserve current API, attachment permissions, MIME validation, object URL flow, event detail modal and image data behavior.

## 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** Inspect preview trigger, modal implementation, operational branch and delivery/cache mechanism.
  - *Log:* Confirmed preview flow in `js/modules/events.js`; PR #150 implemented inline fixed overlay but `index.html` still referenced `events.js?v=20261113-three-project-statuses-1`. This cache key mismatch was the likely reason the deployed browser did not load the new code. No backend change required.
- [x] **Task 2 — Cache-busting delivery:** Ensure production entry point references the corrected preview module and add cache-key regression coverage.
  - *Log:* `index.html` references `js/modules/events.js?v=20261118-event-image-preview-modal-2`; CI and frontend deployment succeeded, but manual modal acceptance failed.
- [x] **Task 3 — Native modal top-layer correction:** Replace body-attached fixed overlay with native dialog top-layer centering, remove duplicate click binding, update regression tests and module cache key.
  - *Log:* Discovery confirmed preview was a normal `div` appended to `document.body` with inline fixed styles. Native `<dialog>.showModal()` will force browser top-layer rendering, independent of page layout/stacking contexts. The detail content also had both a local listener and delegated document listener for the same image click; remove local listener to avoid overlapping requests/modals. CI identified 10 regression assertions still expecting the previous cache-busting string; those expectations were updated to the current native-dialog asset version without weakening the behavioral assertions. CI passed and Product Owner confirmed the manual image preview test succeeded.
- [x] **Task 4 — Regression & Operational Acceptance:** Verify the preview is centered live, closes via button/backdrop/Escape, remains responsive and does not regress event detail; then pause for user acceptance.
  - *Log:* PR #152 merged to `main` after all four CI checks passed. Product Owner confirmed manual preview behavior successful; task accepted.


- [ ] **Task 5 — Discovery & Planning (IN PROGRESS):** Confirm operational frontend baseline, card selector, existing responsive breakpoints, and test coverage; define desktop 4-column layout with tablet/mobile fallbacks.
  - *Log:* Verified only `Saeidesl/PRSPRO2-PRODUCTION`, branch `main`, latest baseline `28e734e4bb269395236ee7fcf2397703939271b7`; card grid is `.event-queue-list-unified` in `css/events.css`, current 2-column default and responsive one-column mobile. Card component `.event-project-card-unified` and its image/copy/actions layout identified. Existing test `tests/event-queue-project-cards.test.js` covers queue card behavior; no CSS breakpoint regression assertion yet.
- [ ] **Task 6 — Compact desktop card layout:** Apply 4 columns at ≥1200px, 3 columns at 900–1199px, preserve existing tablet/mobile behavior; add CSS regression checks and update cache key. Validate CI and open PR for PO acceptance.
  - *Log:* Pending implementation.


- [x] **Task 7 — اصلاح تشخیص حالت ویرایش فرم:** بررسی علت و حذف تشخیص بر اساس نام/کد رویداد؛ کنترل حالت فقط با IsFormAmendment صریح.
  - *Log:* تشخیص کلیدواژه حذف شد؛ تست رگرسیون `tests/event-form-cache-policy.test.js` اضافه و cache-busting به `20261118-amendment-explicit-config-1` تغییر یافت. کاربر تست عملی را موفق اعلام کرد؛ تسک پذیرفته و بسته شد.


- [ ] **Task 8 — حذف پنل نتیجه ثبت رویداد و بستن خودکار (IN PROGRESS):** حذف کامل پنل نتیجه، کدهای وابسته و مسیر retry اختصاصی؛ بستن پنجره پیشرفت پس از ۵ ثانیه موفقیت.
  - *Log:* Frontend: در `js/modules/events.js` توابع/نمایش `showEventSubmissionResult`، `showProcurementRetryNotice` و markup پنل حذف شد؛ `closeSubmitProgressModal()` دیگر به دکمه پنل حذف‌شده ارجاع نمی‌دهد؛ `completeSubmitProgress()` فقط در موفقیت پس از ۵۰۰۰ms پنجره را می‌بندد و خطاها همچنان برای اقدام کاربر باز می‌مانند. `css/events.css` فاقد استایل پنل نتیجه است. `index.html` نسخه cache ماژول را به `20261118-event-submit-auto-close-5s-1` تغییر می‌دهد. تست‌های `tests/event-submit-progress-modal.test.js` و `tests/reusable-forms.test.js` رفتار حذف پنل/عدم فراخوانی retry و تایمر را پوشش می‌دهند.
  - *Log:* Backend: مسیر `procurementRetryMatch` در `Router.js` و متد `EventService.retryProcurementIntegration` حذف شدند؛ تست `tests/forms-api-contract.test.js` اکنون حذف route/service را assert می‌کند و `tests/procurement-event-integration.test.js` نیز نبود route/service را بررسی می‌کند. API اصلی ثبت رویداد و یکپارچگی اصلی محاسبه ملزومات حفظ شده‌اند. PRهای Frontend #157 و Backend #96 باز هستند.
  - *Log:* اعتبارسنجی: تست اختصاصی پنجره پیشرفت و حذف پنل در Frontend و تست اختصاصی حذف retry در Backend با اصلاح assertionهای قدیمی همسو شدند. CI و QA پس از اصلاح قرارداد پاسخ دوباره اجرا شدند: Backend source checks موفق (تمام تست‌های Backend و بررسی manifest/syntax سبز)، Backend agent suite موفق (QA/release safety و domain contract)، Procurement diagnostics موفق؛ Frontend cross-repository QA موفق (syntax/assets/CSS و تمام تست‌های Backend در ترکیب دو مخزن)، Frontend agent suite بررسی قرارداد و asset موفق. پس از هم‌ترازسازی تمام assertionهای cache-key و افزودن استایل‌های واقعی Project Picker و loading، Frontend checks نهایی در commit `8a5f4a8c468c3915c2c9f6c94c9f60df8f48b9c7` موفق شدند: syntax، کل regression suite، CSS/assets و E2E guard همگی سبز. Frontend agent suite و cross-repository QA نیز در commit قبلی موفق بودند؛ Backend source checks، unit/integration، diagnostics و agent suite همگی موفق‌اند. Browser Audit نهایی هنوز در مرحله UI inventory/performance audit در حال اجراست؛ تا پایان آن ادغام انجام نشده و deployment/live verification انجام نشده است.
  - *Log تکمیلی:* علت ۱۱ شکست Frontend مشخص شد: assertionهای cache-busting به نسخه‌های قدیمی `index.html` اشاره می‌کردند و دو گروه assertion استایل Project Picker و loading به selectorهایی ارجاع می‌دادند که stylesheet عملیاتی فاقد آن‌ها بود. نسخه‌های تست با assetهای واقعی هماهنگ شدند؛ استایل responsive/theme-aware برای `event-project-picker` و loading state به `css/events.css` اضافه شد؛ cache-busting جدید در `index.html` اعمال شد. پس از این اصلاحات، workflow فرانت‌اند دوباره باید روی آخرین commit کامل اجرا شود؛ تا آن زمان نتیجه نهایی CI قطعی نیست.
