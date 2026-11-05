'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

test('datetime picker switches from date selection to a separate time step', () => {
 const js=read('js/components/jalali-calendar.js');
 assert.match(js,/pickerMode='date'/);
 assert.match(js,/pickerMode='time';render\(\)/);
 assert.match(js,/function renderTimePicker\(\)/);
 assert.match(js,/data-cal="back-date"/);
 assert.match(js,/data-cal="confirm" class="pms-jalali-cal-confirm"/);
 assert.match(js,/انتخاب ساعت/);
});
test('date selection opens time step without saving early', () => {
 const js=read('js/components/jalali-calendar.js');
 assert.match(js,/if\(originalType==='datetime-local'\)\{draftISO=selectedISO;pickerMode='time';render\(\);\}/);
 assert.match(js,/if\(action==='confirm'\)[\s\S]*?setValue\(draftISO,'',draftTime\)/);
 assert.match(js,/if\(action==='back-date'\)\{pickerMode='date';render\(\);return;\}/);
});
test('final confirmation preserves local ISO and input/change events', () => {
 const js=read('js/components/jalali-calendar.js');
 assert.match(js,/iso\+'T'\+timePart/);
 assert.match(js,/new Event\('input'/);
 assert.match(js,/new Event\('change'/);
});
test('date-only fields still commit immediately without time step', () => {
 const js=read('js/components/jalali-calendar.js');
 assert.match(js,/else setValue\(selectedISO\)/);
 assert.match(js,/if\(originalType==='datetime-local' && pickerMode==='time'\)/);
});
test('mobile popup remains open when date click replaces its contents', () => {
 const js=read('js/components/jalali-calendar.js');
 assert.match(js,/const path=typeof e\.composedPath==='function'\?e\.composedPath\(\):\[\]/);
 assert.match(js,/const clickedInsidePopup=path\.indexOf\(pop\)!==-1 \|\| pop\.contains\(e\.target\)/);
 assert.match(js,/if\(!wrap\.contains\(e\.target\)&&!clickedInsidePopup\)close\(\)/);
});
test('time step retains themed styling and cache busting', () => {
 const css=read('css/jalali-calendar.css');
 assert.match(css,/\.pms-jalali-time-picker/);
 assert.match(css,/\.pms-jalali-time-head/);
 const index=read('index.html');
 assert.match(index,/jalali-calendar\.css\?v=20261106-date-then-time-1/);
});
