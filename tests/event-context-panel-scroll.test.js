'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

test('event context panel scrolls independently within the desktop event form workspace', () => {
  const css = read('css/event-context.css');
  assert.match(css, /@media\s*\(min-width:\s*821px\)/);
  assert.match(css, /grid-template-rows:\s*auto\s+minmax\(0,\s*1fr\)/);
  assert.match(css, /\.event-form-workspace\s*>\s*form,\s*#event-create-modal\s+\.event-context-panel\s*\{[\s\S]*?min-height:\s*0;[\s\S]*?overflow-y:\s*auto;/);
  assert.match(css, /\.event-context-panel\s*\{[\s\S]*?position:\s*relative;[\s\S]*?align-self:\s*stretch;/);
});

test('event context drawer remains independently scrollable on mobile', () => {
  const css = read('css/event-context.css');
  assert.match(css, /@media\s*\(max-width:\s*820px\)/);
  assert.match(css, /\.event-context-panel\s*\{[\s\S]*?max-height:\s*100dvh;[\s\S]*?overflow-y:\s*auto;[\s\S]*?overscroll-behavior:\s*contain;/);
  assert.match(css, /(?:#event-create-modal\s+)?\.event-context-panel\.is-open\s*\{\s*display:\s*block;/);
});


test('shared Jalali calendar uses unified semantic theme tokens for all controls and states', () => {
  const css = read('css/jalali-calendar.css');
  for (const token of ['--color-surface', '--color-surface-alt', '--color-surface-hover', '--color-text', '--color-text-secondary', '--color-text-muted', '--color-border', '--color-primary', '--color-input-bg', '--color-input-text', '--color-danger', '--shadow-overlay']) {
    assert.ok(css.includes('var(' + token), 'missing theme token ' + token);
  }
  assert.match(css, /\.pms-jalali-cal-head button[\s\S]*?background:\s*var\(--color-surface-alt\)/);
  assert.match(css, /\.pms-jalali-cal-footer button:hover[\s\S]*?background:\s*var\(--color-surface-hover\)/);
  assert.match(css, /\.pms-jalali-cal-grid button\.is-selected[\s\S]*?background:\s*var\(--color-primary\)/);
  assert.match(css, /\.pms-jalali-cal-grid button:disabled/);
  assert.doesNotMatch(css, /var\(--(border-color|card-bg|text-color|surface|muted|accent)(?:,|\))/);
});
