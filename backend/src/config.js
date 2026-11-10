const fs = require('fs');

const REQUIRED = ['ORACLE_USER', 'ORACLE_PASSWORD', 'ORACLE_CONNECT_STRING'];

function loadEnvFile(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function loadConfig(env = process.env) {
  const missing = REQUIRED.filter((key) => !env[key]);
  if (missing.length) {
    const error = new Error('Missing required environment variables: ' + missing.join(', '));
    error.code = 'MISSING_ENV';
    throw error;
  }
  const port = Number(env.PORT || 3001);
  return {
    user: env.ORACLE_USER,
    password: env.ORACLE_PASSWORD,
    connectString: env.ORACLE_CONNECT_STRING,
    port: Number.isFinite(port) && port > 0 ? port : 3001,
    seedPassword: env.SEED_PASSWORD || '',
    cookieSecure: env.COOKIE_SECURE === 'true'
  };
}

module.exports = { loadEnvFile, loadConfig, REQUIRED };
