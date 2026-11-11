'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const read = (name) => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');
const projects = read('js/modules/projects.js');
const calendar = read('js/components/jalali-calendar.js');
const index = read('index.html');

test('project create and edit form uses the existing shared datetime-local picker', () => {
  assert.match(projects, /<input type="datetime-local" id="new-project-created-at" name="CreatedAt"/);
  assert.match(projects, /تاریخ و ساعت ایجاد پروژه/);
  assert.match(calendar, /input\[type="datetime-local"\]/);
  assert.match(calendar, /function renderTimePicker\(\)/);
});

test('project datetime is converted to ISO UTC using the same browser-local Date behavior as event submission', () => {
  assert.match(projects, /const createdAtDate = new Date\(createdAtLocal\)/);
  assert.match(projects, /createdAtISO = createdAtDate\.toISOString\(\)/);
  assert.match(projects, /CreatedAt: createdAtISO/);
});

test('editing a project restores both local date and local time from the stored timestamp', () => {
  const editStart = projects.indexOf('const rawCreatedAt = String(editProject.CreatedAt');
  const editEnd = projects.indexOf('if (descriptionInput)', editStart);
  const editBlock = projects.slice(editStart, editEnd);
  assert.ok(editStart >= 0 && editEnd > editStart);
  assert.match(editBlock, /getFullYear\(\)/);
  assert.match(editBlock, /getMonth\(\)/);
  assert.match(editBlock, /getDate\(\)/);
  assert.match(editBlock, /getHours\(\)/);
  assert.match(editBlock, /getMinutes\(\)/);
  assert.doesNotMatch(editBlock, /slice\(0,\s*10\)/);
});

test('shared picker is loaded before project module and retains its established implementation', () => {
  assert.ok(index.indexOf('js/components/jalali-calendar.js') < index.indexOf('js/modules/projects.js'));
  assert.match(calendar, /Array\.from\(\{length:24\}/);
  assert.match(calendar, /Array\.from\(\{length:60\}/);
  assert.match(calendar, /data-cal="confirm"/);
});
