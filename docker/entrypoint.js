const path = require('path');
const { spawn } = require('child_process');
const oracledb = require(path.join(__dirname, '../backend/node_modules/oracledb'));

const backendDir = path.join(__dirname, '../backend');

function connectionConfig() {
  return {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECT_STRING
  };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForSchema() {
  const deadline = Date.now() + 10 * 60 * 1000;
  let lastError = 'database did not answer';
  while (Date.now() < deadline) {
    let connection;
    try {
      connection = await oracledb.getConnection(connectionConfig());
      const result = await connection.execute('SELECT COUNT(*) FROM USERS');
      return Number(result.rows[0][0]);
    } catch (error) {
      lastError = error.message;
      await delay(3000);
    } finally {
      if (connection) {
        try { await connection.close(); } catch (closeError) { console.error(closeError.message); }
      }
    }
  }
  console.error('Oracle schema was not ready: ' + lastError);
  process.exit(1);
}

function runSeed() {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(__dirname, '../database/rebuild/seed.js')], {
      cwd: backendDir,
      env: process.env,
      stdio: 'inherit'
    });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error('seed exited with ' + code));
    });
  });
}

async function main() {
  const users = await waitForSchema();
  if (users === 0) await runSeed();
  require(path.join(backendDir, 'server.js')).start();
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
