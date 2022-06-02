const { notesRouter } = require('./notesRouter');

const routes = (app, express) => {
  app.use('/api/v1/notes', notesRouter(express));
};

module.exports = {
  routes,
};
