## 🎯 Current Objective

اجرای آزمون یکپارچگی و رگرسیون روی نسخه عملیاتی PMS پس از انتشار قابلیت رویدادهای تکرارپذیر؛ رفع شکست‌های CI و تست‌های نادرست بدون تغییر غیرضروری در منطق عملیاتی، و بررسی سازگاری Frontend/Backend، مجوزها، tenant isolation، Idempotency، فرم‌ها، پیوست‌ها و Workflowهای قدیمی.

محدوده ایمنی:
- همه اصلاحات QA در شاخه مستقل `qa/integration-regression-20261105` انجام می‌شوند.
- تا تأیید مالک محصول هیچ PR ادغام و هیچ نسخه‌ای دوباره منتشر نمی‌شود.
- آزمون‌هایی که به API محیط staging نیاز دارند، بدون تنظیمات staging به‌عنوان کامل/موفق گزارش نمی‌شوند.
- هیچ داده عملیاتی یا شیت موجود تغییر داده نمی‌شود.

تصمیم کسب‌وکاری تأییدشده:
- رویدادهای تکرارپذیر مانند «درخواست اصلاح نمونه» می‌توانند هر تعداد بار در مرحله جاری ثبت شوند.
- ثبت رویداد تکرارپذیر به‌تنهایی مرحله را تکمیل نمی‌کند.
- پایان مرحله باید با اقدام صریح مسئول مجاز آن اعلام شود.
- پس از پایان مرحله، ثبت رویدادهای آن مرحله متوقف و وضعیت مرحله تکمیل‌شده می‌شود.
- تعداد دفعات از پیش تعیین نمی‌شود.



## وضعیت ادغام و تحویل
- تغییرات Frontend از طریق PR #1 در `main` ادغام شدند؛ Merge Commit: `ec13efe137deb14c9937499666046538e35a46a0`.
- انتشار Frontend از طریق GitHub Pages workflow با Run ID `42090914176` و نتیجه `success` انجام شد.
- Backend نیز در مخزن عملیاتی مربوطه از طریق Workflow رسمی Apps Script با Run ID `42091457135` با موفقیت Push و Deploy شد.
- مالک محصول آزمون عملیاتی ثبت چندباره، مستقل بودن پاسخ فرم‌ها، عدم تکمیل خودکار مرحله، اعلام پایان توسط مسئول و جلوگیری از ثبت پس از پایان را موفق اعلام کرد.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

### مخازن و شاخه فاز
- Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه `feature/repeatable-workflow-events`
- Frontend: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه `feature/repeatable-workflow-events`
- مبنای شاخه feature آخرین `main` بررسی‌شده در 2026-11-05 بود؛ سپس از طریق PR #1 و به درخواست صریح کاربر در `main` ادغام شد.

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
- ادغام در main با تأیید صریح کاربر انجام شد؛ پذیرش عملیاتی و انتشار Backend همچنان منوط به آزمون و تأیید کاربر است. انتشار Frontend از مسیر GitHub Pages خودکار پس از ادغام آغاز شده و باید نتیجه آن جداگانه بررسی شود.

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
- [x] **Task 2 — پشتیبانی یکپارچه از رویدادهای تکرارپذیر و پایان دستی مرحله**
  - Backend: افزودن `AllowRepeat` به قواعد Workflow؛ شمارش occurrenceها؛ اجازه ثبت چندباره تا بسته‌شدن مرحله؛ افزودن `POST /projects/{id}/complete-step` با کنترل tenant، دسترسی پروژه، واحد مسئول، الزامات و Audit.
  - Frontend: تنظیم تکرارپذیری در `js/modules/workflows.js`؛ نمایش شمارنده، وضعیت مرحله و اقدام پایان برای مسئول مجاز در `js/modules/events.js`؛ حفظ مسیر اصلی `POST /events` و پاسخ مستقل فرم‌ها.
  - انتشار: Backend با Workflow Run `42091457135` (Push و Deploy موفق)؛ Frontend با GitHub Pages Run `42090914176` (موفق).
  - *Log:* Backend: `WorkflowStepEventRuleValidator.js` اعتبارسنجی `AllowRepeat`؛ `WorkflowStepEventRuleRepository.js` افزودن ستون و حفظ آن هنگام clone نسخه Workflow؛ `DatabaseSetup.js` افزودن header افزایشی؛ `EventService.js` شمارش occurrenceها و خروجی‌های `eventCount`, `allowRepeat`, `manualCompletionRequired`, `stepClosed`, `requirementsSatisfied`, `stageComplete`، متد `completeStep()` و کنترل `_canUserCompleteStep_()`؛ `EventRepository.js` و `GoogleSheetsRepository.js` اجرای revalidation در callback داخل ScriptLock؛ `Router.js` افزودن `POST /projects/{id}/complete-step` با `EVENT_CREATE`. Frontend: `js/modules/workflows.js` تنظیم `AllowRepeat`؛ `js/modules/events.js` ثبت مجدد رویداد، نمایش شمارنده و اقدام اعلام پایان؛ `index.html` cache-busting. ذخیره رویدادها در `13_Events` و پاسخ فرم‌ها در `35_EventFormData` با EventID مستقل؛ قواعد در `37_WorkflowStepEventRules`. تست‌های افزوده/به‌روزشده در `tests/workflow-event-enforcement.test.js` و `tests/workflow-management.test.js`. PRهای ادغام‌شده: Backend #2 (merge `91d7c80aaaae0f04284f00fab95a52e3b666c039`) و Frontend #1 (merge `ec13efe137deb14c9937499666046538e35a46a0`). آزمون پذیرش عملیاتی کاربر در 2026-11-05 موفق اعلام شد: حداقل سه ثبت هم‌نوع مستقل، شمارنده، عدم تکمیل خودکار، پایان دستی توسط مسئول و رد ثبت پس از بسته‌شدن مرحله تأیید شدند.
- [ ] **Task 3 — Integration QA & Regression (IN PROGRESS): آزمون سرتاسری و بررسی رگرسیون
  - [x] Discovery & Planning: هر دو `TODO5.md` و `ARCHITECTURE.md` خوانده شدند؛ شاخه‌ها و آخرین commitهای main بررسی شدند. Backend main در زمان شروع `123b2bfaae4929beb56aeda71c89984aaffbdbf0` و Frontend main `5a7978ea5d657b17a40132892f30f3f957f94d7d` بود. شاخه QA مستقل در هر دو مخزن از همین commitها ایجاد شد.
  - [x] اصلاح شکست‌های CI بک‌اند: سه تست `google-sheets-cache-invalidation.test.js` به دلیل نبود global مربوط به resolver دیتابیس در mock محیط تست fail می‌شدند؛ resolver آزمایشی به context تست اضافه شد. تست `schema-contract.test.js` انتظار workflow خودکار deploy روی push را داشت که با سیاست امنیتی جدید ناسازگار بود؛ assertionها با workflow واقعی manual-dispatch و تأیید صریح هم‌راستا شدند.
  - [x] اصلاح وابستگی تست مرورگر: نصب شناور Playwright به نسخه منتشرنشده `1.65.0` resolve می‌شد؛ workflow به نسخه پایدار منتشرشده `1.64.1` pin شد.
  - [x] Backend CI روی commit `ecbb842c6d9d834e963c06531ef4fcd22088a2ff`: 172/172 تست Backend موفق؛ 14/14 تست Procurement diagnostics موفق؛ هر دو agent مربوط به Domain Contract و QA/Release Safety موفق.
  - [x] Frontend CI روی commit `2ba6612976a79d5958248d818c834206a6907656`: Frontend Checks، Cross-repository QA، Browser Audit و تست واقعی دسترس‌پذیری/کیبورد موفق.
  - محدودیت باقیمانده: گزارش Browser Audit مقدار `overallStatus=blocked-no-staging-api` را برگرداند؛ مسیرهای بررسی‌شده خطای route، network یا console نداشتند، اما آزمون API/performance متصل به staging به دلیل نبود تنظیمات/دسترسی staging قابل تکمیل نبود. این مورد به‌عنوان قبولی کامل API staging محسوب نمی‌شود.
  - PRها برای بازبینی و نگهداری تغییرات QA باز و Draft هستند: Backend PR #3 و Frontend PR #2. هیچ‌کدام ادغام نشده‌اند و main/نسخه عملیاتی تغییر نکرده است.
  - *Log موقت:* Backend: `tests/google-sheets-cache-invalidation.test.js` و `tests/schema-contract.test.js`. Frontend: `.github/workflows/pms-ui-performance-audit.yml`. شاخه‌های QA: `qa/integration-regression-20261105`. اجرای تست‌ها از GitHub Actions انجام شد؛ نتیجه نهایی Task 3 پس از رفع محدودیت staging و تأیید مالک محصول ثبت می‌شود.
