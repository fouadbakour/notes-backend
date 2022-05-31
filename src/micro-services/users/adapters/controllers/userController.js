const { addUser } = require('../../application/use-cases/user/add');
const { findByProperty } = require('../../application/use-cases/user/findByProperty');
const { countAll } = require('../../application/use-cases/user/countAll');
const { findById } = require('../../application/use-cases/user/findById');

const userController = (
  userDbRepositoryInterface,
  userDbRepositoryImpl,
  authServiceInterface,
  authServiceImpl,
  mailerServiceInterface,
  mailerServiceImpl,
) => {
  const dbRepository = userDbRepositoryInterface(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const mailerService = mailerServiceInterface(mailerServiceImpl());

  const fetchUsersByProperty = (req, res, next) => {
    const params = {};
    const response = {};

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

    findByProperty(params, dbRepository)
      .then((users) => {
        response.users = users;
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

  const fetchUserById = (req, res, next) => {
    findById(req.params.id, dbRepository)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  const addNewUser = (req, res, next) => {
    const {
      password, email, createdAt,
    } = req.body;
    addUser(
      password,
      email,
      createdAt,
      dbRepository,
      authService,
      mailerService,
    )
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  return {
    fetchUsersByProperty,
    fetchUserById,
    addNewUser,
  };
};

module.exports = {
  userController,
};
