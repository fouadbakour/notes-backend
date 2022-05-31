const { userController } = require('../../../adapters/controllers/userController');
const { userDbRepositoryInterface } = require('../../../application/repositories/userDbRepository');
const { userDbRepositoryMongoDBImpl } = require('../../database/userRepositoryMongoDB');
const { authServiceInterface } = require('../../../application/services/authService');
const { authServiceImpl } = require('../../services/authService');
const { authMiddleware } = require('../middlewares/authMiddleware');

const userRouter = (express) => {
  const router = express.Router();

  // load controller with dependencies
  const controller = userController(
    userDbRepositoryInterface,
    userDbRepositoryMongoDBImpl,
    authServiceInterface,
    authServiceImpl,
  );

  // GET endpoints
  router.route('/:id').get(authMiddleware, controller.fetchUserById);
  router.route('/').get(authMiddleware, controller.fetchUsersByProperty);

  // POST endpoints
  router.route('/').post(controller.addNewUser);

  return router;
};

module.exports = {
  userRouter,
};
