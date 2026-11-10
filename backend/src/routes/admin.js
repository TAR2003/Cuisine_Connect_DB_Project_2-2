const PATHS = [
  '/api/user',
  '/api/getadminlog',
  '/api/getallusers',
  '/api/getallcustomers',
  '/api/getallrestaurants',
  '/api/getallpages',
  '/api/getallmenu',
  '/api/getallorders1',
  '/api/calculatetotaltransaction',
  '/api/calculatemenuprice'
];

function registerAdmin(app, handlers) {
  PATHS.forEach((routePath) => {
    const handler = handlers && handlers[routePath];
    if (handler) app.post(routePath, handler);
  });
}

module.exports = { PATHS, registerAdmin };
