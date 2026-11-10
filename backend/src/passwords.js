const bcrypt = require('bcryptjs');

const ROUNDS = 12;

function hashPassword(password) {
  return bcrypt.hash(String(password), ROUNDS);
}

async function verifyPassword(password, hash) {
  if (!password || !hash || !String(hash).startsWith('$2')) return false;
  return bcrypt.compare(String(password), String(hash));
}

module.exports = { hashPassword, verifyPassword, ROUNDS };
