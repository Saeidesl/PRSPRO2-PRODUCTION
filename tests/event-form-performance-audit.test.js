'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const script = fs.readFileSync(path.join(__dirname, '..', 'scripts', 'pms-ui-performance-audit.cjs'), 'utf8');
const workflow = fs.readFileSync(path.join(__dirname, '..', '.github', 'workflows', 'pms-ui-performance-audit.yml'), 'utf8');
const apiScript = fs.readFileSync(path.join(__dirname, '..', 'js', 'core', 'api.js'), 'utf8');

test('performance audit supports a focused event-form scope', () => {
  assert.match(script, /\['procurement', 'events'\]\.includes\(requestedAuditScope\)/);
  assert.match(script, /auditScope === 'events' \? \['events'\]/);
  assert.match(workflow, /- events/);
});

test('event-form benchmark only selects existing options and never submits', () => {
  assert.match(script, /event-project-entry/);
  assert.match(script, /data-event-entry="project"/);
  assert.match(script, /event-recent-project-action/);
  assert.match(script, /route === 'events' && openerId === 'event-project-entry'/);
  assert.match(script, /event-form-project/);
  assert.match(script, /event-form-type/);
  assert.match(script, /formDefinitionsReadyMs/);
  assert.match(script, /warmFormDefinitionsRequestMs/);
  assert.match(script, /Promise\.race\(\[request, timeout\]\)/);
  assert.match(script, /12000/);
  assert.match(script, /window\.PMS\.Api\.get\('\/event-types\/'/);
  assert.match(script, /event-configured-forms/);
  assert.match(script, /No form values were entered and no event was submitted/);
  assert.match(script, /formSubmission: 'disabled'/);
  assert.match(script, /destructiveActions: 'never-clicked'/);
});

test('event-form diagnostics are restricted to safe endpoint summaries', () => {
  assert.match(script, /diagnosticEndpoints/);
  assert.match(script, /PMS_PERFORMANCE_DIAGNOSTICS/);
  assert.ok(apiScript.includes('event-types(?:\\/|$)'));
  assert.match(script, /safeRequestPath/);
  assert.match(script, /never the full query string/);
});
