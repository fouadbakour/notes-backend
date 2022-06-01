const { userRouter } = require('./userRouter');
const { authRouter } = require('./authRouter');

const routes = (app, express) => {
  app.use('/api/v1/users', userRouter(express));
  app.use('/api/v1/login', authRouter(express));
};

module.exports = {
  routes,
};
