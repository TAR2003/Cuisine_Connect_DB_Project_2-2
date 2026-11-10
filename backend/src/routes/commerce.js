const PATHS = [
  '/api/insertorder',
  '/api/removefromcart',
  '/api/decrease',
  '/api/increase',
  '/api/delivered',
  '/api/ontheway',
  '/api/preparing',
  '/api/getorderinfo',
  '/api/addmenu',
  '/api/reservations'
];

function registerCommerce(app, handlers) {
  PATHS.forEach((routePath) => {
    const handler = handlers && handlers[routePath];
    if (handler) app.post(routePath, handler);
  });
}

module.exports = { PATHS, registerCommerce };
