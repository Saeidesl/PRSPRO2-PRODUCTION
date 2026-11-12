'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'events.js'), 'utf8');
const projects = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'projects.js'), 'utf8');

  assert.match(source, /PMS\.Api\.getCached\('\/projects', PROJECTS_CACHE_KEY \+ '_event_picker', \{/);
  assert.match(source, /PMS\\.Api\\.getCached\\('\\/projects', PROJECTS_CACHE_KEY \\+ '_event_picker', \\{/);
  assert.ok(source.includes("PMS.Api.getCached('/projects', PROJECTS_CACHE_KEY + '_event_picker'"));
  assert.match(source, /refreshCached: false/);
  assert.match(source, /projectOptionsToken/);
  assert.match(source, /Events\.projectOptionsToken = currentToken/);
});

test('project options are not reused across different authenticated sessions', () => {
  assert.match(source, /const currentToken = PMS\.Api\.getToken\(\) \|\| ''/);
  assert.match(source, /if \(this\.projectOptionsToken !== currentToken\)/);
  assert.match(source, /this\.projects = \[\];[\s\S]*?this\.projectsLoaded = false/);
});

test('event creation invalidates the in-memory project picker data', () => {
  assert.match(source, /this\.projectOptionsToken = ''[\s\S]*?PMS\.Api\.invalidateMany\(\[/);
});

test('fresh project-list data invalidates the in-memory event picker projection', () => {
  assert.match(projects, /PMS\.Events\.projectOptionsToken = ''/);
});
