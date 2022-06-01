const { authController } = require('../../../adapters/controllers/authController');
const { userDbRepositoryInterface } = require('../../../application/repositories/userDbRepositoryInterface');
const { userDbRepositoryImpl } = require('../../database/userDbRepositoryImpl');
const { authServiceInterface } = require('../../../application/services/authServiceInterface');
const { authServiceImpl } = require('../../services/authServiceImpl');

const authRouter = (express) => {
  const router = express.Router();

  // load controller with dependencies
  const controller = authController(
    userDbRepositoryInterface,
    userDbRepositoryImpl,
    authServiceInterface,
    authServiceImpl,
  );

  // POST endpoints
  router.route('/').post(controller.loginUser);

  return router;
};

module.exports = {
  authRouter,
};
