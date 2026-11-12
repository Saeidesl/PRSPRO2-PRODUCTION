'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const read = (file) => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const api = read('js/core/api.js');
const router = read('js/core/router.js');
const projects = read('js/modules/projects.js');
const events = read('js/modules/events.js');
const attachments = read('js/modules/attachments.js');

test('cache-first getCached returns valid cached data without starting a GET request', () => {
  assert.match(api, /options\.refreshCached === false/);
  assert.match(api, /const freshPromise = cached !== null && options\.refreshCached === false\s*\? null\s*:\s*this\.get\(path, options\)/);
  assert.match(api, /data: cached,\s*cached: true,\s*refreshing: false/);
});

test('projects page uses bounded cache-first reads for projects and lookups', () => {
  assert.match(projects, /getCached\(\s*'\/projects',\s*CACHE_KEY,\s*\{\s*cacheTtl: 30000,\s*refreshCached: false/);
  assert.match(projects, /cacheTtl: 60000,\s*refreshCached: false/);
});

test('events page caches its history, event types and lightweight project picker', () => {
  assert.match(events, /getCached\('\/events', CACHE_KEY, \{\s*cacheTtl: 15000,\s*refreshCached: false/);
  assert.match(events, /getCached\('\/event-types', EVENT_TYPES_CACHE_KEY, \{\s*cacheTtl: 60000,\s*refreshCached: false/);
  assert.ok(events.includes("getCached('/projects', PROJECTS_CACHE_KEY + '_event_picker'"));
  assert.match(events, /query: \{ view: 'event-picker' \}[\s\S]*?refreshCached: false/);
  assert.match(events, /PROJECTS_CACHE_KEY \+ '_event_picker'/);
});

test('attachments page reuses its cached list and only fetches after expiry or invalidation', () => {
  assert.match(attachments, /Api\.getCached\([\s\S]*?'\/attachments',[\s\S]*?cacheTtl: 60000,[\s\S]*?refreshCached: false/);
});

test('navigation restores safe filters, tabs and scroll without persisting form drafts', () => {
  assert.match(router, /getPageStateControls: function/);
  assert.match(router, /capturePageState: function/);
  assert.match(router, /restorePageState: function/);
  assert.match(router, /pageStates = Object\.create\(null\)/);
  assert.match(router, /scrollY: Number\(window\.scrollY \|\| 0\)/);
  assert.match(router, /activeQueue/);
  assert.doesNotMatch(router, /localStorage\.setItem\([^\n]*pageStates/);
});

test('dynamic event filters retain their previous selection after options load', () => {
  assert.match(events, /getPageStateValue\(select\.id\)/);
  assert.match(events, /const previous = select\.value \|\| remembered/);
});

test('project create, edit and settings mutations invalidate shared project caches before reload', () => {
  assert.ok(projects.includes('invalidateProjectDataCaches: function (projectId)'));
  assert.ok(projects.includes("CACHE_KEY + '_event_picker'"));
  assert.ok(projects.includes('this.invalidateProjectDataCaches(projectId)'));
  assert.ok(projects.includes('this.invalidateProjectDataCaches(created.ID || created.Id || created.id)'));
  assert.ok(projects.includes("cache.remove(window.PMS.Cache.keys.ATTACHMENTS || 'attachments')"));
});

test('project attachment uploads invalidate project-card metadata as well as the global attachment list', () => {
  assert.ok(attachments.includes('Cache.remove(MODULE.cacheKey)'));
  assert.ok(attachments.includes("kind === 'PROJECT'"));
  assert.ok(attachments.includes('invalidateProjectCardAttachmentMetadata(entityId)'));
});
