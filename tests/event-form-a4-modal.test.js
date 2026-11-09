'use strict';

// Regression coverage for the connected-form A4 presentation and submission.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'events.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'css', 'events.css'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('connected event forms are presented in a full-screen A4 sheet without replacing the form controls', () => {
  assert.match(source, /prepareConfiguredFormsA4: function \\(section, container\\)/);
  assert.match(source, /paper\\.appendChild\\(container\\)/);
  assert.match(source, /section\\.replaceChildren\\(dialog\\)/);
  assert.match(source, /event-forms-a4-paper/);
  assert.match(source, /event-configured-forms-launcher/);
});

test('connected forms open automatically and can be reopened after minimizing the sheet', () => {
  assert.match(source, /if \\(definitions\\.length\\) this\\.openConfiguredFormsA4\\(\\)/);
  assert.match(source, /openConfiguredFormsA4: function \\(\\)/);
  assert.match(source, /closeConfiguredFormsA4: function \\(\\)/);
  assert.match(source, /event-configured-forms-open/);
  assert.match(source, /event-forms-a4-close/);
});

test('a completed connected form can be submitted while its A4 sheet is minimized', () => {
  const submitListener = source.slice(
    source.indexOf("document.getElementById('event-create-form')"),
    source.indexOf("modal.addEventListener('click'", source.indexOf("document.getElementById('event-create-form')"))
  );
  assert.doesNotMatch(submitListener, /a4Section\\.hidden/);
  assert.doesNotMatch(submitListener, /ابتدا برگه فرم اطلاعات تکمیلی را بازبینی کنید/);
  assert.match(source, /validateEventFormControls: function \\(form\\)/);
  assert.match(source, /this\\.collectConfiguredFormResponses\\(projectId\\)/);
});

test('invalid required controls reopen A4 only when needed and hidden conditional fields are ignored', () => {
  assert.match(source, /configuredContainer\\.contains\\(invalidControl\\)/);
  assert.match(source, /wrapper\\.dataset\\.visibilityHidden === 'true'/);
  assert.match(source, /if \\(formResponses === null\\)[\\s\\S]*?this\\.openConfiguredFormsA4\\(\\)/);
  assert.match(source, /configuredContainer\\.querySelector\\(':invalid'\\)/);
});

test('A4 modal supports keyboard dismissal, mobile scrolling, print sizing, and reduced motion', () => {
  assert.match(source, /Events\\.closeConfiguredFormsA4\\(\\)/);
  assert.match(styles, /#event-configured-forms-section\\.event-configured-forms-a4-overlay/);
  assert.match(styles, /width: min\\(210mm, calc\\(100vw - 72px\\)\\)/);
  assert.match(styles, /@media \\(max-width: 700px\\)/);
  assert.match(styles, /@media print/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

test('A4 form UI keeps the existing event submission and response collection methods', () => {
  assert.match(source, /collectConfiguredFormResponses: async function \\(projectId\\)/);
  assert.match(source, /PMS\\.Api\\.post\\(['"]\\/events['"]/);
});

test('event form assets use the submit-validation cache-busting version', () => {
  assert.match(index, /events\\.css\\?v=20261109-event-form-submit-validation-1/);
  assert.match(index, /js\\/modules\\/events\\.js\\?v=20261109-event-form-submit-validation-1/);
});
