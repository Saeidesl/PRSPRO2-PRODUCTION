'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const projects = fs.readFileSync(path.join(root, 'js', 'modules', 'projects.js'), 'utf8');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

test('shared project create form ensures its progress animation styles on every route', () => {
  const openForm = projects.indexOf('openCreateForm: async function (editProject, options)');
  const styleCall = projects.indexOf('this.ensureProjectStyles();', openForm);
  const modalCreation = projects.indexOf("const modal = document.createElement('div');", openForm);
  assert.ok(openForm >= 0 && styleCall > openForm && modalCreation > styleCall);
});

test('project progress animation styles remain idempotent and support reduced motion', () => {
  assert.match(projects, /ensureProjectStyles: function \(\)/);
  assert.match(projects, /projects-card-view-styles/);
  assert.match(projects, /\.project-create-progress\{/);
  assert.match(projects, /\.project-create-progress-spinner/);
  assert.match(projects, /prefers-reduced-motion:reduce/);
});

test('project module cache key is refreshed for the shared progress-style fix', () => {
  assert.match(index, /js\/modules\/projects\.js\?v=20261112-project-create-progress-1/);
});
