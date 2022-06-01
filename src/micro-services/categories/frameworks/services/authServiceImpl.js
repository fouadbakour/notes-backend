const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/config');

const authServiceImpl = () => {
  const verify = (token) => jwt.verify(token, JWT_SECRET);
  const getUserId = (token) => {
    const cleanToken = token.split(' ')[1];
    return jwt.verify(cleanToken, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        throw new Error(err);
      } else {
        const { id } = decodedToken.user;
        return id;
      }
    });
  };
  return {
    verify,
    getUserId,
  };
};

module.exports = {
  authServiceImpl,
};
