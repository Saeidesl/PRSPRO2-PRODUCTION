## 🎯 Current Objective
Fix event attachment image previews: clicking an image in event details must open a centered, fixed, full-screen lightbox instead of rendering the image at the bottom of the page.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
- Operational Frontend: `Saeidesl/PRSPRO2-PRODUCTION`, `main`; base commit `0ebf5d25c6aa37c210c8f97a043b48489e0080c4`.
- Operational Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`, `main`; latest verified commit `62922eb55eac6ea70dec47f7481b029157df75a6`. No backend changes expected for this UI defect.
- Frontend page: `pages/events.html`; event detail modal content is populated by `js/modules/events.js`.
- Image preview trigger: `[data-event-image-attachment]`; gallery renderer creates image attachment buttons.
- Preview method: `Events.openEventImageAttachment(attachmentId)`; it calls the existing `GET /attachments/:attachmentId/download` API via `PMS.Api.get`, validates image MIME and converts Base64 to a Blob/object URL.
- Existing image viewer implementation created `#event-image-preview-modal` using `.event-modal-overlay`, but the operational CSS did not define positioning for that class. This caused the preview overlay to behave like an ordinary page-flow element.
- Existing close behavior: button and overlay click; object URL cleanup with `URL.revokeObjectURL`. New implementation adds explicit fixed positioning, viewport-centering, sizing, accessible dialog semantics, and Escape close.
- Preserve current API, attachment permissions, MIME validation, object URL flow, event detail modal and image data behavior.

## 📋 Macro-Task Queue & Implementation Log
- [x] **Task 1 — Discovery & Planning:** Inspect event image click path, preview method, relevant CSS and operational baseline.
  - *Log:* Confirmed event image gallery in `js/modules/events.js` calls `openEventImageAttachment`; the method fetches existing attachment download API, validates image MIME and creates Blob URL. The preview uses `event-modal-overlay` but no positioning style for that class exists in `css/events.css`. Verified operational repo main and baseline commit. Backend is unaffected.
- [ ] **Task 2 — Centered Lightbox Implementation (IN PROGRESS):** Correct the overlay positioning and sizing, Escape close, and cleanup while preserving image quality and current access checks.
  - *Log:* Pending implementation and regression checks.
- [ ] **Task 3 — Regression & Operational Acceptance:** Validate preview, close interactions, responsive sizing, existing event details, attachment permissions, and frontend CI; then provide user test instructions and pause for approval.
  - *Log:* Pending.
