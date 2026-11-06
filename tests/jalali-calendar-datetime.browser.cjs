'use strict';
const { chromium } = require('playwright');
const path = require('node:path');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await page.setContent('<!doctype html><html lang="fa" dir="rtl"><body><form><input id="event-date" type="datetime-local" value="2026-11-06T14:30"><input id="date-only" type="date" value="2026-11-06"></form></body></html>');
    await page.addScriptTag({ path: path.join(__dirname, '..', 'js/components/jalali-calendar.js') });

    const trigger = page.locator('#event-date-jalali').locator('xpath=following-sibling::button[contains(@class,"pms-jalali-calendar-trigger")]');
    await trigger.click();
    await page.locator('.pms-jalali-calendar button.is-selected').click();
    await page.locator('.pms-jalali-time-picker').waitFor({ state: 'visible', timeout: 1500 });
    assert.equal(await page.locator('.pms-jalali-calendar:visible').count(), 1, 'exactly one time picker popup must remain open after selecting a day');
    assert.equal(await page.locator('.pms-jalali-time-picker select[data-time="hour"] option').count(), 24);
    assert.equal(await page.locator('.pms-jalali-time-picker select[data-time="minute"] option').count(), 60);

    await page.locator('.pms-jalali-time-picker select[data-time="hour"]').selectOption('08');
    await page.locator('.pms-jalali-time-picker select[data-time="minute"]').selectOption('45');
    await page.locator('.pms-jalali-cal-confirm').click();
    assert.match(await page.locator('#event-date').inputValue(), /^2026-11-06T08:45$/);

    const dateTrigger = page.locator('#date-only-jalali').locator('xpath=following-sibling::button[contains(@class,"pms-jalali-calendar-trigger")]');
    await dateTrigger.click();
    const dateOnlyPopup = page.locator('.pms-jalali-calendar').last();
    await dateOnlyPopup.locator('button.is-selected').click();
    assert.equal(await dateOnlyPopup.locator('.pms-jalali-time-picker').count(), 0, 'date-only fields must not show time controls');
    assert.equal(await page.locator('#date-only').inputValue(), '2026-11-06');
    console.log('Jalali datetime browser test passed (mobile viewport, date-to-time transition, hour/minute commit, date-only compatibility).');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
