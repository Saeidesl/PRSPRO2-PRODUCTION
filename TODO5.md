## 🎯 Current Objective

افزایش سرعت بارگذاری و نمایش اطلاعات در فرم اصلی ثبت رویدادها، با حفظ مسیرهای موجود، سازگاری Frontend/Backend، صحت داده‌ها، کنترل دسترسی و رفتار فعلی ثبت رویداد.

هدف فاز: کاهش زمان آماده‌شدن فرم از لحظه بازشدن تا آماده‌شدن انتخاب پروژه، انواع رویداد، فرم‌های متصل و اطلاعات وابسته؛ حذف درخواست‌ها و پردازش‌های تکراری؛ و اندازه‌گیری عددی قبل و بعد از بهینه‌سازی.

## 🗺️ Technical Spec & Architecture Map (DO NOT DELETE)

### مخازن و شاخه‌های عملیاتی

- Backend: `Saeidesl/PRSPRO2BACKEND-PRODUCTION`، شاخه `main`.
- Frontend: `Saeidesl/PRSPRO2-PRODUCTION`، شاخه `main`.
- آخرین وضعیت مبنای آغاز فاز در 2026-11-06:
  - Backend HEAD: `e91fde875b330d47ec4dfc3d663472051002c37f`
  - Frontend HEAD: `083d858401ebd7e7068e3ec4871041b6aecc34e9`
- هر دو مخزن قابل دسترسی و دارای مجوز push هستند؛ شاخه پیش‌فرض هر دو `main` و در زمان بررسی protected=false بود.
- این فاز فقط در همین دو مخزن عملیاتی انجام می‌شود. شاخه محافظت‌شده، مخزن توسعه یا محیط عملیاتی داده‌ها نباید بدون مجوز صریح تغییر کند.

### Frontend — صفحه و جریان فرم ثبت رویداد

- `pages/events.html`: میزبان صفحه رویدادها و نقطه ورود به فرم ثبت رویداد.
- `js/modules/events.js`: ماژول اصلی صفحه و فرم.
  - `Events.load`: دریافت و نمایش اولیه رویدادها، پروژه‌ها و انواع رویداد.
  - `Events.openForm`: ساخت Modal فرم؛ پرکردن گزینه‌های پروژه از `this.projects`؛ اتصال رویدادهای انتخاب پروژه/نوع رویداد.
  - `Events.refreshEventTypeOptions`: اعمال محدودیت‌های نوع رویداد با توجه به مجوز، پروژه Draft و پیشرفت گردش‌کار.
  - `Events.loadEventForms` و `Events.loadConfiguredForms`: دریافت و آماده‌سازی فرم‌های متصل به نوع رویداد از `GET /event-types/{eventTypeId}/forms`؛ تعریف فیلدها در `formDefinitions` و رندر با `renderConfiguredForms`.
  - `Events.loadWorkflowProgress`: دریافت `GET /projects/{projectId}/workflow-progress`؛ وضعیت بارگذاری/خطا روی مجازبودن انتخاب نوع رویداد اثر دارد.
  - `Events.loadEventContext`: دریافت `GET /projects/{projectId}/information`، فیلتر اطلاعات مرکزی مرتبط با فیلدهای فرم، سپس دریافت پاسخ فرم‌های حداکثر سه رویداد قبلی از `GET /events/{eventId}/forms`.
  - `Events.loadAmendmentSourceEvents`: دریافت `GET /projects/{projectId}/events` و جست‌وجوی پاسخ فرم رویدادها از طریق `GET /events/{eventId}/forms` به‌صورت ترتیبی تا یافتن پاسخ مبنا.
  - `Events.scheduleRefreshRender`: تجمیع رندرهای refresh منابع اولیه؛ debounce فعلی 40ms.
  - پس از ثبت رویداد، کلیدهای کش رویدادها، پروژه‌ها، انواع رویداد، داشبورد و جزئیات پروژه invalidation می‌شوند؛ کلیدهای جدید این فاز نیز باید به سیاست invalidation موجود متصل شوند.
- `js/core/api.js`:
  - `Api.get`: ادغام درخواست‌های GET هم‌زمان بر اساس token، path، query و گزینه‌های tracking/retry از طریق `inFlightGetRequests`.
  - `Api.getCached`: نمایش cache موجود و refresh پس‌زمینه؛ در نبود cache منتظر پاسخ شبکه می‌ماند.
  - `Api.getFresh`: دریافت تازه و ذخیره نتیجه.
  - `Api.invalidate` و `Api.invalidateMany`: حذف cache.
  - نکته مهم کشف‌شده: `getCached` در حال حاضر هنگام `Cache.set` مقدار TTL اختصاصی ارسال نمی‌کند؛ همچنین درخواست تازه را حتی هنگام وجود cache آغاز می‌کند. این رفتار stale-while-revalidate است و باید با سناریوهای واقعی و نیاز تازگی داده سنجیده شود، نه اینکه کورکورانه حذف شود.
- `js/core/cache.js`:
  - ذخیره در `localStorage` با prefix برابر `PMS_CACHE_` و نسخه `1.0.0`.
  - `Cache.set(key,data,{ttl})` از TTL پشتیبانی می‌کند؛ بدون TTL مقدار `expiresAt=null` و cache بدون انقضای زمانی می‌ماند.
  - `Cache.get`, `getMeta`, `remove`, `clearExpired` و کلیدهای استاندارد از جمله `PROJECTS`, `EVENTS`, `EVENT_TYPES` موجودند.
- `index.html`: ترتیب بارگذاری و cache-busting فایل‌های CSS/JS؛ هر تغییر Frontend باید نسخه assetها را طبق الگوی موجود به‌روز کند.
- `tests/`: تست‌های قرارداد API، کش، صفحه رویداد، گردش‌کار و رگرسیون موجود؛ پیش از افزودن تست جدید، تست‌های نزدیک موجود بررسی و توسعه داده شوند.

### Backend — Router، سرویس‌ها و APIهای موجود

- `Router.js`: نقطه مسیریابی و مجوزهای نهایی.
  - `GET /events` → `EventService.list(params)` با `EVENT_VIEW`.
  - `GET /projects` → `ProjectService.list(params)` با کنترل دسترسی پروژه.
  - `GET /event-types` → `EventTypeService.list(params)` با مجوزهای `EVENT_TYPE_MANAGE` / `EVENT_CREATE` / `SYSTEM_SETTINGS`.
  - `GET /event-types/{eventTypeId}/forms` → `FormService.listEventTypeForms(eventTypeId, params)`.
  - `GET /projects/{projectId}/information` → `ProjectInformationService.list(projectId, params)`.
  - `GET /projects/{projectId}/workflow-progress` → `EventService.workflowProgress(projectId, params)`.
  - `GET /projects/{projectId}/events` → `EventService.listByProject(projectId, params)`.
  - `GET /events/{eventId}/forms` → `FormService.getEventResponses(eventId, params)`.
  - ثبت اصلی همچنان `POST /events` است؛ ایجاد مسیر ثبت موازی ممنوع است.
- `ProjectService.js:list`:
  - ابتدا `ProjectRepository.getAll()` و فیلتر tenant، دسترسی و وضعیت Draft را اجرا می‌کند.
  - سپس برای ساخت `CardInformation`، انواع اطلاعات دارای `ShowOnCard`، ستون‌ها و تمام `ProjectInformationRepository.getAll()` را می‌خواند و روی پروژه‌ها تجمیع می‌کند.
  - فرم انتخاب پروژه عمدتاً به شناسه، کد، عنوان، وضعیت و چند فیلد لازم برای کنترل workflow نیاز دارد؛ این اختلاف بین payload کامل کارت پروژه و نیاز picker یک گلوگاه محتمل و اولویت بررسی Task 2 است. هر projection سبک باید در همان قرارداد/مسیر موجود و با حفظ مجوز و tenant isolation طراحی شود.
- `EventTypeService.js:list`: همه انواع رویداد را از `EventTypeRepository.getAll()` می‌خواند، tenant و مجوز/واحد/کاربر را فیلتر و نرمال‌سازی می‌کند.
- `FormService.js:listEventTypeForms`:
  - mappingهای `FormRepository.findMappingsByEventType` را فیلتر و مرتب می‌کند.
  - برای هر mapping فرم را با `findForm` می‌خواند و `_definition` را اجرا می‌کند.
  - `_definition` فیلدها را با `findFieldsByForm` می‌گیرد؛ برای هر فیلد `InformationTypeRepository.findById` و `findColumns` را فراخوانی می‌کند و snapshot تعریف را می‌سازد.
  - این ساختار، با وجود cache درون‌درخواستی Repository، کاندیدای اصلی تجمیع خواندن‌ها و ساخت indexهای گروهی است.
- `FormService.js:getEventResponses`: پاسخ‌های snapshot شده رویداد را از `35_EventFormData` بازیابی می‌کند؛ نسخه و Values پاسخ باید بدون تغییر باقی بماند.
- `ProjectInformationService.js:list`: اطلاعات مرکزی پروژه، نوع اطلاعات، ستون‌ها، revision/approval و وضعیت همگام‌سازی مرجع را آماده می‌کند؛ پاسخ این endpoint می‌تواند حجیم‌تر از نیاز اولیه فرم باشد.
- `EventService.js:workflowProgress`: پروژه و پیشرفت قواعد workflow را اعتبارسنجی می‌کند، انواع رویداد و نام مرحله را اضافه می‌کند و امکان تکمیل مرحله را تعیین می‌کند؛ نتیجه در فرانت‌اند روی گزینه‌های مجاز اثر مستقیم دارد.
- `EventService.js:list` و `_enrichEventsBatch_`: رویدادها را tenant-scoped کرده و پروژه‌ها، انواع رویداد، کاربران و واحدها را به‌صورت batch enrich می‌کند.
- `GoogleSheetsRepository.js`:
  - cache درون‌درخواستی برای list/record/find/column index دارد: `_requestListCache`, `_requestRecordCache`, `_requestFindCache`, `_requestColumnIndexCache`.
  - `getAll` یک محدوده شیت را یک‌جا می‌خواند و نتیجه را در cache درخواست نگه می‌دارد؛ `findById` و جست‌وجوی ستون نیز از indexهای درخواست استفاده می‌کنند.
  - `resetRequestCache` و `_invalidateSheetRecordCache` برای کنترل عمر و invalidation وجود دارند.
  - `_logTiming` زمان عملیات و cacheHit را به `PerformanceDiagnostics.record` منتقل می‌کند؛ در صورت فعال‌بودن تنظیم، log کنسول نیز دارد.
  - cache این Repository بین درخواست‌های مستقل تضمین‌شده نیست؛ بهینه‌سازی اصلی باید تعداد range readها و پردازش تکراری در هر درخواست را کاهش دهد.
- Repositoryهای داده:
  - `ProjectRepository.js` → شیت `08_Projects`.
  - `EventTypeRepository.js` → شیت `11_EventTypes`.
  - `EventRepository.js` → شیت `13_Events`.
  - `InformationTypeRepository.js` → شیت‌های `28_InformationTypes` و `29_InformationTypeColumns`.
  - `ProjectInformationRepository.js` → شیت‌های `30_ProjectInformation` و `31_ProjectInformationHistory`.
  - `FormRepository.js` → `32_Forms`, `33_FormFields`, `34_EventTypeForms`, `35_EventFormData`.
- ساختار داده، Snapshot فرم، tenant isolation، مجوزهای Backend، اعتبارسنجی سمت سرور، idempotency و مسیر اصلی ثبت رویداد باید حفظ شوند.

### جریان داده فعلی فرم ثبت رویداد

1. `Events.load` سه منبع اصلی `/events`, `/projects`, `/event-types` را با `Api.getCached` می‌گیرد و cache را فوراً نمایش می‌دهد؛ پاسخ تازه در پس‌زمینه state و رندر را به‌روز می‌کند.
2. `Events.openForm` گزینه‌های پروژه را از آرایه پروژه‌های بارگذاری‌شده می‌سازد.
3. با انتخاب پروژه، درخواست workflow progress و اطلاعات مرکزی پروژه شروع می‌شود؛ در حالت اصلاح، جست‌وجوی رویداد/فرم مبنا نیز شروع می‌شود.
4. با انتخاب نوع رویداد، فرم‌های متصل از endpoint مربوط دریافت و تعریف فرم‌ها رندر می‌شوند؛ سپس پنل اطلاعات مرتبط نیز با تعریف فیلدهای فرم پالایش می‌شود.
5. پنل اطلاعات مرتبط برای حداکثر سه رویداد اخیر، پاسخ فرم‌ها را جداگانه می‌گیرد.
6. ثبت نهایی از `POST /events` و جریان فعلی اعتبارسنجی/snapshot/ذخیره استفاده می‌کند.

### یافته‌های Discovery و گلوگاه‌های اولیه

- فقط سه منبع اصلی رویدادها، پروژه‌ها و انواع رویداد از cache فرانت‌اند استفاده می‌کنند؛ فرم‌های متصل، اطلاعات مرکزی پروژه، workflow progress و پاسخ فرم‌های قبلی مستقیماً درخواست می‌شوند.
- cache موجود TTL پیش‌فرض ندارد؛ در نتیجه کلیدهای ذخیره‌شده بدون TTL می‌توانند قدیمی بمانند. از طرف دیگر `getCached` در حضور cache نیز refresh شبکه را آغاز می‌کند.
- endpoint فهرست پروژه، اطلاعات CardInformation را برای همه پروژه‌های قابل مشاهده می‌سازد؛ این اطلاعات برای picker احتمالاً بیش از نیاز است.
- دریافت تعریف فرم‌های متصل شامل mapping → form → fields → information type → columns است و متد فعلی این زنجیره را در حلقه فرم/فیلد اجرا می‌کند.
- `loadEventContext` اطلاعات مرکزی را می‌گیرد و سپس پاسخ فرم‌های حداکثر سه رویداد را با `Promise.all` دریافت می‌کند؛ این درخواست‌ها به تغییر نوع رویداد نیز وابسته‌اند، در حالی که بخشی از اطلاعات پروژه با تغییر نوع ثابت می‌ماند.
- حالت اصلاح در `loadAmendmentSourceEvents` پاسخ فرم‌ها را در حلقه ترتیبی روی رویدادها جست‌وجو می‌کند؛ باید از نظر تعداد درخواست و مسیر داده بهینه شود.
- `workflowProgress` برای پروژه‌های دارای گردش‌کار ضروری است؛ پروژه Draft یا بدون Workflow/CurrentStep در Frontend از درخواست آن عبور می‌کند.
- Backend در `GoogleSheetsRepository` instrumentation و cache درون‌درخواستی دارد، اما گزارش عملکرد واقعی فرم احراز هویت‌شده در محیط staging در دسترس نیست. گزارش `test-results/latest-performance-report.md` در آخرین audit فقط login را پوشش داده و وضعیت `blocked-no-staging-api` داشته است؛ بنابراین baseline واقعی API باید در Task 2 با محیط تست امن و بدون استفاده از داده عملیاتی تهیه شود.
- زمان‌های هدف قبلی صرفاً معیار پیشنهادی بودند و هنوز baseline یا نتیجه اندازه‌گیری‌شده محسوب نمی‌شوند.

### اصول غیرقابل نقض

- endpoint یا مسیر موازی برای ثبت رویداد ایجاد نشود؛ مسیر اصلی `POST /events` حفظ شود.
- APIهای موجود تا حد امکان حفظ شوند؛ هر تغییر قرارداد باید با Frontend/Backend و تست قرارداد هماهنگ باشد.
- کش فقط برای سرعت نمایش است و هرگز جایگزین مجوز، tenant isolation، اعتبارسنجی، workflow rules یا کنترل نسخه سمت Backend نیست.
- داده cache شده باید با شناسه کاربر/tenant و نشست مناسب scope شود؛ داده کاربران/مجموعه‌ها نباید نشت کند.
- پس از تغییر پروژه، نوع رویداد، اتصال فرم، تعریف فرم، اطلاعات مرکزی، workflow یا ثبت رویداد، invalidation دقیق و قابل اتکا الزامی است.
- حفظ رفتار پروژه‌های Draft و Independent، ثبت سریع/کامل، پاسخ‌های چندردیفی، فایل‌ها، فرم‌های اصلاحی، Snapshot، تاریخچه و Idempotency الزامی است.
- هیچ Sheet، schema، permission یا داده عملیاتی بدون ضرورت و بررسی سازگاری تغییر نکند.
- ادغام GitHub، Backend deployment، Frontend deployment و live verification چهار وضعیت جداگانه‌اند.

## 📋 Macro-Task Queue & Implementation Log

### Task 1 — Discovery & Planning: بررسی معماری و طراحی برنامه بهینه‌سازی [x]

- مخازن عملیاتی، شاخه‌ها، HEAD، TODO5 و ARCHITECTURE هر دو مخزن بررسی شد.
- مسیرهای فرم ثبت رویداد، APIها، سرویس‌ها، Repositoryها، cache فرانت‌اند و cache درون‌درخواستی Google Sheets ردیابی شد.
- گلوگاه‌های اولیه شامل payload سنگین فهرست پروژه، نبود cache برای فرم‌های متصل/اطلاعات وابسته، ساخت تکراری definition فرم‌ها، دریافت اطلاعات تاریخی و زنجیره ترتیبی حالت اصلاح شناسایی شد.
- چهار Macro-Task فاز مطابق تأیید مالک محصول تعریف شد.
- *Log:* Frontend: `pages/events.html`, `js/modules/events.js` (از جمله `Events.load`, `openForm`, `loadEventForms`, `loadConfiguredForms`, `loadEventContext`, `loadWorkflowProgress`, `loadAmendmentSourceEvents`, `refreshEventTypeOptions`, `scheduleRefreshRender`), `js/core/api.js` (`get`, `getCached`, `getFresh`, in-flight GET deduplication, invalidation), `js/core/cache.js` (localStorage, TTL, metadata). Backend: `Router.js`; `ProjectService.js:list`; `EventTypeService.js:list`; `FormService.js:listEventTypeForms`, `_definition`, `getEventResponses`; `ProjectInformationService.js:list`; `EventService.js:workflowProgress`, `list`, `_enrichEventsBatch_`; `GoogleSheetsRepository.js:getAll`, `findById`, `resetRequestCache`, `_invalidateSheetRecordCache`, `_logTiming`. APIهای ردیابی‌شده: `GET /events`, `GET /projects`, `GET /event-types`, `GET /event-types/{id}/forms`, `GET /projects/{id}/information`, `GET /projects/{id}/workflow-progress`, `GET /projects/{id}/events`, `GET /events/{id}/forms`, و مسیر ثبت موجود `POST /events`. شیت‌های مرتبط: `08_Projects`, `11_EventTypes`, `13_Events`, `28_InformationTypes`, `29_InformationTypeColumns`, `30_ProjectInformation`, `31_ProjectInformationHistory`, `32_Forms`, `33_FormFields`, `34_EventTypeForms`, `35_EventFormData`. هیچ کد runtime یا داده عملیاتی تغییر نکرد.

### Task 2 — Baseline & بهینه‌سازی دریافت اطلاعات اصلی [x]

- *Log:* Backend: `EventTypeService.js:list(params)` با پشتیبانی اختیاری `includeFormDefinitions=true` روی همان `GET /event-types`؛ استفاده مجدد از `FormService.listEventTypeForms`، حفظ tenant/filter/permission و رفتار پیش‌فرض قبلی، ایزوله‌سازی خطای هر نوع رویداد و fallback به `GET /event-types/{id}/forms`؛ تست `tests/event-type-form-prefetch.test.js`. `ProjectService.js:list(params)` و projection موجود `view=event-picker` برای کاهش payload انتخاب پروژه؛ batch/index تعریف فرم‌ها و cache tenant-scoped با TTL شصت‌ثانیه و invalidation در تغییرات فرم. Frontend: `js/modules/events.js` prefetch غیرمسدودکننده هنگام بازشدن Modal ثبت رویداد و ورود به پنل پروژه، cache موقت scoped به نشست/token و invalidation؛ در صورت آماده‌نبودن prefetch، endpoint قبلی per-event-type بدون انتظار اجرا می‌شود. تست‌ها: `tests/event-form-cache-policy.test.js`, `tests/event-form-performance-audit.test.js` و تست‌های Backend `event-form-definition-batch`, `event-project-picker-projection`, `event-form-definition-cache`, `event-type-form-prefetch`. API ثبت `POST /events` و ساختار Sheet/DB تغییر نکرد. Backend PR #18 با commit `ca703356253fcc288798512aab311676e7251ca0` ادغام شد و انتشار Apps Script توسط مالک محصول اعلام شد؛ Frontend PR #38 با commit `59a1b597033daf45e992ff7c0f573b3edf824aa7` ادغام و GitHub Pages workflow موفق شد. تست عملی مالک محصول: فرم بلافاصله نمایش داده می‌شود. Browser audit run `42284750517` روی commit Frontend فوق با conclusion=success تکمیل شد؛ audit پیشین PR snapshot قبل از انتشار Backend بود و به‌عنوان سنجش نهایی زمان تولید تفسیر نمی‌شود.

- ایجاد/تکمیل اندازه‌گیری امن و قابل تکرار برای زمان بازشدن فرم، آماده‌شدن منابع اصلی، تعداد درخواست‌ها، cache hit/miss، زمان سرویس‌ها و عملیات خواندن Google Sheets.
- تهیه baseline از محیط تست/Staging احراز هویت‌شده؛ عدم استفاده از دیتابیس یا API تولید برای تست مخرب.
- بررسی و سبک‌سازی دریافت فهرست پروژه برای picker با reuse مسیر موجود و حفظ فیلدهای لازم برای Draft/Independent و workflow.
- بهینه‌سازی دریافت انواع رویداد و تعریف فرم‌های متصل؛ کاهش خواندن تکراری فرم/فیلد/نوع اطلاعات/ستون‌ها با batch/index در همان درخواست.
- طراحی و پیاده‌سازی سیاست TTL و stale-while-revalidate برای داده‌های مرجع، با scope امن و invalidation دقیق.
- خروجی قابل آزمون: گزارش baseline و مقایسه تعداد درخواست/زمان آماده‌شدن منابع اصلی، بدون تغییر رفتار مجازبودن رویداد یا قرارداد ثبت.

### Task 3 — بهینه‌سازی اطلاعات وابسته و تاریخی (IN PROGRESS)
#### Task 3 — پیاده‌سازی اولیه در شاخه کاری (در انتظار CI و بازبینی)

- Frontend branch: `feat/event-dependent-data-cache`، PR #39.
- `js/modules/events.js`: cache حافظه‌ای محدود به token/session با TTL شصت‌ثانیه برای اطلاعات مرکزی پروژه و پاسخ فرم‌های رویداد؛ TTL پانزده‌ثانیه برای workflow progress؛ ادغام درخواست‌های هم‌زمان یکسان (in-flight deduplication).
- invalidation cache با پایان نشست، تغییر مسیرهای فرم/نوع رویداد/اطلاعات/پروژه، ثبت رویداد، اصلاح پاسخ فرم و تکمیل مرحله انجام می‌شود. generation guard مانع ذخیره پاسخ درخواست قدیمی پس از invalidation می‌شود.
- جست‌وجوی فرم مبنا در حالت اصلاح به batchهای چهارتایی موازی تغییر کرد؛ ترتیب جدیدترین رویداد، allow-list، کنترل stale request و فیلدهای `FormVersion` و `ExpectedUpdatedAt` حفظ شده‌اند.
- `index.html` cache-busting فایل events به‌روزرسانی شد. تست‌های `tests/event-context-filtering.test.js` برای TTL، deduplication، invalidation، batch و version guards گسترش یافت.
- API، Router، سرویس Backend، Sheet و schema تغییر نکرده‌اند؛ این مرحله از APIهای فعلی و کنترل دسترسی Backend استفاده می‌کند. CI و تست مرورگر هنوز در حال اجرا/بررسی‌اند؛ Task 3 تکمیل اعلام نمی‌شود.


#### Task 3 — Discovery تکمیلی و نقشه جریان داده

- Frontend در `js/modules/events.js`:
  - `Events.loadEventContext(projectId, eventTypeId)` در هر بار اجرا `GET /projects/{id}/information` را دریافت می‌کند؛ سپس رویدادهای مرتبط را از آرایه `this.events` فیلتر می‌کند و برای حداکثر سه رویداد، `GET /events/{eventId}/forms` را به‌صورت موازی می‌فرستد. تغییر نوع رویداد باعث اجرای مجدد مسیر و دریافت دوباره اطلاعات مرکزی پروژه می‌شود، با اینکه منبع اطلاعات مرکزی فقط به ProjectID وابسته است.
  - پاسخ‌های فرم تاریخی در متغیر موقت `eventContextHistoryRequests` ثبت/مدیریت می‌شوند، اما cache قابل استفاده مجدد بین تغییر نوع رویداد/بازشدن مجدد فرم هنوز وجود ندارد. باید کلید cache شامل token/session، ProjectID و EventID باشد و TTL و invalidation دقیق داشته باشد.
  - `Events.loadWorkflowProgress(projectId)` برای پروژه‌های Draft یا فاقد WorkflowID/CurrentStepID درخواست نمی‌فرستد؛ برای پروژه‌های فعال هر بار `GET /projects/{id}/workflow-progress` را اجرا می‌کند. requestId از اعمال پاسخ قدیمی جلوگیری می‌کند اما درخواست‌های هم‌زمان/تکراری را deduplicate نمی‌کند و cache پروژه‌محور ندارد.
  - `Events.loadAmendmentSourceEvents(projectId)` ابتدا `GET /projects/{id}/events` را می‌گیرد، رویدادها را مرتب می‌کند و سپس به‌صورت ترتیبی برای هر رویداد `GET /events/{id}/forms` می‌فرستد تا اولین فرم مجاز را بیابد؛ این مسیر در پروژه‌های پررویداد می‌تواند تعداد round-trip زیادی ایجاد کند. منطق allow-list فرم، انتخاب جدیدترین پاسخ و انتقال `FormVersion` و `UpdatedAt` به کنترل‌های اصلاح باید حفظ شود.
- Backend در `EventService.js`:
  - `listByProject(projectId, params)` رویدادهای پروژه را با tenant و دسترسی پروژه کنترل و سپس با `_enrichEventsBatch_` تکمیل می‌کند؛ endpoint فعلی داده timeline را برمی‌گرداند و می‌تواند منبع فهرست candidateها باقی بماند.
  - `workflowProgress(projectId, params)` پروژه و دسترسی را مجدداً کنترل می‌کند، `_getWorkflowRuleProgress_`، فهرست انواع رویداد و نام مرحله را می‌خواند؛ cache باید در سطح درخواست/کاربر و tenant امن باشد و پس از ثبت رویداد، تغییر workflow یا تکمیل مرحله invalid شود. Cache سمت Frontend فقط برای نمایش است و اعتبارسنجی نهایی Backend را جایگزین نمی‌کند.
- محدوده اجرای Task 3: ابتدا cache/in-flight deduplication امن برای اطلاعات مرکزی پروژه، پاسخ فرم‌های تاریخی و workflow progress؛ سپس کاهش درخواست ترتیبی حالت اصلاح با یک روش batch سازگار با APIهای موجود. ایجاد مسیر ثبت جدید یا تغییر schema/Sheet در این مرحله مجاز نیست.
- معیارهای پذیرش: تغییر نوع رویداد نباید دوباره اطلاعات مرکزی ثابت پروژه را fetch کند؛ پاسخ‌های تاریخی و workflow برای همان نشست/پروژه از cache معتبر یا درخواست مشترک استفاده کنند؛ تغییر داده/ثبت رویداد cache را invalid کند؛ حالت اصلاح جدیدترین پاسخ مجاز را با نسخه و زمان به‌درستی بارگذاری کند؛ tenant isolation، پروژه Draft/Independent و مجوزها بدون تغییر بمانند.
- در این مرحله فقط Discovery انجام شد؛ هنوز هیچ فایل runtime، API، Sheet یا داده عملیاتی تغییر نکرده است.

- بهینه‌سازی و cache کنترل‌شده اطلاعات مرکزی پروژه و پاسخ فرم‌های قبلی.
- کاهش درخواست‌های تکراری پنل اطلاعات مرتبط هنگام تغییر نوع رویداد.
- بهینه‌سازی دریافت workflow progress با جلوگیری از درخواست تکراری و invalidation پس از ثبت رویداد/تکمیل مرحله.
- بازطراحی جست‌وجوی پاسخ مبنا در حالت اصلاح برای حذف درخواست‌های ترتیبی غیرضروری، با حفظ FormVersion و ExpectedUpdatedAt.
- حفظ lazy loading برای تاریخچه‌هایی که کاربر صریحاً باز می‌کند.
- خروجی قابل آزمون: انتخاب پروژه/نوع رویداد و حالت اصلاح با تعداد درخواست کمتر و بدون پاسخ قدیمی یا اشتباه.

### Task 4 — بهینه‌سازی نمایش، یکپارچه‌سازی کش و Regression

- کاهش رندرهای تکراری فرم، picker و پنل اطلاعات؛ حفظ نمایش فوری cache و refresh پس‌زمینه.
- مدیریت loading/error/empty state و جلوگیری از پرش UI در دسکتاپ و موبایل.
- تکمیل ماتریس invalidation برای تغییر پروژه، event type، form mapping، form definition، project information، workflow و ثبت رویداد.
- آزمون قرارداد API، مجوزها، tenant isolation، Draft/Independent، ثبت سریع/کامل، فرم چندردیفی، فایل، اصلاح فرم، Snapshot، تاریخچه و Idempotency.
- مقایسه نهایی با baseline و ثبت زمان‌ها/تعداد درخواست‌ها و نتایج آزمون؛ هیچ ادعای سرعت بدون اندازه‌گیری ثبت نشود.
- خروجی قابل آزمون: فرم ثبت رویداد سریع‌تر و پایدارتر، بدون رگرسیون در ثبت و صحت داده.

### Implementation Log

- شروع فاز: 2026-11-06.
- Task 1 تکمیل و Task 2 در وضعیت IN PROGRESS قرار گرفت.
- تا این نقطه فقط مستندات TODO5 به‌روزرسانی می‌شود؛ هیچ تغییر اجرایی، انتشار یا مهاجرت داده انجام نشده است.

#### Task 2 — Implementation progress (در انتظار تکمیل ارزیابی و پذیرش؛ baseline احراز هویت‌شده تهیه شد)

- `js/modules/events.js`:
  - دریافت پروژه‌ها برای صفحه رویداد از همان `GET /projects` با query برابر `view=event-picker` انجام می‌شود؛ دیگر payload کامل CardInformation برای فهرست انتخاب پروژه دریافت نمی‌شود.
  - نتیجه picker فقط در حافظه همان نشست و با scope توکن نگه داشته می‌شود؛ با تغییر توکن پاک می‌شود. بعد از ثبت رویداد، مقدار حافظه invalidate می‌شود.
  - cache فهرست رویدادها 15 ثانیه و cache انواع رویداد 60 ثانیه TTL دارند.
- `js/core/api.js`:
  - `Api.getCached` گزینه `cacheTtl` را می‌پذیرد؛ cacheهای قدیمی بدون expiry هنگام درخواست TTL به‌عنوان cache معتبر پذیرفته نمی‌شوند و پاسخ تازه با همان TTL ذخیره می‌شود. رفتار فراخوانی‌های قدیمی بدون TTL حفظ شد.
- `js/modules/projects.js:loadProjects`:
  - پس از دریافت تازه فهرست پروژه‌ها، cache حافظه‌ای picker رویداد invalidate می‌شود.
- `scripts/pms-ui-performance-audit.cjs` و `.github/workflows/pms-ui-performance-audit.yml`:
  - scope مستقل `events` افزوده شد؛ audit مرورگر بدون ثبت داده، پروژه و نوع رویداد مجاز را انتخاب می‌کند و زمان بازشدن Modal، آماده‌شدن workflow و آماده‌شدن تعریف فرم را اندازه می‌گیرد.
  - خلاصه diagnostics مرورگر/Backend فقط برای endpointهای مرتبط ثبت می‌شود؛ شناسه‌ها و query stringهای حاوی token ذخیره نمی‌شوند.
- تست‌های جدید: `tests/event-form-performance-audit.test.js`, `tests/event-project-picker-performance.test.js`, `tests/event-form-cache-policy.test.js`; تست قبلی `tests/draft-event-type-visibility.test.js` با قرارداد جدید query-view هماهنگ شد.
- CI Frontend و Cross-repository QA در commit `2131d6e7f4ec3d02d1831a7b60f068e5b8df4302` موفق شدند؛ commit جدیدتر شامل فعال‌سازی diagnostics در PR audit است و در حال بررسی است.
- PR عملیاتی Frontend: #37، شاخه `feat/event-form-performance`. PR عملیاتی Backend: #17، شاخه `feat/event-form-performance`. هنوز merge/deployment انجام نشده است.
- محدودیت baseline: audit مرورگر در PR با وضعیت `blocked-no-staging-api` اجرا شد؛ فقط login عمومی با زمان 199ms اندازه‌گیری شد؛ 0 خطای Console و 0 خطای Page ثبت شد. چون `PMS_STAGING_API_BASE_URL` و اعتبارنامه تست در GitHub Actions تنظیم نشده‌اند، فرم ثبت رویداد و endpointهای محافظت‌شده قابل اندازه‌گیری نبودند. هیچ login یا درخواست تستی به API تولید ارسال نشد.

- اصلاح ابزار Browser Audit پس از کشف عدم تطابق با UI عملیاتی: دکمه قدیمی `event-create-button` در مسیر فعلی وجود ندارد؛ آزمون اکنون از ورودی واقعی پروژه با `data-event-entry="project"` وارد پنل انتخاب پروژه شده و اولین اقدام `.event-recent-project-action` را برای بازکردن فرم دنبال می‌کند. تست `tests/event-form-performance-audit.test.js` نیز این مسیر واقعی را بررسی می‌کند.
- Commitهای اصلاح ابزار و تست: `a960e1e81c622ef03b14f87c5d8dd8f1f01ac27a` و `17612424f7b91e26d0b5d32f6e177d995194a8c8`. Frontend checks، Frontend agent suite و Cross-repository QA روی commit دوم موفق شدند.
- اجرای Browser Audit روی commit دوم با شناسه `42274108059` آغاز شده است؛ آخرین وضعیت ثبت‌شده هنوز در مرحله نصب Playwright/Chromium است و artifact گزارش هنوز تولید نشده. بنابراین زمان‌های واقعی Modal، workflow و فرم‌های متصل هنوز تأیید نشده‌اند و Task 2 باز می‌ماند.


#### Task 2 — گزارش سنجش احراز هویت‌شده و کنترل‌های تکمیلی (2026-11-06)

- اجرای مرورگر واقعی روی Staging احراز هویت‌شده با Run شماره `42277205597` و Artifact شماره `13532194544` تکمیل شد؛ حالت اجرا `authenticated-read-only` و وضعیت `authenticated-audit-complete` بود.
- نتایج فرم ثبت رویداد: آماده‌شدن Modal برابر `1409ms`؛ آماده‌شدن پروژه و Workflow برابر `3723ms`؛ آماده‌شدن تعریف فرم‌های متصل برابر `9207ms`؛ تعداد گزینه پروژه `2`؛ انواع رویداد مجاز `10`؛ کنترل‌های فرم متصل `2`.
- سلامت مرورگر: `47` درخواست شبکه؛ `0` درخواست ناموفق؛ `0` خطای Console؛ `0` خطای Page؛ بدون سرریز افقی در viewport موبایل `390px`. هیچ مقداری وارد و هیچ رویدادی ثبت نشد.
- گزارش، زمان مرورگر برای endpointهای نمونه را نیز ثبت کرده است: `GET /event-types/:id/forms = 5332ms`، `GET /projects/:id/information = 4443ms` و `GET /projects/:id/workflow-progress = 3594ms`. این اعداد زمان مشاهده‌شده در مرورگرند و به‌دلیل نبود جدول diagnostics مدیریتی، زمان خالص Backend/Google Sheets محسوب نمی‌شوند.
- baseline قبل از تغییرات در دسترس نیست؛ بنابراین درصد بهبود یا کاهش قطعی زمان ادعا نمی‌شود. زمان `9207ms` برای تعریف فرم‌ها هنوز زیاد است و نقطه تمرکز ادامه Task 2 خواهد بود.
- کنترل Backend روی HEAD شاخه PR #17: Backend source checks و PMS agent suite هر دو موفق؛ `179/179` تست Backend پاس، `85` فایل منبع JavaScript و manifest بررسی شدند؛ Domain Contract و QA/Release Safety بدون finding بحرانی موفق شدند. Runها: `42277904168` و `42277903928`.
- کنترل Frontend روی HEAD شاخه PR #37: Frontend checks، frontend agent suite و Cross-repository QA موفق؛ Browser Audit احراز هویت‌شده نیز بدون خطای مرورگر تکمیل شد.
- PRها همچنان باز و ادغام‌نشده‌اند؛ هیچ Backend deployment، Frontend deployment یا live verification بعد از ادغام انجام نشده است.
- وضعیت Task 2: `IN PROGRESS`؛ بهینه‌سازی‌های اولیه پیاده‌سازی و تست خودکار شده‌اند، اما کاهش زمان آماده‌شدن تعریف فرم‌ها باید با سنجش تکراری/تشخیصی و سپس پذیرش عملیاتی تأیید شود.


#### Task 2 — کش نشست فرم‌ها و سنجش warm endpoint (2026-11-06)

- `js/modules/events.js`: تعریف فرم‌های متصل در حافظه همان نشست با TTL برابر `30000ms` نگهداری می‌شود؛ کلید بر اساس token نشست و EventTypeID است، حداکثر 50 ورودی نگهداری می‌شود و با ورود به مسیرهای `forms`, `event-types`, `information-types` یا رویداد `pms:auth-expired` پاک می‌شود. داده فرم در localStorage ذخیره نمی‌شود.
- `js/core/api.js`: مسیرهای `/event-types` و زیرمسیرهای آن به فهرست درخواست‌های مجاز برای diagnostics مدیریتی اضافه شد؛ این داده همچنان فقط با مجوز Admin از Backend برمی‌گردد.
- `tests/event-form-cache-policy.test.js` و `tests/event-form-performance-audit.test.js` سیاست cache و مسیر diagnostics را پوشش می‌دهند. Frontend checks، frontend agent suite و Cross-repository QA روی commit `9d517bddf8edc62b4e41cef87a615618ef0c26ab` موفق شدند.
- ابزار Browser Audit علاوه بر زمان اولین بارگذاری، یک درخواست دوم مستقیم به همان endpoint برای سنجش warm backend cache انجام می‌دهد؛ هیچ submit یا تغییری در داده انجام نمی‌دهد.
- Run `42278302128` / Artifact `13534865891` با وضعیت `authenticated-audit-complete` موفق شد: Modal `1922ms`؛ پروژه/Workflow `4747ms`؛ فرم‌های متصل `10806ms`؛ درخواست تکراری endpoint برابر `7634ms`؛ `52` درخواست شبکه؛ `0` درخواست ناموفق؛ `0` Console error و `0` Page error؛ `2` پروژه و `10` نوع رویداد؛ بدون ثبت رویداد.
- پاسخ diagnostics مدیریتی در این حساب تست خالی بود؛ بنابراین زمان داخلی Router/Google Sheets به تفکیک قابل مشاهده نشد. زمان‌های بالا، زمان مشاهده‌شده در مرورگر هستند.
- Backend cache با TTL شصت ثانیه در GitHub آماده است اما هنوز روی Staging deploy نشده؛ بنابراین درخواست دوم `7634ms` اثر نسخه جدید Backend را اندازه نمی‌گیرد. برای مقایسه واقعی، ابتدا Backend شاخه عملیاتی باید روی Staging منتشر و سپس همین audit تکرار شود.
- وضعیت Task 2: همچنان `IN PROGRESS`؛ بهینه‌سازی‌ها در GitHub و تست‌های خودکار موفق‌اند، اما کاهش زمان عملیاتی تا پس از Staging deployment و سنجش مجدد تأیید نشده است.


#### Task 2 — تکرار سنجش مرورگر و نتیجه warm probe محدودشده (2026-11-06)

- Browser Audit Run `42278648501` / Artifact `13534980965` روی commit Frontend `85d9dd54dd1aa52107e713f4a3024c1197bd3aea` با وضعیت `authenticated-audit-complete` موفق شد.
- نتایج: Modal `2919ms`؛ پروژه/Workflow `6892ms`؛ تعریف فرم‌های متصل `11326ms`؛ درخواست مستقیم warm به همان endpoint `5501ms`؛ timeout رخ نداد.
- سلامت آزمون: `49` درخواست شبکه، `0` خطای شبکه، `0` خطای Console/Page، بدون overflow موبایل؛ `2` پروژه، `10` نوع رویداد مجاز و `2` کنترل فرم متصل. هیچ فرم submit نشد.
- مقایسه با اجرای قبلی Run `42278302128` نشان می‌دهد زمان‌ها نوسان دارند؛ در هر دو اجرا diagnostics مدیریتی Backend خالی بود. این اختلاف به‌عنوان بهبود یا پسرفت قطعی تفسیر نمی‌شود.
- API مقصد، Staging احراز هویت‌شده است؛ اما deployment شاخه Backend PR #17 روی آن مستقلاً تأیید نشده. workflow موجود `.github/workflows/sync-apps-script.yml` فقط `main` و Secrets محیط Production را هدف می‌گیرد؛ از آن برای انتشار Staging یا feature branch استفاده نخواهد شد.
- وضعیت Task 2 همچنان `IN PROGRESS` است. برای اثبات اثر بهینه‌سازی Backend، باید مسیر مجزای امن Staging مشخص/تأیید شود، Backend branch روی همان محیط منتشر شود و audit مجدداً اجرا گردد. هیچ merge یا Production deployment انجام نشده است.


#### Task 2 — تکرار سنجش cold/warm روی HEAD فعلی (2026-11-06)

- Run `42278648501` / Artifact `13534980965` روی commit `85d9dd54dd1aa52107e713f4a3024c1197bd3aea` با وضعیت `authenticated-audit-complete` موفق شد.
- نتایج این اجرا: Modal `2919ms`؛ پروژه/Workflow `6892ms`؛ فرم‌های متصل `11326ms`؛ درخواست تکراری Backend `5501ms`؛ `49` درخواست شبکه؛ `0` درخواست ناموفق؛ `0` خطای Console/Page؛ بدون overflow موبایل و بدون submit.
- اختلاف زمان با اجرای قبلی نشان‌دهنده نوسان محیط Staging است؛ چون Backend cache هنوز deploy نشده، این نتایج اثر نسخه جدید را اثبات نمی‌کنند. مقدار warm `5501ms` نیز هنوز از حد مطلوب بیشتر است.
- تست‌های Browser Audit، Frontend checks، Frontend agent suite و Cross-repository QA روی HEAD فعلی موفق هستند. PR #37 باز و ادغام‌نشده باقی مانده است.


- آخرین تکرار Browser Audit روی HEAD مستندات `bb5b5ca01a32241362276a380f9adeec8dbdf736`: Run `42278976712` / Artifact `13534356871` موفق؛ Modal `2418ms`، پروژه/Workflow `3491ms`، فرم‌های متصل `11692ms` و درخواست warm endpoint برابر `5202ms`. تعداد درخواست `51`، خطای شبکه/Console/Page برابر صفر و بدون submit. این سنجش همچنان روی Backend Staging پیش از انتشار کش جدید انجام شده و اثر کش جدید را ثابت نمی‌کند.
