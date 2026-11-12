'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const page = fs.readFileSync(path.join(root, 'pages', 'events.html'), 'utf8');
const events = fs.readFileSync(path.join(root, 'js', 'modules', 'events.js'), 'utf8');
const projects = fs.readFileSync(path.join(root, 'js', 'modules', 'projects.js'), 'utf8');

test('events page exposes a dedicated create-project action', () => {
  assert.match(page, /id="events-create-project-button"/);
  assert.match(page, /ایجاد پروژه جدید/);
});

test('create-project action is gated by the existing PROJECT_CREATE permission', () => {
  assert.match(events, /this\.canCreateProjects = isAdmin \|\| permissions\.indexOf\('PROJECT_CREATE'\) !== -1/);
  assert.match(events, /createProjectButton\.hidden = !this\.canCreateProjects/);
});

test('events page delegates project creation to the existing Projects form module', () => {
  assert.match(events, /target\.closest\('#events-create-project-button'\)/);
  assert.match(events, /projectModule\.openCreateForm\(\)/);
  assert.match(projects, /openCreateForm: async function \(editProject, options\)/);
  assert.match(projects, /PMS\.Api\.post\('\/projects', project\)/);
});

test('events page does not introduce a second project-create API path', () => {
  assert.doesNotMatch(events, /PMS\.Api\.post\(['"]\/projects['"]/);
});
