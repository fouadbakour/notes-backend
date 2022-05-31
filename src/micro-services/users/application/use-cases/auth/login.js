// eslint-disable-next-line max-len
// TODO: -  check the injected userRepository type, are the userRepository, authService from application or framework ?
const login = (email, password, userRepository, authService) => {
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
    const isMatch = authService.compare(password, targetUser.password);
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
      username: targetUser.username,
      email: targetUser.email,
      role: targetUser.role,
      token: authService.generateToken(payloadForToken),
    };

    // Generate token and return
    return payload;
  });
};
module.exports = {
  login,
};
