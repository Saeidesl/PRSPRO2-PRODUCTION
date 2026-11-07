'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const events = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'events.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'css', 'events.css'), 'utf8');

test('event registration exposes one complete form mode only', () => {
  assert.doesNotMatch(events, /formMode|updateFormMode|data-form-mode|quickHidden|ثبت سریع/);
  assert.doesNotMatch(styles, /\.event-form-mode/);
  assert.match(events, /فرم‌های اطلاعات تکمیلی/);
  assert.match(events, /wrapper\.hidden = !visible/);
});

test('optional configured fields remain visible unless their visibility rule hides them', () => {
  assert.match(events, /wrapper\.dataset\.visibilityRule = JSON\.stringify\(visibilityRule \|\| \{\}\)/);
  assert.match(events, /wrapper\.hidden = !visible/);
  assert.doesNotMatch(events, /dataset\.quickHidden/);
});
