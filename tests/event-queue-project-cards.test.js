'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const read = (file) => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

function loadEventsModule() {
  const window = {
    PMS: {
      Cache: { keys: { EVENTS: 'events', PROJECTS: 'projects', EVENT_TYPES: 'event-types' } },
      Modules: {}
    }
  };
  const context = { window, console, Date, Map, Number, String, Object, Array, Set, Promise };
  vm.runInNewContext(read('js/modules/events.js'), context, { filename: 'js/modules/events.js' });
  return window.PMS.Modules.Events;
}

test('latest project event is selected by registration date with occurrence-date fallback', () => {
  const events = loadEventsModule();
  const first = { ID: 'e1', ProjectID: 'p1', CreatedAt: '2026-11-05T10:00:00Z', OccurredAt: '2026-11-05T12:00:00Z' };
  const second = { ID: 'e2', ProjectID: 'p1', CreatedAt: '2026-11-05T10:05:00Z', OccurredAt: '2026-11-05T09:00:00Z' };
  const fallback = { ID: 'e3', ProjectID: 'p1', CreatedAt: 'invalid-date', OccurredAt: '2026-11-05T10:10:00Z' };
  const voidEvent = { ID: 'e4', ProjectID: 'p1', Status: 'VOID', CreatedAt: '2026-11-05T13:00:00Z' };
  const latest = events.getLatestEventByProject([first, second, fallback, voidEvent, { ID: 'e5', ProjectID: '' }]);
  assert.equal(latest.get('p1').event.ID, 'e3');
  assert.equal(latest.has(''), false);
});

test('unified event project list replaces the three status tabs and panels', () => {
  const html = read('pages/events.html');
  const source = read('js/modules/events.js');
  assert.match(html, /id="event-queue-all" class="event-queue-list event-queue-list-unified"/);
  assert.doesNotMatch(html, /event-queue-tabs|event-panel-pending|event-panel-progress|event-panel-completed/);
  assert.match(source, /const container = document\.getElementById\('event-queue-all'\)/);
  assert.match(source, /const projects = this\.projects\.filter/);
  assert.doesNotMatch(source, /this\.activateQueue\('progress'\)/);
});

test('unified project cards keep profile images and latest event details', () => {
  const source = read('js/modules/events.js');
  assert.match(source, /data-event-project-media=/);
  assert.match(source, /data-event-project-thumbnail/);
  assert.match(source, /آخرین رویداد/);
  assert.match(source, /Events\.creatorValue\(latestEvent\)/);
  assert.match(source, /Events\.formatDate\(latestEvent\.CreatedAt \|\| latestEvent\.OccurredAt\)/);
  assert.match(source, /projectModule\.getProjectCardAttachments\(\)/);
  assert.match(source, /projectModule\.loadOneProjectCardImage\(projectId, attachment\)/);
  assert.match(source, /ATTACHMENT_VIEW/);
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /event-queue-all/);
});

test('project card gives visual priority to project code and adds the non-functional view button', () => {
  const source = read('js/modules/events.js');
  assert.match(source, /event-queue-project-code-label/);
  assert.match(source, /event-queue-project-code/);
  assert.match(source, /event-queue-project-title/);
  assert.match(source, /event-queue-view-button" disabled/);
  assert.match(source, /رویدادهای ثبت‌شده/);
  assert.match(source, /ثبت رویداد/);
  assert.doesNotMatch(source, /target\.closest\('\.event-queue-view-button'\)/);
});

test('project status is represented by one narrow edge and a status badge', () => {
  const source = read('js/modules/events.js');
  const css = read('css/events.css');
  assert.match(source, /queueLabel = queueKey === 'completed'/);
  assert.match(source, /title="وضعیت پروژه">' \+ Events\.escape\(queueLabel\)/);
  assert.doesNotMatch(source, /Events\.escape\(status\) \+ '<\\/span>/);
  assert.match(source, /event-queue-project-status-badge status-/);
  assert.match(css, /border-right:4px solid var\(--project-status-color/);
  assert.match(css, /queue-pending\{--project-status-color:#D99028\}/);
  assert.match(css, /queue-progress\{--project-status-color:#3989D6\}/);
  assert.match(css, /queue-completed\{--project-status-color:#269B70\}/);
  assert.match(css, /grid-template-columns:minmax\(0,1fr\) minmax\(0,1fr\)/);
  assert.match(css, /direction:ltr/);
  assert.match(css, /direction:rtl/);
});

test('completed projects keep the existing change-request action and other projects keep event registration', () => {
  const source = read('js/modules/events.js');
  assert.match(source, /queueKey === 'completed'[\s\S]*?event-queue-change-request-button/);
  assert.match(source, /event-queue-register-button[\s\S]*?Events\.openForm\(\)/);
  assert.match(source, /event-queue-history-button[\s\S]*?Events\.applyProjectHistoryFilter\(projectId\)/);
});

test('newly created project highlighting works without switching a removed queue tab', () => {
  const source = read('js/modules/events.js');
  assert.match(source, /data-event-project-card/);
  assert.match(source, /card\.classList\.add\('is-newly-created'\)/);
  assert.doesNotMatch(source, /this\.activateQueue\(queue\)/);
});

test('event module asset versions are refreshed for the unified card UI', () => {
  const html = read('index.html');
  assert.match(html, /css\/events\.css\?v=20261113-three-project-statuses-1/);
  assert.match(html, /js\/modules\/events\.js\?v=20261113-three-project-statuses-1/);
});
