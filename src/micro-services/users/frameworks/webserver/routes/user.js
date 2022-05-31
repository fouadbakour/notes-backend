const { userController } = require('../../../adapters/controllers/userController');
const { userDbRepositoryInterface } = require('../../../application/repositories/userDbRepository');
const { userDbRepositoryMongoDBImpl } = require('../../database/userRepositoryMongoDB');
const { authServiceInterface } = require('../../../application/services/authServiceInterface');
const { authServiceImpl } = require('../../services/authServiceImpl');
const { authMiddleware } = require('../middlewares/authMiddleware');

const { mailerServiceInterface } = require('../../../application/services/mailerServiceInterface');
const { mailerServiceImpl } = require('../../services/mailerServiceImpl');

const userRouter = (express) => {
  const router = express.Router();

  // load controller with dependencies
  const controller = userController(
    userDbRepositoryInterface,
    userDbRepositoryMongoDBImpl,
    authServiceInterface,
    authServiceImpl,
    mailerServiceInterface,
    mailerServiceImpl,
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
