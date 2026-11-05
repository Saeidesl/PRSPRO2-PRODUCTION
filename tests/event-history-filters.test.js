'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const read = (file) => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

test('event history defaults to the current creator and offers permitted-wide scope', () => {
  const html = read('pages/events.html');
  const source = read('js/modules/events.js');
  assert.match(html, /id="event-history-scope"/);
  assert.match(html, /value="mine" selected/);
  assert.match(html, /value="all">همه رویدادهای مجاز/);
  assert.match(source, /filters\.scope === 'mine'/);
  assert.match(source, /String\(event\.CreatedBy \|\| ''\) !== currentUserId/);
  assert.match(source, /currentUserId: function/);
});

test('event history filters use stable creator and department identifiers', () => {
  const source = read('js/modules/events.js');
  assert.match(source, /creatorIdValue: function/);
  assert.match(source, /departmentIdValue: function/);
  assert.match(source, /Events\.creatorIdValue\(event\) !== filters\.creator/);
  assert.match(source, /Events\.departmentIdValue\(event\) !== filters\.department/);
});

test('event history exposes all planned filters and a reset action', () => {
  const html = read('pages/events.html');
  const source = read('js/modules/events.js');
  [
    'event-project-filter', 'event-creator-filter', 'event-department-filter',
    'event-type-filter', 'event-status-filter', 'event-created-from',
    'event-created-to', 'event-occurred-from', 'event-occurred-to'
  ].forEach((id) => assert.ok(html.includes('id="' + id + '"'), 'missing ' + id));
  assert.match(html, /id="events-clear-filters"/);
  assert.match(html, /id="events-active-filter-count"/);
  assert.match(source, /clearHistoryFilters: function/);
  assert.match(source, /updateHistoryFilterSummary: function/);
});

test('event history date ranges compare calendar dates without timezone drift', () => {
  const source = read('js/modules/events.js');
  assert.ok(source.includes('/^\\d{4}-\\d{2}-\\d{2}$/'));
});
