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
  assert.ok(source.includes('prepareConfiguredFormsA4: function (section, container)'));
  assert.ok(source.includes('paper.appendChild(container)'));
  assert.ok(source.includes('section.replaceChildren(dialog)'));
  assert.ok(source.includes('event-forms-a4-paper'));
  assert.ok(source.includes('event-configured-forms-launcher'));
});

test('connected forms open automatically and can be reopened after minimizing the sheet', () => {
  assert.ok(source.includes('if (definitions.length) this.openConfiguredFormsA4()'));
  assert.ok(source.includes('openConfiguredFormsA4: function ()'));
  assert.ok(source.includes('closeConfiguredFormsA4: function ()'));
  const closeStart = source.indexOf('closeConfiguredFormsA4: function ()');
  const closeEnd = source.indexOf('parseVisibilityRule: function', closeStart);
  const closeHandler = source.slice(closeStart, closeEnd);
  assert.ok(closeHandler.includes('section.hidden = true'));
  assert.ok(closeHandler.includes('launcher.hidden = false'));
  assert.equal(closeHandler.includes('replaceChildren'), false);
  assert.equal(closeHandler.includes('innerHTML ='), false);
  assert.ok(source.includes('event-configured-forms-open'));
  assert.ok(source.includes('event-forms-a4-close'));
});

test('a completed connected form can be submitted while its A4 sheet is minimized', () => {
  const submitStart = source.indexOf("document.getElementById('event-create-form')");
  const submitEnd = source.indexOf("modal.addEventListener('click'", submitStart);
  const submitListener = source.slice(submitStart, submitEnd);
  assert.equal(submitStart >= 0 && submitEnd > submitStart, true);
  assert.equal(submitListener.includes('a4Section.hidden'), false);
  assert.equal(submitListener.includes('ابتدا برگه فرم اطلاعات تکمیلی را بازبینی کنید'), false);
  assert.ok(source.includes('validateEventFormControls: function (form)'));
  assert.ok(source.includes('this.collectConfiguredFormResponses(projectId)'));
});

test('A4 confirmation button closes the sheet without submitting the event', () => {
  const prepareStart = source.indexOf('prepareConfiguredFormsA4: function (section, container)');
  const prepareEnd = source.indexOf('openConfiguredFormsA4: function ()', prepareStart);
  const prepare = source.slice(prepareStart, prepareEnd);
  assert.ok(prepare.includes("confirm.type = 'button'"));
  assert.ok(prepare.includes("confirm.id = 'event-forms-a4-confirm'"));
  assert.ok(prepare.includes("confirm.textContent = 'تأیید'"));
  assert.ok(prepare.includes("confirm.addEventListener('click', () => this.closeConfiguredFormsA4())"));
  assert.ok(prepare.indexOf('viewport.appendChild(paper)') < prepare.indexOf('viewport.appendChild(actions)'));
  assert.ok(styles.includes('.event-forms-a4-confirm'));
  assert.ok(source.includes('closeConfiguredFormsA4: function ()'));
});

test('invalid required controls reopen A4 only when needed and hidden conditional fields are ignored', () => {
  assert.ok(source.includes('configuredContainer.contains(invalidControl)'));
  assert.ok(source.includes("wrapper.dataset.visibilityHidden === 'true'"));
  assert.ok(source.includes('if (formResponses === null)'));
  assert.ok(source.includes('this.openConfiguredFormsA4()'));
  assert.ok(source.includes("configuredContainer.querySelector(':invalid')"));
});

test('A4 modal supports keyboard dismissal, mobile scrolling, print sizing, and reduced motion', () => {
  assert.ok(source.includes('Events.closeConfiguredFormsA4()'));
  assert.ok(styles.includes('#event-configured-forms-section.event-configured-forms-a4-overlay'));
  assert.ok(styles.includes('width: min(210mm, calc(100vw - 72px))'));
  assert.ok(styles.includes('@media (max-width: 700px)'));
  assert.ok(styles.includes('@media print'));
  assert.ok(styles.includes('prefers-reduced-motion: reduce'));
});

test('A4 form UI keeps the existing event submission and response collection methods', () => {
  assert.ok(source.includes('collectConfiguredFormResponses: async function (projectId)'));
  assert.ok(source.includes("PMS.Api.post('/events'"));
});

test('event form assets use the submit-validation cache-busting version', () => {
  assert.ok(index.includes('events.css?v=20261112-created-project-focus-1'));
  assert.ok(index.includes('js/modules/events.js?v=20261112-events-create-project-focus-1'));
});
