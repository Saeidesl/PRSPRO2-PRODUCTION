'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const routerSource = fs.readFileSync(
  path.join(__dirname, '..', 'js/core/router.js'),
  'utf8'
);

function resolveBaseUrl(pathname) {
  const window = {
    location: {
      pathname,
      origin: 'https://saeidesl.github.io',
      hash: '#events'
    },
    PMS: {}
  };
  vm.runInNewContext(routerSource, { window, URL });
  return window.PMS.Router.getBaseUrl().href;
}

test('operational GitHub Pages path resolves dynamic pages inside production repository', () => {
  assert.equal(
    resolveBaseUrl('/PRSPRO2-PRODUCTION/'),
    'https://saeidesl.github.io/PRSPRO2-PRODUCTION/'
  );
  assert.equal(
    resolveBaseUrl('/PRSPRO2-PRODUCTION/index.html'),
    'https://saeidesl.github.io/PRSPRO2-PRODUCTION/'
  );
});

test('unknown root paths do not fall back to the Development repository', () => {
  assert.equal(
    resolveBaseUrl('/'),
    'https://saeidesl.github.io/PRSPRO2-PRODUCTION/'
  );
});

test('explicit legacy and staging paths remain compatible', () => {
  assert.equal(
    resolveBaseUrl('/PRSPRO2/'),
    'https://saeidesl.github.io/PRSPRO2/'
  );
  assert.equal(
    resolveBaseUrl('/PRSPRO2/staging/'),
    'https://saeidesl.github.io/PRSPRO2/staging/'
  );
});
