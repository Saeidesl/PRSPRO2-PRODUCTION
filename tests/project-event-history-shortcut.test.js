'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const read = (file) => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

test('project cards on the events page expose history beside project event registration', () => {
  const source = read('js/modules/events.js');
  assert.match(source, /event-queue-project-actions/);
  assert.match(source, /event-queue-register-button/);
  assert.match(source, /event-queue-history-button/);
  assert.match(source, /رویدادهای ثبت‌شده برای این پروژه/);
  assert.match(source, /data-project-id=.*Events\.escape\(id\)/);
});

test('history action filters the selected project in the existing events page', () => {
  const source = read('js/modules/events.js');
  assert.match(source, /target\.closest\('\.event-queue-history-button'\)/);
  assert.match(source, /Events\.applyProjectHistoryFilter\(projectId\)/);
  assert.match(source, /canViewEventHistory = isAdmin \|\| permissions\.indexOf\('EVENT_VIEW'\) !== -1/);
});

test('project detail retains event registration but no longer hosts the history shortcut', () => {
  const page = read('pages/project-detail.html');
  const source = read('js/modules/project-detail.js');
  assert.match(page, /id="project-add-event-button"/);
  assert.doesNotMatch(page, /project-view-events-button|رویدادهای ثبت‌شده برای این پروژه/);
  assert.doesNotMatch(source, /project-view-events-button|pendingProjectHistoryId/);
});

test('project history action applies the selected project across all permitted events', () => {
  const source = read('js/modules/events.js');
  const start = source.indexOf('applyProjectHistoryFilter: function');
  const end = source.indexOf('applyFilters: function', start);
  const method = source.slice(start, end);
  assert.ok(start >= 0 && end > start, 'project history filter method must exist');
  assert.match(method, /scope\.value = 'all'/);
  assert.match(method, /projectFilter\.value = id/);
  assert.match(method, /events-filter-content/);
  assert.match(method, /this\.applyFilters\(\)/);
  assert.match(source, /project: get\('event-project-filter'\)/);
});

test('clearing history filters removes the selected project filter', () => {
  const source = read('js/modules/events.js');
  const start = source.indexOf('clearHistoryFilters: function');
  const end = source.indexOf('activateQueue: function', start);
  const method = source.slice(start, end);
  assert.match(method, /'event-project-filter'/);
  assert.match(method, /element\.value = id === 'event-history-scope' \? 'mine' : ''/);
});

test('project and events modules use refreshed production assets', () => {
  const index = read('index.html');
  assert.match(index, /project-detail\.js\?v=20261107-project-event-history-shortcut-placement-1/);
  assert.match(index, /events\.js\?v=20261112-page-state-events-1/);
});

test('events route grants access to users who can view or create events', () => {
  const router = read('js/core/router.js');
  assert.match(router, /events:\s*\['EVENT_VIEW',\s*'EVENT_CREATE'\]/);
});
