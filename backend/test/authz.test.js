const test = require('node:test');
const assert = require('node:assert/strict');
const { canDisableAccount, canReadAdmin, canParticipate, decide } = require('../src/authz');

const ada = { userId: 5, userType: 'C', activeStatus: 'A' };
const admin = { userId: 1, userType: 'A', activeStatus: 'A' };

test('one user cannot disable another user', () => {
  assert.equal(canDisableAccount(ada, 9), false);
  assert.equal(decide('/api/deleteaccount', ada, { userid: 9 }).status, 403);
  assert.equal(canDisableAccount(ada, 5), true);
});

test('a non-admin cannot call an admin read', () => {
  assert.equal(canReadAdmin(ada), false);
  assert.equal(decide('/api/getallusers', ada, {}).status, 403);
  assert.equal(decide('/api/getadminlog', admin, {}).ok, true);
});

test('a signed-in user can read a public feed', () => {
  assert.equal(decide('/api/getallposts', ada, {}).ok, true);
  assert.equal(decide('/api/getmenu', ada, { userid: 99 }).ok, true);
});

test('a customer cannot move another restaurant order', () => {
  const parties = { customerUserId: 5, restaurantUserId: 8 };
  assert.equal(canParticipate(ada, parties, 'restaurant'), false);
  assert.equal(canParticipate({ userId: 8, userType: 'R', activeStatus: 'A' }, parties, 'restaurant'), true);
});

test('a disabled actor is not authorized', () => {
  const disabled = { userId: 5, userType: 'C', activeStatus: 'D' };
  assert.equal(decide('/api/getallposts', disabled, {}).status, 401);
});
