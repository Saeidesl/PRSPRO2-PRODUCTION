'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

test('shared Jalali calendar exposes hour and minute controls only for datetime-local fields', () => {
  const js = read('js/components/jalali-calendar.js');
  assert.match(js, /originalType==='datetime-local'[\s\S]*?data-time="hour"/);
  assert.match(js, /data-time="minute"/);
  assert.match(js, /Array\.from\(\{length:24\}/);
  assert.match(js, /Array\.from\(\{length:60\}/);
  assert.match(js, /data-cal="confirm"/);
  assert.match(js, /if\(originalType==='datetime-local'\)\{draftISO=selectedISO;render\(\);\}/);
});

test('datetime values preserve local ISO date and time and dispatch existing events', () => {
  const js = read('js/components/jalali-calendar.js');
  assert.match(js, /iso\+'T'\+timePart/);
  assert.match(js, /original\.dispatchEvent\(new Event\('input'/);
  assert.match(js, /original\.dispatchEvent\(new Event\('change'/);
  assert.match(js, /value\.slice\(11,16\)/);
  assert.match(js, /visible\.value=d\?self\.toFa\(self\.toJalali\(d\)\)\+\(originalType==='datetime-local'\?' '\+draftTime:''\):''/);
});

test('date-only fields keep date-only values and commit immediately on day selection', () => {
  const js = read('js/components/jalali-calendar.js');
  assert.match(js, /originalType==='datetime-local' \? iso\+'T'\+timePart : iso/);
  assert.match(js, /else setValue\(selectedISO\)/);
  assert.match(js, /originalType==='datetime-local'\?' '\+timePart:''/);
});

test('datetime min/max constraints compare the full local date and time', () => {
  const js = read('js/components/jalali-calendar.js');
  assert.match(js, /visible\.dataset\.minValue=minValue/);
  assert.match(js, /visible\.dataset\.maxValue=maxValue/);
  assert.match(js, /const value=iso\+'T'\+\(time \|\| '09:00'\)/);
  assert.match(js, /value>=minValue/);
  assert.match(js, /value<=maxValue/);
});

test('time picker styling uses shared light/dark theme tokens and cache-busting', () => {
  const css = read('css/jalali-calendar.css');
  assert.match(css, /\.pms-jalali-time-picker/);
  for (const token of ['--color-surface-alt','--color-border','--color-input-bg','--color-input-text','--color-primary']) {
    assert.ok(css.includes('var(' + token), 'missing theme token ' + token);
  }
  const index = read('index.html');
  assert.match(index, /jalali-calendar\.css\?v=20261106-datetime-picker-1/);
});
