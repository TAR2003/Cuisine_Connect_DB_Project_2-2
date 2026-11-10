const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { createTransaction } = require('../src/db');

test('a failed registration rolls back and does not commit', async () => {
  const events = [];
  const withTransaction = createTransaction(async () => ({
    async commit() { events.push('commit'); },
    async rollback() { events.push('rollback'); },
    async close() { events.push('close'); }
  }));
  await assert.rejects(() => withTransaction(async () => {
    events.push('user');
    throw new Error('subtype insert failed');
  }));
  assert.deepEqual(events, ['user', 'rollback', 'close']);
});

test('post inserts return the id Oracle generated', () => {
  const source = fs.readFileSync(path.join(__dirname, '../server.js'), 'utf8');
  assert.equal(source.includes('MAX(POST_ID)'), false);
  assert.match(source, /RETURNING POST_ID INTO :id/);
  const timeline = source.slice(source.indexOf('async function getcustomertimeline'));
  const friendBranches = timeline.split('FRIEND_REQUEST');
  assert.ok(friendBranches.length >= 3);
  assert.match(friendBranches[1], /STATUS = 'A'/);
  assert.match(friendBranches[2], /STATUS = 'A'/);
});
