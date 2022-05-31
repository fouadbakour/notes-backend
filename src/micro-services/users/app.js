const express = require('express');

const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const { expressConfig } = require('./frameworks/webserver/express');
const { routes } = require('./frameworks/webserver/routes/index');
const { serverConfig } = require('./frameworks/webserver/server');
const { connection } = require('./frameworks/database/connection');

// middleware
const { errorHandlingMiddleware } = require('./frameworks/webserver/middlewares/errorHandlingMiddleware');

// express.js configuration (middleware etc.)
expressConfig(app);

// server configuration and start
serverConfig(app, mongoose, server).startServer();

// DB configuration and connection create
connection({
  autoIndex: false,
  useNewUrlParser: true,
  keepAlive: true,
  connectTimeoutMS: 1000,
}).connectToMongo();

// routes for each endpoint
routes(app, express);

// error handling middleware
app.use(errorHandlingMiddleware);

// define a simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my users server.' });
});
