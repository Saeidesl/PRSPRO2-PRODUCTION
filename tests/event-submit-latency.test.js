'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const events = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'events.js'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('event submit enters visible busy state before asynchronous form response preparation', () => {
  const validation = events.indexOf('if (!this.validateEventFormControls(form)) return;');
  const busy = events.indexOf('this.setSubmitState(true);', validation);
  const collect = events.indexOf('await this.collectConfiguredFormResponses(projectId);', validation);
  assert.ok(validation >= 0);
  assert.ok(busy > validation);
  assert.ok(collect > busy);
  assert.equal(events.indexOf('this.setSubmitState(true);', collect), -1);
});

test('invalid configured form responses reopen the A4 sheet when minimized and restore the submit state', () => {
  const invalid = events.indexOf('if (formResponses === null) {');
  const reveal = events.indexOf('this.openConfiguredFormsA4();', invalid);
  const closeProgress = events.indexOf('this.closeSubmitProgressModal();', invalid);
  const restore = events.indexOf('this.setSubmitState(false);', invalid);
  assert.ok(invalid >= 0 && reveal > invalid && closeProgress > reveal && restore > closeProgress);
});
test('image preview and upload reuse the same FileReader promise', () => {
  assert.equal((events.match(/getConfiguredFormFileData\(file, input\)/g) || []).length >= 3, true);
  assert.match(events, /_pmsFileDataPromises/);
  assert.match(events, /const dataUrl = await this\.getConfiguredFormFileData\(file, input\)/);
});

test('multiple images upload in bounded batches and preserve selection order', () => {
  assert.match(events, /const concurrency = 3/);
  assert.match(events, /await Promise\.all\(batch\.map/);
  assert.match(events, /uploaded\[offset \+ batchIndex\] = value/);
  assert.match(events, /selectedIndex === 0 && useProfileForFirst \? 'PROFILE' : 'INFORMATION'/);
});

test('event submit asset cache-busting version is refreshed', () => {
  assert.match(index, /js\/modules\/events\.js\?v=20261112-events-create-project-focus-1/);
});
