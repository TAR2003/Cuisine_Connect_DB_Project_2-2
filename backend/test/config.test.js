const test = require('node:test');
const assert = require('node:assert/strict');
const { loadConfig } = require('../src/config');

test('missing Oracle environment fails closed', () => {
  assert.throws(
    () => loadConfig({ PORT: '3001' }),
    (error) => error.code === 'MISSING_ENV' && error.message.includes('ORACLE_USER')
  );
});

test('configuration comes only from the provided environment', () => {
  const config = loadConfig({
    ORACLE_USER: 'cuisine',
    ORACLE_PASSWORD: 'from-the-environment',
    ORACLE_CONNECT_STRING: 'localhost/ORCLPDB',
    PORT: '4000',
    SEED_PASSWORD: 'seed-only'
  });
  assert.equal(config.user, 'cuisine');
  assert.equal(config.password, 'from-the-environment');
  assert.equal(config.connectString, 'localhost/ORCLPDB');
  assert.equal(config.port, 4000);
  assert.equal(config.seedPassword, 'seed-only');
  assert.equal(config.cookieSecure, false);
});
