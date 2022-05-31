const { user } = require('../../../entity/userEntity');

// eslint-disable-next-line max-len
// TODO: -  check the injected userRepository type, are the userRepository, authService from application or framework ?
const addUser = (
  username,
  password,
  email,
  role,
  createdAt,
  userRepository,
  authService,
) => {
  // Validate incoming values
  if (!username || !password || !email) {
    throw new Error('username, password and email fields cannot be empty');
  }

  // Prepare new user object based on our entity
  const newUser = user(
    username,
    authService.encryptPassword(password),
    email,
    role,
    createdAt,
  );

  // Validate if the user is already exits in our DB, step 1
  return userRepository
    .findByProperty({ username })
    .then((userWithUsername) => {
      if (userWithUsername.length) {
        throw new Error(`User with username: ${username} already exists`);
      }
      return userRepository.findByProperty({ email });
    })
    .then((userWithEmail) => {
      // Validate if the user is already exits in our DB, step 1
      if (userWithEmail.length) {
        throw new Error(`User with email: ${email} already exists`);
      }
      // If all the above are fine, query our repository to add it to our DB
      return userRepository.add(newUser);
    });
};

module.exports = {
  addUser,
};
