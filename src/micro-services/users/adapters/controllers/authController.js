const { login } = require('../../application/use-cases/auth/login');

const authController = (
  userDbRepositoryInterface,
  userDbRepositoryImpl,
  authServiceInterface,
  authServiceImpl,
) => {
  const dbRepository = userDbRepositoryInterface(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const loginUser = (req, res, next) => {
    const { email, password } = req.body;
    login(email, password, dbRepository, authService)
      .then((token) => res.json(token))
      .catch((err) => next(err));
  };
  return {
    loginUser,
  };
};

module.exports = {
  authController,
};
