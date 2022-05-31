// eslint-disable-next-line max-len
const login = (email, password, userRepository, authServiceInterface) => {
  if (!email || !password) {
    const error = new Error('email and password fields cannot be empty');
    error.statusCode = 401;
    throw error;
  }
  return userRepository.findByProperty({ email }).then((user) => {
    // Check at least if we have a user
    if (!user.length) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // Validate the target user's password
    const targetUser = user[0];
    const isMatch = authServiceInterface.compare(password, targetUser.password);
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // Build payload to generate a token
    const payloadForToken = {
      user: {
        id: targetUser.id,
      },
    };

    // Build the final payload
    const payload = {
      id: targetUser.id,
      email: targetUser.email,
      token: authServiceInterface.generateToken(payloadForToken),
    };

    // Generate token and return
    return payload;
  });
};
module.exports = {
  login,
};
