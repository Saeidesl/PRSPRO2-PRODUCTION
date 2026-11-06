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
