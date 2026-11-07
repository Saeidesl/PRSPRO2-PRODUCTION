'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'events.js'), 'utf8');

test('project event choices wait for the selected project workflow context', () => {
  assert.match(source, /refreshEventTypeOptions: function \(\)/);
  assert.match(source, /workflowProgressProjectId !== projectId \|\| self\.workflowProgressLoading/);
  assert.match(source, /ابتدا پروژه را انتخاب کنید/);
  assert.match(source, /isDraftWithoutWorkflow/);
  assert.match(source, /if \(isDraftWithoutWorkflow\)/);
  assert.match(source, /GET|workflow-progress/);
  assert.match(source, /PMS\.Api\.get\('\/projects\/' \+ encodeURIComponent\(selectedProjectId\) \+ '\/workflow-progress'\)/);
});

test('workflow event choices follow the same eligibility and sequence rules as the backend', () => {
  assert.match(source, /requirementMode \|\| 'REQUIRED'\)\.toUpperCase\(\);[\s\S]*?mode === 'REFERENCE'/);
  assert.match(source, /mode === 'NOT_REQUIRED'/);
  assert.match(source, /rule\.satisfied/);
  assert.match(source, /sequenceMode === 'STRICT'/);
  assert.match(source, /sequenceMode === 'GROUPED'/);
  assert.match(source, /در مرحله فعلی تعریف نشده/);
  assert.match(source, /قابل ثبت در مرحله فعلی/);
});

test('draft restrictions, independent events, and stale workflow requests are handled', () => {
  assert.match(source, /غیرمجاز برای پیش‌نویس/);
  assert.match(source, /if \(!isProjectEvent\) return ''/);
  assert.match(source, /this\.loadWorkflowProgress\(''\)/);
  assert.match(source, /requestId !== this\.workflowProgressRequestId/);
  assert.match(source, /قواعد گردش‌کار دریافت نشد/);
  assert.match(source, /تلاش مجدد/);
});

test('event creation controls are hidden or blocked without EVENT_CREATE permission', () => {
  assert.match(source, /this\.canCreateEvents = isAdmin \|\| permissions\.indexOf\('EVENT_CREATE'\) !== -1/);
  assert.match(source, /if \(!this\.canCreateEvents \|\| this\.modalOpen \|\| this\.submitting\) return/);
  assert.match(source, /Events\.canCreateEvents\s*\?/);
});

test('disabled event types cannot enable event submission', () => {
  assert.match(source, /selectedOption && !selectedOption\.disabled/);
});

test('project context, historical form responses, and workflow use scoped TTL cache with in-flight deduplication', () => {
  assert.match(source, /EVENT_DEPENDENT_CACHE_TTL_MS = 60000/);
  assert.match(source, /EVENT_WORKFLOW_CACHE_TTL_MS = 15000/);
  assert.match(source, /eventDependentDataCache = new Map\(\)/);
  assert.match(source, /eventDependentDataRequests = new Map\(\)/);
  assert.match(source, /function getEventDependentData\(key, loader, ttlMs\)/);
  assert.match(source, /eventDependentDataRequests\.has\(key\)/);
  assert.match(source, /eventDependentCacheKey\('project-information', \[projectKey\]\)/);
  assert.match(source, /eventDependentCacheKey\('event-forms', \[projectKey, item\.ID\]\)/);
  assert.match(source, /eventDependentCacheKey\('workflow-progress', \[selectedProjectId\]\)/);
});

test('dependent data cache is invalidated on auth, relevant routes, event creation and workflow completion', () => {
  assert.match(source, /clearEventDependentDataCache\(\)/);
  assert.match(source, /pms:auth-expired/);
  assert.match(source, /'information-types', 'projects'/);
  assert.match(source, /clearEventDependentDataCache\(selectedProjectId\)/);
  assert.match(source, /const generation = eventDependentDataCacheGeneration/);
  assert.match(source, /generation === eventDependentDataCacheGeneration/);
});

test('amendment source forms are fetched in bounded parallel batches while preserving newest-first selection and version guards', () => {
  assert.match(source, /amendmentSourceRequestId: 0/);
  assert.match(source, /const requestId = \+\+this\.amendmentSourceRequestId/);
  assert.match(source, /const batchSize = 4/);
  assert.match(source, /Promise\.all\(batch\.map\(async event/);
  assert.match(source, /Keep newest-first precedence/);
  assert.match(source, /requestId !== this\.amendmentSourceRequestId/);
  assert.match(source, /FormVersion: this\.amendmentSourceVersion/);
  assert.match(source, /ExpectedUpdatedAt: this\.amendmentSourceUpdatedAt/);
});
