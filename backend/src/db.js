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

function createTransaction(connect) {
  return async function withTransaction(work) {
    const connection = await connect();
    try {
      const value = await work(connection);
      await connection.commit();
      return value;
    } catch (error) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error('rollback failed:', rollbackError.message);
      }
      throw error;
    } finally {
      try {
        await connection.close();
      } catch (closeError) {
        console.error('Error closing connection:', closeError.message);
      }
    }
  };
}

const withTransaction = createTransaction(getConnection);

async function closePool() {
  if (!pool) return;
  await pool.close(0);
  pool = null;
}

module.exports = { initPool, getConnection, closePool, withTransaction, createTransaction };
