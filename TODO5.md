## 🎯 Current Objective
بازطراحی خط زمانی رویدادهای صفحه جزئیات پروژه به لیست فشرده و بازشونده، با ارتفاع کم برای مشاهده مسیر پروژه در یک نگاه.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)
- فقط Frontend عملیاتی: `Saeidesl/PRSPRO2-PRODUCTION` شاخه کاری `feat/compact-project-event-timeline-20261125`; شاخه مبنا `main`.
- صفحه: `pages/project-detail.html`؛ container موجود `#project-detail-events` حفظ می‌شود.
- رندر و منطق: `js/modules/project-detail.js` تابع `ProjectDetail.renderEvents(events)`; مرتب‌سازی با `getEventTimestamp`; منبع تاریخ وقوع `OccurredAt/occurredAt` بدون fallback به تاریخ ثبت.
- مجری از `PerformedBy/PerformedByID` و users lookup موجود؛ ثبت‌کننده در حالت خلاصه نمایش داده نمی‌شود.
- Details native برای جزئیات بازشونده؛ dynamic data و summary cutting فعلی حفظ می‌شوند؛ بدون API/schema جدید.
- Backend فقط برای بررسی قرارداد داده؛ هیچ تغییری در مخزن Backend لازم نیست.

## 📋 Macro-Task Queue & Implementation Log
- [x] Task 1 — Discovery & Planning: بررسی مخازن عملیاتی، branch `main`, TODO5/ARCHITECTURE و مسیر فعلی `renderEvents`.
  - *Log:* `ProjectDetail.renderEvents`, `getEventTimestamp`, `metaItem`, `renderDynamicData`, `ensureTimelineStyles` و container موجود بررسی شدند؛ تغییر فقط Frontend.
- [x] Task 2 — Compact Event Timeline UI: ردیف‌های فشرده، تاریخ وقوع، انجام‌دهنده و جزئیات بازشونده؛ PR #170 با squash merge در commit `3aea738c8342b7b11a758d256d6c412c88100ea8`.
  - *Log:* `js/modules/project-detail.js`: `ProjectDetail.renderEvents(events)` به ردیف‌های native `<details>/<summary>` تبدیل شد؛ مرتب‌سازی صرفاً بر اساس `OccurredAt/occurredAt` نزولی؛ مجری از `PerformedBy/PerformedByID` و fallback نام؛ ثبت‌کننده از خلاصه حذف شد؛ جزئیات پویا و cutting summary حفظ شدند. هیچ API/schema یا Backend تغییر نکرد. PR #170 ادغام شد. CI، regression، cross-repository QA، contract/diff review و browser audit همگی success (runs: 45688210182, 45688210231, 45688210206, 45688210147).
- [ ] **Task 3 — IN PROGRESS: Integration, Regression & Operational Acceptance:** بررسی انتشار و نمایش نسخه live و پذیرش Product Owner؛ ترتیب تاریخ، مجری، جزئیات بازشونده و RTL/mobile.
