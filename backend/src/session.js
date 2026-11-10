const crypto = require('crypto');

const COOKIE_NAME = 'cc.sid';
const SESSION_DAYS = 7;

function cookieOptions(config = {}) {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: Boolean(config.cookieSecure),
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000
  };
}

function newSessionId() {
  return crypto.randomBytes(32).toString('hex');
}

function readCookie(header, name = COOKIE_NAME) {
  if (!header) return null;
  for (const part of String(header).split(';')) {
    const text = part.trim();
    const eq = text.indexOf('=');
    if (eq <= 0) continue;
    if (text.slice(0, eq) === name) return decodeURIComponent(text.slice(eq + 1));
  }
  return null;
}

function serializeCookie(name, value, options) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  if (options.maxAge != null) parts.push('Max-Age=' + Math.floor(options.maxAge / 1000));
  if (options.path) parts.push('Path=' + options.path);
  if (options.httpOnly) parts.push('HttpOnly');
  if (options.sameSite) parts.push('SameSite=' + options.sameSite);
  if (options.secure) parts.push('Secure');
  return parts.join('; ');
}

function publicActor(user) {
  return {
    userId: user.userId,
    userName: user.userName,
    userType: user.userType,
    name: user.name
  };
}

function sendJson(res, status, body) {
  res.status(status).json(body);
}

async function insertSession(connection, userId) {
  const sessionId = newSessionId();
  if (String(sessionId) === String(userId)) {
    throw new Error('Refusing to use the user id as a session id');
  }
  await connection.execute(
    `INSERT INTO SESSIONS (SESSION_ID, USER_ID, CREATED_AT, EXPIRES_AT)
     VALUES (:sessionId, :userId, SYSDATE, SYSDATE + :days)`,
    { sessionId, userId, days: SESSION_DAYS },
    { autoCommit: true }
  );
  return sessionId;
}

async function readActor(connection, sessionId) {
  if (!sessionId) return null;
  const result = await connection.execute(
    `SELECT U.USER_ID, U.USER_NAME, U.USER_TYPE, U.ACTIVE_STATUS, U.NAME
     FROM SESSIONS S
     JOIN USERS U ON U.USER_ID = S.USER_ID
     WHERE S.SESSION_ID = :sessionId
       AND S.EXPIRES_AT > SYSDATE`,
    { sessionId }
  );
  const row = result.rows && result.rows[0];
  if (!row) return null;
  const actor = {
    userId: row[0],
    userName: row[1],
    userType: row[2],
    activeStatus: row[3],
    name: row[4]
  };
  if (actor.activeStatus !== 'A') return null;
  return actor;
}

async function deleteSession(connection, sessionId) {
  if (!sessionId) return;
  await connection.execute(
    'DELETE FROM SESSIONS WHERE SESSION_ID = :sessionId',
    { sessionId },
    { autoCommit: true }
  );
}

async function handleLogin(req, res, deps) {
  const username = req.body && req.body.username;
  const password = req.body && req.body.password;
  if (!username || !password) {
    sendJson(res, 400, {
      ok: false,
      error: { code: 'BAD_REQUEST', message: 'Username and password are required' }
    });
    return;
  }
  const user = await deps.authenticate(username, password);
  if (!user || user.activeStatus !== 'A') {
    sendJson(res, 401, {
      ok: false,
      error: { code: 'UNAUTHORIZED', message: 'Sign-in failed' }
    });
    return;
  }
  const sessionId = await deps.createSession(user.userId);
  if (String(sessionId) === String(user.userId)) {
    sendJson(res, 500, {
      ok: false,
      error: { code: 'SERVER_ERROR', message: 'Could not start a session' }
    });
    return;
  }
  res.setHeader('Set-Cookie', serializeCookie(COOKIE_NAME, sessionId, cookieOptions(deps.config)));
  sendJson(res, 200, { ok: true, data: publicActor(user) });
}

async function handleLogout(req, res, deps) {
  const sessionId = readCookie(req.headers.cookie);
  if (sessionId) await deps.destroySession(sessionId);
  res.setHeader(
    'Set-Cookie',
    serializeCookie(COOKIE_NAME, '', { ...cookieOptions(deps.config), maxAge: 0 })
  );
  sendJson(res, 200, { ok: true, data: null });
}

async function handleMe(req, res, deps) {
  const sessionId = readCookie(req.headers.cookie);
  const actor = sessionId ? await deps.loadActor(sessionId) : null;
  if (!actor) {
    sendJson(res, 401, {
      ok: false,
      error: { code: 'UNAUTHORIZED', message: 'Sign in required' }
    });
    return;
  }
  sendJson(res, 200, { ok: true, data: publicActor(actor) });
}

const ENSURE_SESSIONS_SQL = `
BEGIN
  EXECUTE IMMEDIATE '
    CREATE TABLE SESSIONS (
      SESSION_ID VARCHAR2(64) PRIMARY KEY,
      USER_ID NUMBER NOT NULL,
      CREATED_AT DATE NOT NULL,
      EXPIRES_AT DATE NOT NULL,
      CONSTRAINT SESSIONS_USER_FK FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID) ON DELETE CASCADE
    )';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -955 THEN
      RAISE;
    END IF;
END;`;

module.exports = {
  COOKIE_NAME,
  cookieOptions,
  newSessionId,
  readCookie,
  serializeCookie,
  insertSession,
  readActor,
  deleteSession,
  handleLogin,
  handleLogout,
  handleMe,
  ENSURE_SESSIONS_SQL
};
