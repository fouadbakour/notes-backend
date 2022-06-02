const { notesController } = require('../../../adapters/controllers/notesController');
const { notesDbRepositoryInterface } = require('../../../application/repositories/notesDbRepositoryInterface');
const { notesDbRepositoryImpl } = require('../../database/notesDbRepositoryImpl');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { authServiceImpl } = require('../../services/authServiceImpl');
const { authServiceInterface } = require('../../../application/services/authServiceInterface');
const { categoriesServiceInterImpl } = require('../../services/categoriesServiceInterImpl');
const { categoriesServiceInterface } = require('../../../application/services/categoriesServiceInterface');

const notesRouter = (express) => {
  const router = express.Router();

  // load controller with dependencies
  const controller = notesController(
    notesDbRepositoryInterface,
    notesDbRepositoryImpl,
    authServiceInterface,
    authServiceImpl,
    categoriesServiceInterface,
    categoriesServiceInterImpl,
  );

  // GET endpoints
  router.route('/:id').get(authMiddleware, controller.fetchNoteById);
  router.route('/').get(authMiddleware, controller.fetchNotesByProperty);

  // POST endpoints
  router.route('/').post(authMiddleware, controller.addNewNote);

  // DELETE endpoints
  router.route('/:id').delete(authMiddleware, controller.deleteNoteById);

  // PUT endpoints
  router.route('/:id').put(authMiddleware, controller.updateNoteById);

  return router;
};

module.exports = {
  notesRouter,
};
