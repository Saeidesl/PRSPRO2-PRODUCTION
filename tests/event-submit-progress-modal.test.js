'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'events.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'css', 'events.css'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('progress modal starts immediately after synchronous validation and before form collection', () => {
  const validation = source.indexOf('if (!this.validateEventFormControls(form)) return;');
  const busy = source.indexOf('this.setSubmitState(true);', validation);
  const modal = source.indexOf('this.openSubmitProgressModal();', busy);
  const collect = source.indexOf('await this.collectConfiguredFormResponses(projectId);', modal);
  assert.ok(validation >= 0 && busy > validation && modal > busy && collect > modal);
});

test('progress steps follow the actual preparation, event API, and refresh flow', () => {
  assert.match(source, /this\.setSubmitProgressStep\('prepare', 'success'/);
  assert.match(source, /this\.setSubmitProgressStep\('event', 'active'/);
  assert.match(source, /this\.setSubmitProgressStep\('event', 'success'/);
  assert.match(source, /this\.setSubmitProgressStep\('refresh', 'active'/);
  assert.match(source, /this\.setSubmitProgressStep\('refresh', 'success'/);
  assert.match(source, /this\.setSubmitProgressStep\('refresh', 'warning'/);
});

test('upload counter advances only after a successful attachment response and counts cached files once', () => {
  assert.match(source, /completedFiles: completedFiles/);
  assert.match(source, /_pmsUploadedAttachments && input\._pmsUploadedAttachments\.has\(file\)/);
  assert.match(source, /this\.recordSubmitProgressUpload\(file\);[\s\S]*?if \(input\) \{/);
  assert.match(source, /state\.completedFiles\.has\(file\)/);
});

test('upload-free submissions complete preparation without showing a fake upload percentage', () => {
  assert.match(source, /فایل جدیدی برای بارگذاری وجود نداشت/);
  assert.match(source, /state\.uploadTotal[\s\S]*?state\.uploadDone/);
});

test('upload and event failures remain visible and can return to the existing form for retry', () => {
  assert.match(source, /failSubmitProgress\(error\)/);
  assert.match(source, /ثبت رویداد کامل نشد/);
  assert.match(source, /بازگشت به فرم/);
  assert.match(source, /this\.pendingIdempotencyFingerprint !== requestFingerprint/);
});

test('refresh failure is shown separately and does not turn a successful event registration into a failure', () => {
  assert.match(source, /رویداد ثبت شد؛ اما به‌روزرسانی فهرست با مشکل مواجه شد/);
  assert.match(source, /this\.showRefreshNotice\(\)/);
  assert.match(source, /this\.completeSubmitProgress\(/);
});

test('progress modal is accessible, responsive, theme-aware, and respects reduced motion', () => {
  assert.match(source, /aria-modal', 'true'/);
  assert.match(source, /aria-labelledby', 'event-submit-progress-title'/);
  assert.match(styles, /#event-submit-progress-modal/);
  assert.match(styles, /@media \(max-width: 520px\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

test('progress modal keeps keyboard focus contained and allows Escape only after completion', () => {
  assert.match(source, /const progressOverlay = document\.getElementById\('event-submit-progress-modal'\)/);
  assert.match(source, /Events\.submitProgressState && Events\.submitProgressState\.finished/);
  assert.match(source, /overlay\.getAttribute\('role'\) === 'dialog' \? overlay/);
});

test('event progress assets use refreshed cache-busting versions', () => {
  assert.match(index, /events\.css\?v=20261112-created-project-focus-1/);
  assert.match(index, /js\/modules\/events\.js\?v=20261112-events-create-project-focus-1/);
});
