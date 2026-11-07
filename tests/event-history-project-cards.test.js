'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const read = (file) => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

function getEventRender(source) {
  const start = source.indexOf('render: function (events)');
  const end = source.indexOf('statusClass: function', start);
  return start >= 0 && end > start ? source.slice(start, end) : '';
}

test('event history renders one responsive project-style card layout', () => {
  const render = getEventRender(read('js/modules/events.js'));
  assert.ok(render, 'event history render method must exist');
  assert.match(render, /event-history-card-grid/);
  assert.match(render, /event-list-card/);
  assert.doesNotMatch(render, /events-desktop-view|events-mobile-view|<table class="data-table"/);
});

test('event cards preserve event details, status, dates, creator and department', () => {
  const render = getEventRender(read('js/modules/events.js'));
  [
    'ProjectCode', 'ProjectTitle', 'EventTypeName', 'Description',
    'OccurredAt', 'CreatedAt', 'creatorValue', 'departmentValue',
    'statusText', 'data-event-id'
  ].forEach((value) => assert.ok(render.includes(value), 'missing event card field/behavior: ' + value));
  assert.match(render, /event-details-button/);
});

test('event card styling follows the project list responsive grid and theme tokens', () => {
  const css = read('css/events.css');
  const index = read('index.html');
  assert.match(css, /\.event-history-card-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /@media\s*\(max-width:\s*620px\)[\s\S]*?\.event-history-card-grid\s*\{\s*grid-template-columns:\s*minmax\(0,1fr\)/);
  assert.match(css, /var\(--color-surface\)/);
  assert.match(css, /var\(--color-border\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(index, /events\.css\?v=20261107-event-submit-progress-1/);
  assert.match(index, /modules\/events\.js\?v=20261107-project-event-history-shortcut-1/);
});
