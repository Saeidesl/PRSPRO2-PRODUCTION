'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'events.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'css', 'events.css'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const loading = fs.readFileSync(path.join(__dirname, '..', 'js', 'components', 'loading.js'), 'utf8');

test('project event type picker is replaced by the existing loading animation while workflow data is pending', () => {
  assert.match(source, /id="event-type-loading" class="event-type-loading" hidden/);
  assert.match(source, /workflowPending = !!projectId && \([\s\S]*?workflowProgressProjectId !== projectId \|\| this\.workflowProgressLoading/);
  assert.match(source, /this\.setEventTypeLoadingState\(true, projectId\)/);
  assert.match(source, /typeSelect\.disabled = true/);
  assert.match(source, /typeSelect\.hidden = true/);
  assert.match(source, /typeSelect\.dataset\.pendingValue = previousValue/);
  assert.match(source, /PMS\.Loading\.show\(loading, 'در حال آماده‌سازی فهرست رویدادها\.\.\.'/);
  assert.match(loading, /class="loading-spinner"/);
  assert.match(styles, /\.event-type-loading \.loading-spinner/);
});

test('event type options return after workflow data is ready and the loading state is removed', () => {
  assert.match(source, /this\.setEventTypeLoadingState\(false, projectId\)/);
  assert.match(source, /PMS\.Loading\.hide\(loading\)/);
  assert.match(source, /this\.refreshEventTypeOptions\(\);[\s\S]*?container\.replaceChildren\(\)/);
  assert.match(source, /if \(isDraftWithoutWorkflow\)[\s\S]*?this\.workflowProgressLoading = false/);
});

test('workflow failure retains retry handling and stale requests cannot replace current state', () => {
  assert.match(source, /قواعد گردش‌کار دریافت نشد/);
  assert.match(source, /تلاش مجدد/);
  assert.match(source, /requestId !== this\.workflowProgressRequestId/);
  assert.match(source, /loadWorkflowProgress\(selectedProjectId\)/);
});

test('event type loading state is responsive, theme-aware, and uses the refreshed frontend assets', () => {
  assert.match(styles, /var\(--color-surface-alt\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(index, /events\.css\?v=20261109-event-form-a4-confirm-1/);
  assert.match(index, /events\.js\?v=20261112-page-state-events-1/);
});
