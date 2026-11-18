## 🎯 Current Objective
Fix event attachment image previews: use the browser native modal top layer so previews remain centered independent of page stacking/layout.

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
- [ ] **Task 3 — Native modal top-layer correction (IN PROGRESS):** Replace body-attached fixed overlay with native dialog top-layer centering, remove duplicate click binding, update regression tests and module cache key.
  - *Log:* Discovery confirmed preview was a normal `div` appended to `document.body` with inline fixed styles. Native `<dialog>.showModal()` will force browser top-layer rendering, independent of page layout/stacking contexts. The detail content also had both a local listener and delegated document listener for the same image click; remove local listener to avoid overlapping requests/modals.
- [ ] **Task 4 — Regression & Operational Acceptance:** Verify the preview is centered live, closes via button/backdrop/Escape, remains responsive and does not regress event detail; then pause for user acceptance.
  - *Log:* Pending.
