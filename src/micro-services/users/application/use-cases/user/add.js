const { user } = require('../../../entity/userEntity');

const addUser = (
  password,
  email,
  createdAt,
  userRepository,
  authService,
  nodeMailerServiceInterface,
) => {
  // Validate incoming values
  if (!password || !email) {
    throw new Error('password and email fields cannot be empty');
  }

  // Prepare new user object based on our entity
  const newUser = user(
    authService.encryptPassword(password),
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

      // Send welcome email!
      nodeMailerServiceInterface.sendWelcomeEmail(newUser.getEmail());

      // If all the above are fine, query our repository to add it to our DB
      return userRepository.add(newUser);
    });
};

module.exports = {
  addUser,
};
