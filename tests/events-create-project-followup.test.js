'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const events = fs.readFileSync(path.join(root, 'js', 'modules', 'events.js'), 'utf8');
const projects = fs.readFileSync(path.join(root, 'js', 'modules', 'projects.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css', 'events.css'), 'utf8');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

test('project follow-up runs only after create and reference-copy success', () => {
  assert.match(projects, /modal\._onCreated = options\.onCreated/);
  const created = projects.indexOf('const createdId = String(created.ID');
  const success = projects.indexOf('modal.remove();', created);
  const callback = projects.indexOf('await modal._onCreated(created)', success);
  const referenceSummary = projects.indexOf('const referenceSummary = created.ReferenceCopySummary', success);
  assert.ok(created >= 0 && success > created && callback > success && referenceSummary > callback);
  assert.match(projects, /catch \(callbackError\)[\s\S]*?console\.warn\('Project creation follow-up failed:'/);
  assert.match(projects, /canViewProjects && typeof modal\._onCreated !== 'function'/);
});

test('created project refreshes the shared picker cache and rerenders existing queues', () => {
  assert.match(events, /handleCreatedProject: async function \(project\)/);
  assert.match(events, /PMS\.Api\.invalidate\(cacheKey\)/);
  assert.match(events, /PMS\.Api\.getFresh\('\/projects', cacheKey, \{/);
  assert.match(events, /query: \{ view: 'event-picker' \}/);
  assert.match(events, /this\.renderFilters\(\);[\s\S]*?this\.applyFilters\(\)/);
});

test('created project activates its actual queue and focuses the existing register action', () => {
  assert.match(events, /this\.activateQueue\(queue\)/);
  assert.match(events, /card\.scrollIntoView\(/);
  assert.match(events, /card\.querySelector\('\.event-queue-register-button'\)/);
  assert.match(events, /focusTarget\.focus\(/);
  assert.match(events, /is-newly-created/);
  assert.match(events, /is-next-action/);
});

test('created-project highlight respects reduced-motion preferences', () => {
  assert.match(events, /prefers-reduced-motion: reduce/);
  const reducedMotionIndex = css.lastIndexOf('@media (prefers-reduced-motion: reduce)');
  assert.ok(reducedMotionIndex >= 0);
  const reducedMotionBlock = css.slice(reducedMotionIndex, reducedMotionIndex + 500);
  assert.match(reducedMotionBlock, /\.event-queue-project\.is-newly-created/);
  assert.match(reducedMotionBlock, /animation:\s*none/);
  assert.match(index, /events\.css\?v=20261112-created-project-focus-1/);
  assert.match(index, /events\.js\?v=20261112-events-create-project-focus-1/);
});

test('events flow keeps the existing project and event API paths', () => {
  assert.match(projects, /PMS\.Api\.post\('\/projects', project\)/);
  assert.doesNotMatch(events, /PMS\.Api\.post\(['"]\/projects['"]/);
  assert.match(events, /\.event-queue-register-button/);
});
