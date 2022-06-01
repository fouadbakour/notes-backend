const { categoriesController } = require('../../../adapters/controllers/categoriesController');
const { categoriesDbRepositoryInterface } = require('../../../application/repositories/categoriesDbRepositoryInterface');
const { categoriesDbRepositoryImpl } = require('../../database/categoriesDbRepositoryImpl');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { authServiceImpl } = require('../../services/authServiceImpl');
const { authServiceInterface } = require('../../../application/services/authServiceInterface');

const categoriesRouter = (express) => {
  const router = express.Router();

  // load controller with dependencies
  const controller = categoriesController(
    categoriesDbRepositoryInterface,
    categoriesDbRepositoryImpl,
    authServiceInterface,
    authServiceImpl,
  );

  // GET endpoints
  router.route('/:id').get(authMiddleware, controller.fetchCategoryById);
  router.route('/').get(authMiddleware, controller.fetchCategoriesByProperty);

  // POST endpoints
  router.route('/').post(authMiddleware, controller.addNewCategory);

  // DELETE endpoints
  router.route('/:id').delete(authMiddleware, controller.deleteCategoryById);

  // PUT endpoints
  router.route('/:id').delete(authMiddleware, controller.updateCategory);

  return router;
};

module.exports = {
  categoriesRouter,
};
