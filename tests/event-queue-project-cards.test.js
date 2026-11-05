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
  const first = {
    ID: 'e1', ProjectID: 'p1',
    CreatedAt: '2026-11-05T10:00:00Z',
    OccurredAt: '2026-11-05T12:00:00Z'
  };
  const second = {
    ID: 'e2', ProjectID: 'p1',
    CreatedAt: '2026-11-05T10:05:00Z',
    OccurredAt: '2026-11-05T09:00:00Z'
  };
  const fallback = {
    ID: 'e3', ProjectID: 'p1',
    CreatedAt: 'invalid-date',
    OccurredAt: '2026-11-05T10:10:00Z'
  };
  const voidEvent = {
    ID: 'e4', ProjectID: 'p1', Status: 'VOID',
    CreatedAt: '2026-11-05T13:00:00Z'
  };
  const independent = {
    ID: 'e5', ProjectID: '',
    CreatedAt: '2026-11-05T14:00:00Z'
  };

  const latest = events.getLatestEventByProject([
    first, second, fallback, voidEvent, independent
  ]);

  assert.equal(latest.get('p1').event, fallback);
  assert.equal(latest.has(''), false);
  assert.equal(latest.get('p1').event.ID, 'e3');
});

test('event queue cards expose project profile image and latest-event details', () => {
  const source = read('js/modules/events.js');

  assert.match(source, /data-event-project-media=/);
  assert.match(source, /data-event-project-thumbnail/);
  assert.match(source, /آخرین رویداد/);
  assert.match(source, /Events\.creatorValue\(latestEvent\)/);
  assert.match(source, /Events\.formatDate\(latestEvent\.CreatedAt \|\| latestEvent\.OccurredAt\)/);
});

test('event queue reuses existing project image metadata and download flow with permission checks', () => {
  const source = read('js/modules/events.js');

  assert.match(source, /projectModule\.getProjectCardAttachments\(\)/);
  assert.match(source, /projectModule\.loadOneProjectCardImage\(projectId, attachment\)/);
  assert.match(source, /ATTACHMENT_VIEW/);
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /queueProjectImageRequestId/);
});


test('event operations center defaults to the in-progress project queue', () => {
  const html = read('pages/events.html');
  const events = read('js/modules/events.js');

  assert.match(html, /class="event-queue-tab is-active" id="event-tab-progress"/);
  assert.match(html, /id="event-panel-progress"[^>]*class="event-project-queue queue-progress is-active"[^>]*>/);
  assert.match(html, /id="event-panel-pending"[^>]*hidden/);
  assert.match(events, /this\.activateQueue\('progress'\)/);
});

test('project queue cards color the actual project status instead of the queue label', () => {
  const events = loadEventsModule();
  const source = read('js/modules/events.js');
  const css = read('css/events.css');

  assert.equal(events.getProjectStatusTone('در حال الگوسازی'), 'active');
  assert.equal(events.getProjectStatusTone('در انتظار الگوسازی'), 'waiting');
  assert.equal(events.getProjectStatusTone('تکمیل‌شده'), 'completed');
  assert.equal(events.getProjectStatusTone('متوقف'), 'paused');
  assert.match(source, /const statusTone = Events\.getProjectStatusTone\(status\)/);
  assert.doesNotMatch(source, /const statusTone = this\.getProjectStatusTone\(status\)/);
  assert.match(source, /event-queue-project-status-badge status-/);
  assert.doesNotMatch(source, /event-queue-project-state/);
  assert.match(css, /grid-template-columns:\s*minmax\(0, 1fr\) minmax\(0, 1fr\)/);
  assert.match(css, /aspect-ratio:\s*3 \/ 4/);
  assert.match(css, /min-height:\s*190px/);
  assert.match(css, /status-waiting/);
  assert.match(css, /status-active/);
  assert.match(css, /status-completed/);
});


test('event module asset version changes after queue image preview', () => {
  const html = read('index.html');

  assert.match(html, /js\\/modules\\/events\\.js\\?v=20261106-event-queue-image-preview-1/);
  assert.doesNotMatch(html, /js\/modules\/events\.js\?v=20261106-event-queue-card-1/);
});


test('event queue project image preview reuses the shared modal and guards unavailable images', () => {
  const source = read('js/modules/events.js');
  const css = read('css/events.css');

  assert.match(source, /queueThumbnail\.closest\('\[data-event-project-media\]'\)/);
  assert.match(source, /media\.dataset\.imageState === 'ready'/);
  assert.match(source, /PMS\.Modal\.open|modal\.open\(/);
  assert.match(source, /openQueueProjectImage: function/);
  assert.match(source, /adjustQueueProjectImage: function/);
  assert.match(source, /Math\.min\(4, current \+ 0\.25\)/);
  assert.match(source, /Math\.max\(0\.5, current - 0\.25\)/);
  assert.match(css, /event-queue-image-viewport/);
  assert.match(css, /max-height:min\(68vh,720px\)/);
});
