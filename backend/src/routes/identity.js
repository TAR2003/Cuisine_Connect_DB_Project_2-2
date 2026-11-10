function registerIdentity(app, deps) {
  const { sessionHttp, withDb, authenticateUser, config } = deps;

  app.post('/api/login', async (req, res) => {
    try {
      await sessionHttp.handleLogin(req, res, {
        config,
        authenticate: authenticateUser,
        createSession: (userId) => withDb((connection) => sessionHttp.insertSession(connection, userId))
      });
    } catch (error) {
      console.error('login failed:', error.message);
      res.status(500).json({ ok: false, error: { code: 'SERVER_ERROR', message: 'Sign-in failed' } });
    }
  });

  app.post('/api/logout', async (req, res) => {
    try {
      await sessionHttp.handleLogout(req, res, {
        config,
        destroySession: (sessionId) => withDb((connection) => sessionHttp.deleteSession(connection, sessionId))
      });
    } catch (error) {
      console.error('logout failed:', error.message);
      res.status(500).json({ ok: false, error: { code: 'SERVER_ERROR', message: 'Sign-out failed' } });
    }
  });

  app.get('/api/me', async (req, res) => {
    try {
      await sessionHttp.handleMe(req, res, {
        loadActor: (sessionId) => withDb((connection) => sessionHttp.readActor(connection, sessionId))
      });
    } catch (error) {
      console.error('session lookup failed:', error.message);
      res.status(500).json({ ok: false, error: { code: 'SERVER_ERROR', message: 'Could not read the session' } });
    }
  });
}

module.exports = { registerIdentity };
