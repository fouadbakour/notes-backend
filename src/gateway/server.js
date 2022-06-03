/* eslint-disable no-console */
const express = require('express');
const { ROUTES } = require('./routes');
const { setupLogging } = require('./logging');
const { setupProxies } = require('./proxy');
const { setupRateLimit } = require('./ratelimit');
const { PORT } = require('./config');

const app = express();

setupLogging(app);
setupRateLimit(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
