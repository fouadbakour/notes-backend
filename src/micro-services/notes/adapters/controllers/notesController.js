const { addNote } = require('../../application/use-cases/addNote');
const { findByProperty } = require('../../application/use-cases/findByProperty');
const { countAll } = require('../../application/use-cases/countAll');
const { findById } = require('../../application/use-cases/findById');
const { deleteById } = require('../../application/use-cases/deleteById');
const { updateById } = require('../../application/use-cases/updateById');

const notesController = (
  dbRepositoryInterface,
  dbRepositoryImpl,
  authServiceInterface,
  authServiceImpl,
  categoriesServiceInterface,
  categoriesServiceImpl,
) => {
  const dbRepository = dbRepositoryInterface(dbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const categoriesService = categoriesServiceInterface(categoriesServiceImpl());

  const fetchNotesByProperty = (req, res, next) => {
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
        response.notes = records;
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

  const fetchNoteById = (req, res, next) => {
    // get access token
    const { authorization } = req.headers;

    // get the user ID from the access token
    const userId = authService.getUserId(authorization);

    const { id } = req.params;
    findById(id, userId, dbRepository)
      .then((record) => res.json(record))
      .catch((error) => next(error));
  };

  const deleteNoteById = (req, res, next) => {
    const { id } = req.params;
    // get access token
    const { authorization } = req.headers;

    // get the user ID from the access token
    const userId = authService.getUserId(authorization);

    deleteById(id, dbRepository, userId)
      .then((record) => res.json(record))
      .catch((error) => next(error));
  };

  const updateNoteById = (req, res, next) => {
    const { title, category, tags } = req.body;
    const { id } = req.params;

    // get access token
    const { authorization } = req.headers;

    // get the user ID from the access token
    const userId = authService.getUserId(authorization);

    updateById(id, dbRepository, userId, title, category, tags)
      .then((record) => res.json(record))
      .catch((error) => next(error));
  };

  const addNewNote = (req, res, next) => {
    // Get json body values
    const { title, category, tags } = req.body;

    // get access token
    const { authorization } = req.headers;

    // get the user ID from the access token
    const userId = authService.getUserId(authorization);

    addNote(
      title,
      category,
      tags,
      userId,
      dbRepository,
      categoriesService,
      authorization,
    )
      .then((record) => res.json(record))
      .catch((error) => next(error));
  };

  return {
    fetchNotesByProperty,
    fetchNoteById,
    addNewNote,
    deleteNoteById,
    updateNoteById,
  };
};

module.exports = {
  notesController,
};
