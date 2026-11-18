'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'js/modules/events.js'), 'utf8');

test('event attachment image preview uses fixed full-screen centered overlay', () => {
  assert.match(source, /event-image-preview-modal/);
  assert.match(source, /position:fixed;inset:0;z-index:300000/);
  assert.match(source, /align-items:center;justify-content:center/);
  assert.match(source, /background:rgba\(0,0,0,.82\)/);
});

test('event image preview scales to viewport and supports close controls and Escape', () => {
  assert.match(source, /max-height:calc\(100vh - 150px\)/);
  assert.match(source, /event-modal-close/);
  assert.match(source, /event\.key === 'Escape'/);
  assert.match(source, /URL\.revokeObjectURL\(url\)/);
});
