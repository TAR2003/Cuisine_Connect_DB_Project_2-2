const test = require('node:test');
const assert = require('node:assert/strict');
const {
  COOKIE_NAME,
  cookieOptions,
  serializeCookie,
  handleLogin,
  handleMe
} = require('../src/session');

function mockResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(name, value) {
      this.headers[name] = value;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };
}

test('session cookie is httpOnly, SameSite=Lax, and is not the user id', async () => {
  const options = cookieOptions({ cookieSecure: false });
  assert.equal(options.httpOnly, true);
  assert.equal(options.sameSite, 'lax');
  assert.equal(options.secure, false);

  const response = mockResponse();
  await handleLogin(
    { body: { username: '@ada', password: 'secret' } },
    response,
    {
      config: { cookieSecure: false },
      async authenticate() {
        return {
          userId: 42,
          userName: '@ada',
          userType: 'C',
          activeStatus: 'A',
          name: 'Ada'
        };
      },
      async createSession(userId) {
        assert.equal(userId, 42);
        return 'f'.repeat(64);
      }
    }
  );

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.ok, true);
  const header = response.headers['Set-Cookie'];
  assert.match(header, /HttpOnly/);
  assert.match(header, /SameSite=lax/i);
  assert.doesNotMatch(header, /cc\.sid=42(?:;|$)/);
  assert.match(header, new RegExp(COOKIE_NAME + '='));
  const serialized = serializeCookie(COOKIE_NAME, 'f'.repeat(64), options);
  assert.match(serialized, /HttpOnly/);
});

test('GET /api/me without a session returns 401', async () => {
  const response = mockResponse();
  await handleMe({ headers: {} }, response, {
    async loadActor() {
      throw new Error('loadActor should not run without a cookie');
    }
  });
  assert.equal(response.statusCode, 401);
  assert.equal(response.body.ok, false);
  assert.equal(response.body.error.code, 'UNAUTHORIZED');
});

test('a disabled account does not receive a session cookie', async () => {
  const response = mockResponse();
  await handleLogin(
    { body: { username: '@ada', password: 'secret' } },
    response,
    {
      config: {},
      async authenticate() {
        return { userId: 7, userName: '@ada', userType: 'C', activeStatus: 'D', name: 'Ada' };
      },
      async createSession() {
        throw new Error('disabled users must not get a session');
      }
    }
  );
  assert.equal(response.statusCode, 401);
  assert.equal(response.headers['Set-Cookie'], undefined);
});
