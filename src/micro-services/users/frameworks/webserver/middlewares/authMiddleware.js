const authServiceImpl = require('../../services/authServiceImpl');
const authServiceInterface = require('../../../application/services/nodeMailerServiceInterface');

const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization');
  const authService = authServiceInterface(authServiceImpl());
  if (!token) {
    throw new Error('No access token found');
  }
  if (token.split(' ')[0] !== 'Bearer') {
    throw new Error('Invalid access token format');
  }
  try {
    const decoded = authService.verify(token.split(' ')[1]);
    req.user = decoded.user;
    next();
  } catch (err) {
    throw new Error('Token is not valid');
  }
};

module.exports = {
  authMiddleware,
};
