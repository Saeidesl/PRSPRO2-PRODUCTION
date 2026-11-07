'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'events.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'css', 'events.css'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('event type options render immediately while project workflow rules are still loading', () => {
  const start = source.indexOf('refreshEventTypeOptions: function ()');
  const end = source.indexOf('loadWorkflowProgress: async function (projectId)', start);
  assert.ok(start >= 0 && end > start, 'event type picker methods should exist');
  const picker = source.slice(start, end);
  assert.match(picker, /workflowRestriction\(type\)/);
  assert.match(picker, /در حال بررسی گردش‌کار/);
  assert.match(picker, /option\.disabled = !!reason/);
  assert.doesNotMatch(picker, /if \(workflowPending\)[\s\S]*?return;/);
  assert.match(picker, /this\.setEventTypeLoadingState\(false, projectId\)/);
});

test('late event-type cache/network results refresh an already-open picker without waiting for workflow response', () => {
  assert.match(source, /Events\.eventTypes = Events\.normalize\(data\);[\s\S]*?Events\.refreshEventTypeOptions\(\);/);
  assert.match(source, /key === 'types'[\s\S]*?Events\.refreshEventTypeOptions\(\);/);
  assert.match(source, /PMS\.Api\.getCached\('\/event-types', EVENT_TYPES_CACHE_KEY/);
});

test('workflow progress still controls availability and preserves retry and stale-request protection', () => {
  assert.match(source, /this\.workflowProgressLoading = !!selectedProjectId/);
  assert.match(source, /قواعد گردش‌کار دریافت نشد/);
  assert.match(source, /تلاش مجدد/);
  assert.match(source, /requestId !== this\.workflowProgressRequestId/);
  assert.match(source, /loadWorkflowProgress\(selectedProjectId\)/);
});

test('workflow loading UI remains available for workflow progress and responsive styles', () => {
  assert.match(source, /id="event-type-loading" class="event-type-loading" hidden/);
  assert.match(source, /id="event-workflow-progress-section"/);
  assert.match(styles, /var\(--color-surface-alt\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

test('event assets use the new cache-busting version', () => {
  assert.match(index, /events\.css\?v=20261107-event-type-picker-fast-1/);
  assert.match(index, /events\.js\?v=20261107-event-type-picker-fast-1/);
});
