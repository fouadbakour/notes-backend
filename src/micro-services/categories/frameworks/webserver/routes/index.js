const { categoriesRouter } = require('./categoryRouter');

const routes = (app, express) => {
  app.use('/api/v1/categories', categoriesRouter(express));
};

module.exports = {
  routes,
};
