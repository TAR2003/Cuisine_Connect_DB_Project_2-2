const test = require('node:test');
const assert = require('node:assert/strict');
const { allowedExtension, storedName } = require('../src/uploads');

test('an upload extension outside the allowlist is rejected', () => {
  assert.equal(allowedExtension('note.html'), null);
  assert.equal(allowedExtension('photo.JPG'), '.jpg');
  assert.throws(() => storedName('postphoto', 4, 'page.html'), (error) => error.code === 'BAD_UPLOAD');
  assert.equal(storedName('postphoto', 4, 'meal.png'), 'postphoto4.png');
});
