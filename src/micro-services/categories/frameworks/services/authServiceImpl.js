const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/config');

const authServiceImpl = () => {
  const verify = (token) => jwt.verify(token, JWT_SECRET);
  return {
    verify,
  };
};

module.exports = {
  authServiceImpl,
};
