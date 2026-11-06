'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const api = fs.readFileSync(path.join(__dirname, '..', 'js', 'core', 'api.js'), 'utf8');
const events = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'events.js'), 'utf8');

test('getCached supports TTL and refreshes legacy entries without an expiry', () => {
  assert.match(api, /const cacheTtl = Number\(options\.cacheTtl \|\| 0\)/);
  assert.match(api, /Cache\.getMeta\(cacheKey\)/);
  assert.match(api, /if \(!metadata \|\| !metadata\.expiresAt\) cached = null/);
  assert.match(api, /Cache\.set\(cacheKey, data, cacheOptions\)/);
});

test('event list and event type reference data use bounded cache lifetimes', () => {
  assert.match(events, /getCached\('\/events', CACHE_KEY, \{\s*cacheTtl: 15000/);
  assert.match(events, /getCached\('\/event-types', EVENT_TYPES_CACHE_KEY, \{\s*cacheTtl: 60000/);
});

test('event form definitions use a short-lived authenticated-session cache', () => {
  assert.match(events, /EVENT_FORM_DEFINITION_CACHE_TTL_MS = 30000/);
  assert.match(events, /const eventFormDefinitionCache = new Map\(\)/);
  assert.match(events, /eventFormDefinitionCacheKey\(eventTypeId\)/);
  assert.match(events, /eventFormDefinitionCache\.get\(cacheKey\)/);
  assert.match(events, /eventFormDefinitionCache\.set\(cacheKey/);
  assert.match(events, /\['forms', 'event-types', 'information-types'\]/);
  assert.match(events, /pms:auth-expired/);
});


test('opening the registration modal starts a read-only batched form-definition prefetch', () => {
  assert.match(events, /this\.prefetchEventFormDefinitions\(\)/);
  assert.ok(events.includes("PMS.Api.get('/event-types', {"));
  assert.ok(events.includes('query: { includeFormDefinitions: true }'));
  assert.match(events, /FormDefinitionsLoadFailed/);
});

test('event form prefetch never blocks selection and retains the per-type API fallback', () => {
  assert.match(events, /eventFormDefinitionsPrefetchPromise/);
  assert.doesNotMatch(events, /await eventFormDefinitionsPrefetchPromise/);
  assert.match(events, /Do not block the selected event type on an unfinished prefetch/);
  assert.match(events, /PMS\.Api\.get\('\/event-types\/' \+ encodeURIComponent\(eventTypeId\) \+ '\/forms'\)/);
  assert.match(events, /eventFormDefinitionCacheGeneration/);
  assert.match(events, /eventFormDefinitionsPrefetchToken/);
});
