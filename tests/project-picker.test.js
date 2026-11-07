'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'events.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'css', 'events.css'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('project picker displays project title and code while retaining ProjectID select', () => {
  assert.match(source, /id="event-form-project" name="ProjectID"/);
  assert.match(source, /project\.Title \|\| project\.Name/);
  assert.match(source, /selected.ProjectCode \|\| this.idOf\(selected\)/);
  assert.match(source, /id="event-project-picker-trigger"/);
  assert.match(source, /id="event-project-picker-search"/);
  assert.match(source, /event-project-picker-code/);
  assert.match(source, /event-project-picker-name/);
  assert.match(source, /event-project-picker-option-code/);
  assert.match(source, /event-project-picker-option-name/);
  assert.match(source, /copy\.append\(projectCode, projectName\)/);
  assert.match(styles, /event-project-picker-option-code[\s\S]*?font-size: 21px/);
  assert.match(styles, /event-project-picker-option-name[\s\S]*?font-size: 12px/);

  assert.match(source, /projectSelect\.dispatchEvent\(new Event\('change', \{ bubbles: true \}\)\)/);
});

test('project picker preserves preselected project and existing project change workflow', () => {
  assert.match(source, /this\.preselectedProjectId/);
  assert.match(source, /this\.renderProjectPicker\(\);[\s\S]*?this\.refreshEventTypeOptions\(\)/);
  assert.match(source, /this\.loadWorkflowProgress\(projectSelect\.value\)/);
  assert.match(source, /this\.loadEventContext\(projectSelect\.value, typeSelect\.value\)/);
});

test('project picker supports filtering, empty state, accessibility, and responsive themed styling', () => {
  assert.match(source, /toLocaleLowerCase\('fa'\)/);
  assert.match(source, /پروژه‌ای با این مشخصات پیدا نشد/);
  assert.match(source, /aria-expanded/);
  assert.match(styles, /\.event-project-picker-panel/);
  assert.match(styles, /@media \(max-width: 640px\)/);
  assert.match(index, /events\.css\?v=20261106-event-history-cards-1/);
  assert.match(index, /events\.js\?v=20261107-single-full-event-form-1/);
});
