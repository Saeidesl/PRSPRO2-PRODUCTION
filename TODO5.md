## 🎯 Current Objective

پیاده‌سازی تجربه یکپارچه ثبت چندباره یک نوع رویداد برای یک پروژه در همان مرحله گردش‌کار، بدون محدودیت تعداد دفعات؛ مرحله تا زمانی که مسئول مجاز آن پایان کار را اعلام نکرده باز می‌ماند. پاسخ فرم و هر ثبت رویداد باید سابقه مستقل خود را حفظ کنند. مسیر اصلی ثبت رویداد، APIها، مجوزها، Idempotency و سازگاری با Workflowهای فعلی حفظ می‌شوند.

تصمیم کسب‌وکاری تأییدشده:
- رویدادهای تکرارپذیر مانند «درخواست اصلاح نمونه» می‌توانند هر تعداد بار در مرحله جاری ثبت شوند.
- ثبت رویداد تکرارپذیر به‌تنهایی مرحله را تکمیل نمی‌کند.
- پایان مرحله باید با اقدام صریح مسئول مجاز آن اعلام شود.
- پس از پایان مرحله، ثبت رویدادهای آن مرحله متوقف و وضعیت مرحله تکمیل‌شده می‌شود.
- تعداد دفعات از پیش تعیین نمی‌شود.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

### مخازن و شاخه فاز
- Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه `feature/repeatable-workflow-events`
- Frontend: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه `feature/repeatable-workflow-events`
- مبنای هر دو شاخه: آخرین `main` بررسی‌شده در 2026-11-05؛ main تغییر داده نمی‌شود.

### Frontend — مسیرها و اجزای اصلی
- `js/modules/events.js`:
  - `openForm()` فرم اصلی را ایجاد می‌کند و پروژه/نوع رویداد را دریافت می‌کند.
  - `refreshEventTypeOptions()` انواع رویداد را با توجه به قواعد Workflow، وضعیت پروژه و مجوزها فعال/غیرفعال می‌کند؛ در نسخه فعلی `rule.satisfied` باعث غیرفعال شدن نوع رویداد می‌شود.
  - `loadWorkflowProgress(projectId)` از `GET /projects/{projectId}/workflow-progress` استفاده می‌کند.
  - `submitForm()` payload فعلی را به `POST /events` می‌فرستد؛ کلید Idempotency برای retry همان ارسال نگهداری می‌شود.
  - پنل اطلاعات جانبی، تاریخچه رویدادهای مرتبط و پاسخ فرم‌های قبلی از APIهای موجود استفاده می‌کند.
- `js/modules/workflows.js`:
  - `showStepEventRules(workflow, step)` و `appendRuleRow()` ویرایشگر قواعد مرحله را می‌سازند.
  - قواعد از `GET /workflows/{workflowId}/steps/{stepId}/event-rules` دریافت و با `PUT /workflows/{workflowId}/steps/{stepId}/event-rules` ذخیره می‌شوند.
- `index.html`: بارگذاری ماژول‌ها و cache-busting.
- تست‌های فعلی: `tests/workflow-management.test.js`, `tests/draft-event-type-visibility.test.js`, `tests/event-context-filtering.test.js`.

### Backend contract و داده‌های مرتبط
- `POST /events` مسیر اصلی ثبت است؛ payload شامل `ProjectID`, `EventTypeID`, `OccurredAt`, `Description`, `FormResponses`, `VariantQuantity`, `IdempotencyKey` است.
- `GET /projects/{projectId}/workflow-progress` وضعیت قواعد و پیشرفت مرحله را می‌دهد.
- `13_Events`: هر رویداد شناسه مستقل و WorkflowStepID/WorkflowVersion خودش را دارد.
- `35_EventFormData`: پاسخ فرم به EventID و FormID متصل است؛ پاسخ چند رویداد نباید روی هم نوشته شود.
- قواعد در `37_WorkflowStepEventRules` و نسخه‌بندی‌شده‌اند.
- Backend: `EventService.js`, `WorkflowService.js`, `WorkflowStepEventRuleValidator.js`, `WorkflowStepEventRuleRepository.js`, `FormService.js`, `Router.js`.
- فیلد موجود `IsWorkCompletion` در نوع رویداد فعلاً در نمایش فعالیت‌ها استفاده می‌شود و به‌تنهایی endpoint یا منطق تکمیل مرحله نیست؛ معنای آن نباید بدون اتصال کنترل‌شده تغییر کند.

### اصول
- مسیر ثبت، فرم‌ها و API موازی ایجاد نشود.
- رویداد تکرارپذیر تا اعلام پایان توسط مسئول مجاز، قابل ثبت باقی بماند.
- شمارنده باید از رویدادهای معتبر همان پروژه/مرحله/نسخه و غیر VOID محاسبه شود.
- اقدام پایان مرحله باید Backend-authoritative باشد؛ مخفی‌کردن دکمه در UI جایگزین کنترل مجوز نیست.
- بعد از پایان مرحله، UI باید وضعیت را تازه‌سازی و رویدادهای مرحله را غیرقابل ثبت کند.
- رفتار پیش‌فرض Workflowهای فعلی حفظ شود؛ هیچ مرحله‌ای ناخواسته دستی یا تکرارپذیر نشود.
- Idempotency، فرم‌ها، Snapshot، پیوست، Audit، اطلاعات مرکزی و responsive/RTL حفظ شوند.
- هیچ تغییری در main یا انتشار عملیاتی تا پذیرش کاربر انجام نشود.

### جریان داده
1. دریافت پروژه و پیشرفت Workflow از endpoint فعلی.
2. نمایش قواعد مرحله و امکان ثبت رویدادهای مجاز.
3. جمع‌آوری فرم‌های متصل و ارسال از `POST /events`.
4. دریافت شمارنده/وضعیت تازه از پاسخ Workflow.
5. اقدام پایان مرحله توسط مسئول مجاز از کنترل جدید متصل به منطق Backend موجود/افزوده‌شده.
6. تازه‌سازی پروژه، صف‌ها، timeline و وضعیت مرحله.

## 📋 Macro-Task Queue & Implementation Log

- [x] **Task 1 — Discovery & Planning: بررسی معماری، تثبیت تصمیم محصول و طراحی دامنه تغییر**
  - *Log:* هر دو مخزن عملیاتی و mainهای فعلی، شاخه‌ها، آخرین commitها، `TODO5.md` و `ARCHITECTURE.md` بررسی شدند. مسیر ثبت `openForm()` → `refreshEventTypeOptions()` → `submitForm()` → `POST /events` و دریافت پیشرفت از `loadWorkflowProgress()` ردیابی شد. ویرایشگر قواعد در `js/modules/workflows.js` و قراردادهای Backend بررسی شدند. محدودیت UI از `rule.satisfied` و محدودیت Backend از `_validateWorkflowEvent_()` ناشی می‌شود. پاسخ‌های فرم در `35_EventFormData` به EventID مستقل متصل‌اند. تصمیم کاربر: ثبت نامحدود رویداد تکرارپذیر و اعلام پایان توسط مسئول مرحله؛ مسیر اصلی و Idempotency حفظ شوند. شاخه `feature/repeatable-workflow-events` از main هر دو مخزن ایجاد شد؛ فایل اجرایی تغییر نکرد.
- [ ] **Task 2 — پشتیبانی یکپارچه از رویدادهای تکرارپذیر و پایان دستی مرحله (IN PROGRESS / آماده آزمون کاربر)
  - Backend: ذخیره و اعتبارسنجی افزایشی AllowRepeat در قواعد Workflow؛ شمارش وقوع هر رویداد؛ اجازه ثبت چندباره تا زمان بسته‌شدن مرحله؛ API پایان مرحله با کنترل tenant، دسترسی پروژه، واحد تخصیص‌یافته، تکمیل الزامات و ثبت Audit.
  - Frontend: تنظیم تکرارپذیری در ویرایشگر قواعد، نمایش شمارنده ثبت، نمایش وضعیت مرحله و اقدام پایان برای مسئول مجاز؛ حفظ مسیر اصلی POST /events و فرم‌های مستقل هر ثبت.
  - حفظ رفتار پیش‌فرض Workflowهای قدیمی، Idempotency، ابطال رویداد، پیوست‌ها و پاسخ فرم.
  - آزمون پذیرش کاربر: ثبت ۳ یا بیشتر رویداد هم‌نوع، بررسی شمارنده و پاسخ‌های مستقل، اعلام پایان توسط مسئول و رد ثبت بعدی.
- [ ] **Task 3 — Integration QA & Regression: آزمون سرتاسری و اصلاح موارد کشف‌شده
  - اجرای تست‌های Backend و Frontend، بررسی قرارداد API، مجوزها، tenant isolation، Idempotency، فرم/فایل، ابطال و Workflowهای قدیمی.
  - رفع هر شکست تست یا رگرسیون؛ بررسی وضعیت CI و سازگاری دو مخزن.
  - پس از تأیید کاربر، ثبت Log نهایی و آماده‌سازی برای ادغام/انتشار فقط با مجوز جداگانه.
