## 🎯 Current Objective

Implement secure editing and removal (soft-void) of existing events for SYS_ADMIN and users with explicit EVENT_EDIT permission, using the existing event UI, API routes, audit and tenant/project access rules. Preserve event/form/attachment and project workflow integrity; avoid destructive hard deletion.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

- Operational backend: Saeidesl/PRSPRO2BACKEND-PRODUCTION, branch feature/event-edit-delete-20261125; Apps Script V8 / Google Sheets.
- Operational frontend: Saeidesl/PRSPRO2-PRODUCTION, branch feature/event-edit-delete-20261125; HTML/CSS/JS.
- Event page/module: pages/events.html and js/modules/events.js; use existing event listing/detail/modal and API wrapper js/core/api.js.
- Backend authorization source of truth: SYS_ADMIN bypass and EVENT_EDIT permission; no UI-only authorization.
- Event editing/removal should integrate with existing event detail/history rendering and existing void route semantics, with a confirmation and reason for removal where supported.
- Preserve tenant isolation, project access, attached files and event form data; no parallel UI or API.

## 📋 Macro-Task Queue & Implementation Log

- [x] Task 1 — Discovery & Planning
  - *Log:* Reviewed operational events module and Router.js access model and identified existing backend EVENT_EDIT-protected soft-void endpoint. Dedicated feature branch created.
- [ ] Task 2 — Backend event edit/removal authorization and integrity (IN PROGRESS)
- [ ] Task 3 — Frontend event actions and editing experience (partially implemented; integration review pending)
- *Implementation log:* Event details modal now adds permission-gated basic edit and logical-void actions; refresh uses existing reloadEvents; edit uses optimistic UpdatedAt/CreatedAt token and re-fetches version between field updates. Admin display check uses existing PMS.Router.isAdmin. Replaced assumptions about PMS.Alert methods with the existing Events.showNotice toast implementation for success/error feedback. Date input is validated and normalized to ISO before transmission. Direct-edit button is now hidden for independent events (backend direct edit is project-linked only); void remains available for eligible independent events, subject to existing backend safeguards. Backend enforces tenant/project/department, downstream workflow date restrictions and optimistic concurrency. Broader integration verification remains pending.
- *Review log:* Confirmed the frontend uses PMS.Api.put (POST + _method=PUT), the existing API wrapper serializes JSON body and parses error responses, and the Router.js backend route uses EVENT_EDIT server-side. Direct edit remains limited to linked-project events; independent-event voiding uses the existing safeguards. Outstanding risk: date and description are saved as separate requests, so a second-request failure can leave the date changed while description remains unchanged; should be addressed or explicitly accepted before release. CI and live-app testing remain unavailable/unverified.
- [ ] Task 4 — Integration, automated regression tests and release readiness

- *Integration review (2026-11-25):* Draft PR opened for integration review. `PMS.Api.put` sends `_method=PUT` and JSON payload, frontend uses atomic endpoint and reloads detail. Frontend feature branch is reported one commit behind main; base integration/mergeability must be resolved. CI statuses are empty; runtime verification pending.
