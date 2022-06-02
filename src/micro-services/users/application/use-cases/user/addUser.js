const { user } = require('../../../entity/userEntity');

const addUser = (
  password,
  email,
  createdAt,
  repository,
  authServiceInterface,
  mailerServiceInterface,
) => {
  // Validate incoming values
  if (!password || !email) {
    throw new Error('password and email fields cannot be empty');
  }

  // Prepare new user object based on our entity
  const newUser = user(
    authServiceInterface.encryptPassword(password),
    email,
    createdAt,
  );

  // Validate if the user is already exits in our DB, step 1
  return repository
    .findByProperty({ email })
    .then((userWithEmail) => {
      if (userWithEmail.length) {
        throw new Error(`User with email: ${email} already exists`);
      }

      // If all the above are fine, query our repository to add it to our DB
      return repository.add(newUser).then((addedUser) => {
        // Send welcome email!
        mailerServiceInterface.sendWelcomeEmail(addedUser.email);

        // Build payload to generate a token
        const payloadForToken = {
          user: {
            id: addedUser.id,
          },
        };

        // Map
        const mapped = {
          id: addedUser.id,
          email: addedUser.email,
          token: authServiceInterface.generateToken(payloadForToken),
        };

        return mapped;
      }).catch((err) => {
        throw new Error(err.message);
      });
    });
};

module.exports = {
  addUser,
};
