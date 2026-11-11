'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const read = (name) => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');
const projects = read('js/modules/projects.js');
const calendar = read('js/components/jalali-calendar.js');
const index = read('index.html');

test('new project creation uses the existing shared datetime-local picker while edit remains date-only', () => {
  assert.match(projects, /type="\$\{isEditMode \? 'date' : 'datetime-local'\}"/);
  assert.match(projects, /تاریخ و ساعت ایجاد پروژه/);
  assert.match(calendar, /input\[type="datetime-local"\]/);
  assert.match(calendar, /function renderTimePicker\(\)/);
  assert.match(projects, /createdAtInput\.value = String\(editProject\.CreatedAt \|\| editProject\.createdAt \|\| ''\)\.slice\(0, 10\)/);
});

test('new project datetime is converted to ISO UTC using the same browser-local Date behavior as event submission', () => {
  assert.match(projects, /createdAtInput\.type === 'datetime-local'/);
  assert.match(projects, /const createdAtDate = new Date\(createdAtLocal\)/);
  assert.match(projects, /createdAtValue = createdAtDate\.toISOString\(\)/);
  assert.match(index, /projects\.js\?v=20261111-project-created-at-datetime-2/);
  assert.match(projects, /CreatedAt: createdAtValue/);
});

test('shared picker is loaded before project module and retains its established implementation', () => {
  assert.ok(index.indexOf('js/components/jalali-calendar.js') < index.indexOf('js/modules/projects.js'));
  assert.match(calendar, /Array\.from\(\{length:24\}/);
  assert.match(calendar, /Array\.from\(\{length:60\}/);
  assert.match(calendar, /data-cal="confirm"/);
});
