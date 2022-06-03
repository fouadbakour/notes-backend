const { userController } = require('../../../adapters/controllers/userController');
const { userDbRepositoryInterface } = require('../../../application/repositories/userDbRepositoryInterface');
const { userDbRepositoryImpl } = require('../../database/userDbRepositoryImpl');
const { authServiceInterface } = require('../../../application/services/authServiceInterface');
const { authServiceImpl } = require('../../services/authServiceImpl');

const { mailerServiceInterface } = require('../../../application/services/mailerServiceInterface');
const { mailerServiceImpl } = require('../../services/mailerServiceImpl');

const userRouter = (express) => {
  const router = express.Router();

  // load controller with dependencies
  const controller = userController(
    userDbRepositoryInterface,
    userDbRepositoryImpl,
    authServiceInterface,
    authServiceImpl,
    mailerServiceInterface,
    mailerServiceImpl,
  );

  // POST endpoints
  router.route('/').post(controller.addNewUser);

  return router;
};

module.exports = {
  userRouter,
};
