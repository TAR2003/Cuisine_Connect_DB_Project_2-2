const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const rebuild = path.join(__dirname, '../../database/rebuild');

function read(name) {
  return fs.readFileSync(path.join(rebuild, name), 'utf8');
}

test('rebuild scripts are ordered and contain the sequences the server uses', () => {
  const order = read('ORDER.md');
  const dropAt = order.indexOf('00_drop.sql');
  const tablesAt = order.indexOf('01_tables.sql');
  const indexesAt = order.indexOf('02_indexes.sql');
  const sequencesAt = order.indexOf('03_sequences.sql');
  const routinesAt = order.indexOf('04_routines.sql');
  assert.ok(dropAt < tablesAt && tablesAt < indexesAt && indexesAt < sequencesAt && sequencesAt < routinesAt);

  const sequences = read('03_sequences.sql');
  for (const name of [
    'USER_ID_SEQ',
    'CUSTOMER_ID_SEQ',
    'RESTAURANT_ID_SEQ',
    'POST_ID_SEQ',
    'PAGE_ID_SEQ',
    'COMMENT_ID_SEQ',
    'MENU_ID_SEQ',
    'ORDER_ID_SEQ',
    'RESERVE_ID_SEQ',
    'NOTIFICATION_ID_SEQ',
    'ACTIVITY_ID_SEQ',
    'MESSAGE_ID_SEQ'
  ]) {
    assert.match(sequences, new RegExp('CREATE SEQUENCE ' + name + '\\b'));
  }

  const tables = read('01_tables.sql');
  for (const name of ['USERS', 'CUSTOMER', 'RESTAURANT', 'MENU', 'FOODORDER', 'RESERVATIONS', 'MESSAGES', 'SESSIONS', 'ADMIN_LOG']) {
    assert.match(tables, new RegExp('CREATE TABLE ' + name + '\\b'));
  }
  assert.match(tables, /PASSWORD VARCHAR2\(255\)/);
  assert.match(tables, /USER_TYPE IN \('P', 'R', 'C', 'A'\)/);
  assert.match(tables, /ON DELETE SET NULL/);
  assert.doesNotMatch(read('04_routines.sql'), /FUNCTION CHECK_PASS/);
  assert.doesNotMatch(read('seed.js'), /SEED_PASSWORD\s*=\s*['"][^'"]+['"]/);
});
