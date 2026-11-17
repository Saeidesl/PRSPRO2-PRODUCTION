'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

test('project output submits one batch resolve request for all active templates', () => {
  const module = read('js/modules/print-designer.js');
  const start = module.indexOf('initProjectOutput: async function (projectId)');
  const end = module.indexOf('loadOutputOptions: async function ()', start);
  assert.ok(start >= 0 && end > start);
  const output = module.slice(start, end);
  assert.match(output, /PMS\.Api\.post\('\/print-templates\/resolve'/);
  assert.match(output, /TemplateIDs: templates\.map\(item => String\(item\.ID\)\)/);
  assert.doesNotMatch(output, /PMS\.Api\.post\('\/print-templates\/' \+ encodeURIComponent\(template\.ID\) \+ '\/resolve'/);
});

test('project output maps batch results by template ID and preserves per-template errors', () => {
  const module = read('js/modules/print-designer.js');
  const start = module.indexOf('initProjectOutput: async function (projectId)');
  const end = module.indexOf('loadOutputOptions: async function ()', start);
  const output = module.slice(start, end);
  assert.match(output, /resolvedById\[String\(item\.template\.ID\)\] = item/);
  assert.match(output, /resolvedById\[String\(template\.ID\)\]/);
  assert.match(output, /if \(resolved\.error\) throw new Error\(resolved\.error\)/);
  assert.match(output, /failedCount\+\+/);
});

test('project output continues using fresh project data and existing renderer/editing pipeline', () => {
  const module = read('js/modules/print-designer.js');
  const output = module.slice(module.indexOf('initProjectOutput: async function (projectId)'), module.indexOf('loadOutputOptions: async function ()'));
  assert.match(output, /PMS\.Api\.post\('\/print-templates\/resolve'/);
  assert.match(output, /renderOutputDocument\(template, resolvedProject, data, \{ preservePdfObjectUrls: true \}\)/);
  assert.match(module, /bindProjectOutputSection: function/);
  assert.match(module, /uploadProjectOutputFile: async function/);
  assert.match(module, /beginProjectOutputEdit: function/);
});

test('print output keeps template definition cache separate from project resolve data', () => {
  const module = read('js/modules/print-designer.js');
  assert.match(module, /getTemplateListCached\(\)/);
  assert.match(module, /PMS\.Api\.post\('\/print-templates\/resolve'/);
  assert.match(module, /PMS\.Api\.post\('\/print-templates\/' \+ encodeURIComponent\(templateId\) \+ '\/resolve'/);
});

test('project output prepares ordered placeholders and progressively fills them with bounded concurrency', () => {
  const module = read('js/modules/print-designer.js');
  const start = module.indexOf('initProjectOutput: async function (projectId)');
  const end = module.indexOf('loadOutputOptions: async function ()', start);
  const output = module.slice(start, end);
  assert.match(output, /const sections = templates\.map/);
  assert.match(output, /preview\.appendChild\(section\)/);
  assert.match(output, /mapWithConcurrency\(templates, 2/);
  assert.match(output, /renderOutputDocument\(/);
  assert.match(output, /section\.classList\.add\('has-error'\)/);
  assert.match(output, /completedCount\+\+/);
  assert.match(module, /mapWithConcurrency: async function/);
  assert.match(module, /mapWithConcurrency\(ids, 3/);
  assert.match(module, /mapWithConcurrency\(pageElements, 2/);
});

test('parallel PDF rendering revokes only object URLs created by a failed template', () => {
  const module = read('js/modules/print-designer.js');
  assert.match(module, /const createdObjectUrls=\[\]/);
  assert.match(module, /createdObjectUrls\.push\(background\)/);
  assert.match(module, /releaseOutputPdfObjectUrls\(createdObjectUrls\)/);
  assert.match(module, /releaseOutputPdfObjectUrls: function/);
  assert.match(module, /if \(!this\.projectOutputMode\) \{/);
});
