const { user } = require('../../../entity/userEntity');

const addUser = (
  password,
  email,
  createdAt,
  userRepository,
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
  return userRepository
    .findByProperty({ email })
    .then((userWithEmail) => {
      if (userWithEmail.length) {
        throw new Error(`User with email: ${email} already exists`);
      }

      // If all the above are fine, query our repository to add it to our DB
      return userRepository.add(newUser).then((addedUser) => {
        // Send welcome email!
        mailerServiceInterface.sendWelcomeEmail(addedUser.email);

        // Build payload to generate a token
        const payloadForToken = {
          user: {
            id: addedUser.id,
          },
        };

        // Build the final payload
        const payload = {
          id: addedUser.id,
          email: addedUser.email,
          token: authServiceInterface.generateToken(payloadForToken),
        };

        return payload;
      }).catch(() => {
        throw new Error('Unable to add new user');
      });
    });
};

module.exports = {
  addUser,
};
