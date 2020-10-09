const { createProxyMiddleware } = require('http-proxy-middleware');

// to delete and go back to package.json proxy attribute 
module.exports = function (app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'http://localhost:4000',
    }),
  );
  app.use(
    '/subscriptions',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      ws: true,
    }),
  );
};

