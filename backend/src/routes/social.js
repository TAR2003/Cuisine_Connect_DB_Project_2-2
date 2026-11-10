// Social writes stay next to their SQL helpers in server.js.
// This module is the place those handlers move when they no longer close over that file.
const PATHS = [
  '/api/addcomment',
  '/api/deletecomment',
  '/api/addreact',
  '/api/removereact',
  '/api/addshare',
  '/api/friend',
  '/api/getmessages',
  '/api/insertmessage',
  '/api/follow',
  '/api/unfollow'
];

function registerSocial(app, handlers) {
  PATHS.forEach((routePath) => {
    const handler = handlers && handlers[routePath];
    if (handler) app.post(routePath, handler);
  });
}

module.exports = { PATHS, registerSocial };
