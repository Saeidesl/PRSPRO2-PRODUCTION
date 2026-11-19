'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'js/modules/events.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('event image preview uses native dialog top-layer centering', () => {
  assert.match(source, /document\.createElement\('dialog'\)/);
  assert.match(source, /modal\.showModal\(\)/);
  assert.match(source, /position:fixed;margin:auto/);
  assert.match(source, /event-image-preview-modal/);
});

test('event preview closes safely and releases image URL', () => {
  assert.match(source, /modal\.close\(\)/);
  assert.match(source, /URL\.revokeObjectURL\(url\)/);
  assert.match(source, /event\.target === modal/);
  assert.match(source, /event-modal-close/);
});

test('event preview click is delegated once to avoid duplicate fetch/modal races', () => {
  assert.match(source, /event\.target\.closest\('\[data-event-image-attachment\]'\)/);
  assert.doesNotMatch(source, /content\.querySelectorAll\('\[data-event-image-attachment\]'\)\.forEach/);
});

test('native dialog fix is cache-busted in production entry point', () => {
  assert.match(indexHtml, /js\/modules\/events\.js\?v=20261119-event-submit-auto-close-5s-3/);
});
