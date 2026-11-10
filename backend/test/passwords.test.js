const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { hashPassword, verifyPassword } = require('../src/passwords');

test('a wrong password fails and a bcrypt hash verifies', async () => {
  const hash = await hashPassword('correct horse');
  assert.match(hash, /^\$2[aby]\$/);
  assert.equal(await verifyPassword('nope', hash), false);
  assert.equal(await verifyPassword('correct horse', hash), true);
});

test('the server does not call CHECK_PASS', () => {
  const source = fs.readFileSync(path.join(__dirname, '../server.js'), 'utf8');
  assert.equal(source.includes('CHECK_PASS'), false);
  assert.equal(source.includes('ORA_HASH'), false);
});
