const { authServiceImpl } = require('../../services/authServiceImpl');
const { authServiceInterface } = require('../../../application/services/authServiceInterface');

const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization');
  const authService = authServiceInterface(authServiceImpl());
  if (!token) {
    const error = new Error('No access token found');
    error.statusCode = 401;
    throw error;
  }
  if (token.split(' ')[0] !== 'Bearer') {
    const error = new Error('Invalid access token format');
    error.statusCode = 401;
    throw error;
  }
  try {
    const decoded = authService.verify(token.split(' ')[1]);
    req.user = decoded.user;
    next();
  } catch (err) {
    const error = new Error('Token is not valid');
    error.statusCode = 401;
    throw error;
  }
};

module.exports = {
  authMiddleware,
};
