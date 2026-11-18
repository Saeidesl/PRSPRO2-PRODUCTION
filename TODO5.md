## 🎯 Current Objective
Fix event attachment image previews: clicking an image in event details must open a centered, fixed, full-screen lightbox instead of rendering the image at the bottom of the page.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
- Operational Frontend: `Saeidesl/PRSPRO2-PRODUCTION`, `main`; current base commit `bdce6324ebdaf0d3552704634a743992a154dc57`.
- Operational Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`, `main`; no backend changes expected for this UI defect.
- Frontend entry point: `index.html` loads `js/modules/events.js`; query-string version is used for cache busting.
- Frontend page: `pages/events.html`; event detail modal content is populated by `js/modules/events.js`.
- Image preview trigger: `[data-event-image-attachment]`; gallery renderer creates image attachment buttons.
- Preview method: `Events.openEventImageAttachment(attachmentId)`; existing `GET /attachments/:attachmentId/download` via `PMS.Api.get`, MIME validation and Blob/object URL.
- Previous PR #150 updated inline overlay positioning, but failed user test revealed the production entry point retained the older `events.js` query version, so browsers/CDN could keep using stale module code. Corrective work must cache-bust the entry point as well as retain modal behavior.
- Preserve current API, attachment permissions, MIME validation, object URL flow, event detail modal and image data behavior.

## 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** Inspect preview trigger, modal implementation, operational branch and delivery/cache mechanism.
  - *Log:* Confirmed preview flow in `js/modules/events.js`; PR #150 implemented inline fixed overlay but `index.html` still referenced `events.js?v=20261113-three-project-statuses-1`. This cache key mismatch was the likely reason the deployed browser did not load the new code. No backend change required.
- [ ] **Task 2 — Corrective Delivery & Cache Busting (IN PROGRESS):** Update production script cache version and add regression coverage so the preview fix is actually loaded by browsers.
  - *Log:* Cache-busting نسخه events.js در entry point اصلاح شد؛ تست‌ها نیز به نسخه JS جدید و CSS نسخه قبلی هماهنگ شدند. CI برای تأیید مجدد در حال اجراست.
- [ ] **Task 3 — Regression & Operational Acceptance:** Verify the image opens centered in the live app, closes by button/backdrop/Escape, responsive sizing and event detail regressions; then provide user test instructions and pause for acceptance.
  - *Log:* Pending.
