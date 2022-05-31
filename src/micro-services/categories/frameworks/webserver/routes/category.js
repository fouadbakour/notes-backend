const { categoriesController } = require('../../../adapters/controllers/categoriesController');
const { categoriesDbRepositoryInterface } = require('../../../application/repositories/categoriesDbRepositoryInterface');
const { categoriesDbRepositoryImpl } = require('../../database/categoriesDbRepositoryImpl');
const { authMiddleware } = require('../middlewares/authMiddleware');

const categoriesRouter = (express) => {
  const router = express.Router();

  // load controller with dependencies
  const controller = categoriesController(
    categoriesDbRepositoryInterface,
    categoriesDbRepositoryImpl,
  );

  // GET endpoints
  router.route('/:id').get(authMiddleware, controller.fetchCategoryById);
  router.route('/').get(authMiddleware, controller.fetchCategoriesByProperty);

  // POST endpoints
  router.route('/').post(controller.addNewCategory);

  // DELETE endpoints
  router.route('/:id').delete(controller.deleteCategoryById);

  // PUT endpoints
  router.route('/:id').delete(controller.updateCategory);

  return router;
};

module.exports = {
  categoriesRouter,
};
