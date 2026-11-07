'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const read = (file) => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

test('project detail exposes the registered-events shortcut beside event creation', () => {
  const page = read('pages/project-detail.html');
  const actions = page.slice(page.indexOf('class="page-header-actions"'), page.indexOf('</div>', page.indexOf('class="page-header-actions"')));
  assert.match(actions, /id="project-add-event-button"/);
  assert.match(actions, /id="project-view-events-button"/);
  assert.match(actions, /رویدادهای ثبت‌شده برای این پروژه/);
});

test('project detail opens the existing events route with the current project context', () => {
  const source = read('js/modules/project-detail.js');
  assert.match(source, /project-view-events-button/);
  assert.match(source, /router\.hasRouteAccess\('events'\)/);
  assert.match(source, /pendingProjectHistoryId = ProjectDetail\.projectId/);
  assert.match(source, /window\.location\.hash = '#events'/);
});

test('project history shortcut applies the project filter across all permitted events', () => {
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
  assert.match(index, /project-detail\.js\?v=20261107-project-event-history-shortcut-1/);
  assert.match(index, /events\.js\?v=20261107-project-event-history-shortcut-1/);
});
