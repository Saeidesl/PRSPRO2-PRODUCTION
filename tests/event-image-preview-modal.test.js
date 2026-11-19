'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'js/modules/events.js'), 'utf8');
const projectsSource = fs.readFileSync(path.join(__dirname, '..', 'js/modules/projects.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('project and event images use the shared native dialog top layer', () => {
  assert.match(projectsSource, /document\.createElement\('dialog'\)/);
  assert.match(projectsSource, /dialog\.showModal\(\)/);
  assert.match(projectsSource, /pms-image-preview-dialog/);
  assert.match(projectsSource, /openProjectImage: function \(src, alt\) \{\s*return this\.openImagePreview/);
  assert.match(source, /projectModule\.openImagePreview\(url, data\.FileName \|\| 'پیش‌نمایش تصویر', \{revokeObjectUrl:true\}\)/);
  assert.doesNotMatch(projectsSource, /project-image-lightbox/);
});

test('shared image preview closes safely and releases only owned object URLs', () => {
  assert.match(projectsSource, /dialog\.close\(\)/);
  assert.match(projectsSource, /URL\.revokeObjectURL\(src\)/);
  assert.match(projectsSource, /event\.target === dialog/);
  assert.match(projectsSource, /pms-image-preview-close/);
  assert.match(source, /revokeObjectUrl:true/);
});

test('event preview click is delegated once to avoid duplicate fetch/modal races', () => {
  assert.match(source, /event\.target\.closest\('\[data-event-image-attachment\]'\)/);
  assert.doesNotMatch(source, /content\.querySelectorAll\('\[data-event-image-attachment\]'\)\.forEach/);
});

test('native dialog fix is cache-busted in production entry point', () => {
  assert.match(indexHtml, /js\/modules\/events\.js\?v=20261119-shared-image-preview-1/);
});
