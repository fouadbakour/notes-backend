const { addCategory } = require('../../application/use-cases/add');
const { findByProperty } = require('../../application/use-cases/findByProperty');
const { countAll } = require('../../application/use-cases/countAll');
const { findById } = require('../../application/use-cases/findById');
const { deleteById } = require('../../application/use-cases/deleteById');
const { updateById } = require('../../application/use-cases/updateById');

const categoriesController = (
  categoriesDbRepositoryInterface,
  categoriesDbRepositoryImpl,
  authServiceInterface,
  authServiceImpl,
) => {
  const dbRepository = categoriesDbRepositoryInterface(categoriesDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const fetchCategoriesByProperty = (req, res, next) => {
    const params = {};
    const response = {};

    // get access token
    const { authorization } = req.headers;

    // get the user ID from the access token
    const userId = authService.getUserId(authorization);

    // Dynamically created query params based on endpoint params
    // eslint-disable-next-line no-restricted-syntax
    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        params[key] = req.query[key];
      }
    }
    // predefined query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page, 10) : 1;
    params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;
    params.createdBy = userId;

    findByProperty(params, dbRepository)
      .then((records) => {
        response.categories = records;
        return countAll(params, dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.perPage);
        response.itemsPerPage = params.perPage;
        return res.json(response);
      })
      .catch((error) => next(error));
  };

  const fetchCategoryById = (req, res, next) => {
    const { id } = req.params;
    findById(id, dbRepository)
      .then((record) => res.json(record))
      .catch((error) => next(error));
  };

  const deleteCategoryById = (req, res, next) => {
    const { id } = req.params;
    deleteById(id, dbRepository)
      .then((record) => res.json(record))
      .catch((error) => next(error));
  };

  const updateCategory = (req, res, next) => {
    const { title } = req.body;
    const { id } = req.params;
    updateById(id, title, dbRepository)
      .then((record) => res.json(record))
      .catch((error) => next(error));
  };

  const addNewCategory = (req, res, next) => {
    // Get json body values
    const {
      title, createdAt,
    } = req.body;

    // get access token
    const { authorization } = req.headers;
    addCategory(
      title,
      createdAt,
      authorization,
      dbRepository,
      authService,
    )
      .then((record) => res.json(record))
      .catch((error) => next(error));
  };

  return {
    fetchCategoriesByProperty,
    fetchCategoryById,
    addNewCategory,
    deleteCategoryById,
    updateCategory,
  };
};

module.exports = {
  categoriesController,
};
