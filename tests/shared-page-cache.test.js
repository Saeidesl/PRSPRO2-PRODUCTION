'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const read = (file) => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const api = read('js/core/api.js');
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
