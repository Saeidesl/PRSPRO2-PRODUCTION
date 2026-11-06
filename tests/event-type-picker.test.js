'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'events.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'css', 'events.css'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('event type field uses a custom picker while retaining the EventTypeID select as the source of truth', () => {
  assert.match(source, /id="event-form-type" name="EventTypeID" class="event-type-native-select"/);
  assert.match(source, /id="event-type-picker-trigger"/);
  assert.match(source, /id="event-type-picker-panel" hidden/);
  assert.match(source, /id="event-type-picker-search"/);
  assert.match(source, /id="event-type-picker-list" role="listbox"/);
  assert.match(source, /typeSelect\.value = option\.dataset\.eventTypeId/);
  assert.match(source, /typeSelect\.dispatchEvent\(new Event\('change', \{ bubbles: true \}\)\)/);
  assert.match(source, /renderEventTypePicker: function \(\)/);
  assert.match(source, /setEventTypePickerOpen: function \(open\)/);
});

test('event type picker preserves workflow grouping, restricted reasons, repeat counts, and selected state', () => {
  assert.match(source, /option\.dataset\.eventName = String\(type\.Name/);
  assert.match(source, /option\.dataset\.restrictionReason = reason/);
  assert.match(source, /option\.dataset\.eventCount = repeatRule/);
  assert.match(source, /group\.label\.indexOf\('سایر'\)/);
  assert.match(source, /item\.disabled = !!option\.disabled \|\| !!select\.disabled/);
  assert.match(source, /option\.value === select\.value \? ' is-selected'/);
  assert.match(source, /this\.renderEventTypePicker\(\);[\s\S]*?this\.updateSubmitAvailability\(\)/);
});

test('event type picker keeps workflow loading and retry behavior without exposing the native picker', () => {
  assert.match(source, /typeSelect\.disabled = true/);
  assert.match(source, /pickerTrigger\.disabled = true/);
  assert.match(source, /this\.setEventTypePickerOpen\(false\)/);
  assert.match(source, /PMS\.Loading\.show\(loading/);
  assert.match(source, /PMS\.Loading\.hide\(loading\)/);
  assert.match(source, /قواعد گردش‌کار دریافت نشد/);
  assert.match(source, /تلاش مجدد/);
});

test('event type picker supports search, keyboard dismissal, RTL, responsive layout, and reduced motion', () => {
  assert.match(source, /toLocaleLowerCase\('fa'\)/);
  assert.match(source, /event\.key === 'Escape'/);
  assert.match(source, /aria-expanded/);
  assert.match(styles, /\.event-type-picker-panel/);
  assert.match(styles, /@media \(max-width: 600px\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(index, /events\.css\?v=20261106-event-type-picker-cards-1/);
  assert.match(index, /events\.js\?v=20261106-event-type-picker-cards-1/);
});
