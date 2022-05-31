const { authController } = require('../../../adapters/controllers/authController');
const { userDbRepositoryInterface } = require('../../../application/repositories/userDbRepository');
const { userDbRepositoryMongoDBImpl } = require('../../database/userRepositoryMongoDB');
const { authServiceInterface } = require('../../../application/services/authServiceInterface');
const { authServiceImpl } = require('../../services/authServiceImpl');

const authRouter = (express) => {
  const router = express.Router();

  // load controller with dependencies
  const controller = authController(
    userDbRepositoryInterface,
    userDbRepositoryMongoDBImpl,
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
