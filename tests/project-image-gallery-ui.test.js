const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const events = fs.readFileSync(path.join(__dirname, '..', 'js/modules/events.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'css/events.css'), 'utf8');

test('project cards show one gallery action with aggregate metadata counts', () => {
  assert.match(events, /\/project-image-gallery\/counts/);
  assert.match(events, /data-project-gallery-count/);
  assert.match(events, /event-queue-gallery-button/);
  assert.match(events, /loadProjectImageCounts: function/);
});

test('gallery UI requires both attachment access and project or event visibility', () => {
  assert.match(events, /canViewProjectImageGallery: function/);
  assert.match(events, /permissions\.indexOf\('ATTACHMENT_VIEW'\) !== -1/);
  assert.match(events, /permissions\.indexOf\('PROJECT_VIEW'\) !== -1 \|\| permissions\.indexOf\('EVENT_VIEW'\) !== -1/);
});

test('full gallery metadata is requested only after the gallery button is activated', () => {
  const openAt = events.indexOf('openProjectImageGallery: async function');
  const metadataAt = events.indexOf("'/projects/' + encodeURIComponent(projectId) + '/image-gallery'", openAt);
  const clickAt = events.indexOf("target.closest('.event-queue-gallery-button')");
  assert.ok(openAt >= 0 && metadataAt > openAt && clickAt > 0);
});

test('gallery groups images by event and date and loads only viewport thumbnails with bounded concurrency', () => {
  assert.match(events, /const eventId = String\(item\.EventID/);
  assert.match(events, /const dateKey = \/\^\\d\{4\}-\\d\{2\}-\\d\{2\}/);
  assert.match(events, /new IntersectionObserver/);
  assert.match(events, /while \(state\.active < 3 && state\.queue\.length\)/);
  assert.match(events, /\/attachments\/.*\/thumbnail/);
});

test('full-size attachment download is deferred to image selection and uses shared native preview', () => {
  const galleryStart = events.indexOf('openProjectImageGallery: async function');
  const galleryEnd = events.indexOf('processProjectImageGalleryThumbnailQueue: function', galleryStart);
  const gallery = events.slice(galleryStart, galleryEnd);
  assert.doesNotMatch(gallery, /\/attachments\/.*\/download/);
  assert.match(events, /\/attachments\/.*\/download/);
  assert.match(events, /projectModule\.openImagePreview\(url/);
});

test('gallery releases thumbnail object URLs when the modal closes and uses responsive styling', () => {
  assert.match(events, /state\.urls\.forEach\(\(url\) => URL\.revokeObjectURL\(url\)\)/);
  assert.match(styles, /\.event-project-image-gallery-dialog/);
  assert.match(styles, /@media \(max-width:640px\)/);
});
