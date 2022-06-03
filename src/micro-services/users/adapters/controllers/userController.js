const { addUser } = require('../../application/use-cases/user/addUser');

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
    addNewUser,
  };
};

module.exports = {
  userController,
};
