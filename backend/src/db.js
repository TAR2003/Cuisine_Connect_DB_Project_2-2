const oracledb = require('oracledb');
const { loadConfig } = require('./config');

let pool;

async function initPool() {
  if (pool) return pool;
  const config = loadConfig();
  pool = await oracledb.createPool({
    user: config.user,
    password: config.password,
    connectString: config.connectString,
    poolMin: 1,
    poolMax: 4,
    poolIncrement: 1
  });
  return pool;
}

async function getConnection() {
  if (!pool) {
    throw new Error('Database pool is not initialized');
  }
  return pool.getConnection();
}

async function closePool() {
  if (!pool) return;
  await pool.close(0);
  pool = null;
}

module.exports = { initPool, getConnection, closePool };
