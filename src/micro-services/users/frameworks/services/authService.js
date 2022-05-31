const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../../config/config');

const authServiceImpl = () => {
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const compare = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

  const verify = (token) => jwt.verify(token, JWT_SECRET);

  const generateToken = (payload) => jwt.sign(payload, JWT_SECRET, {
    expiresIn: 360000,
  });

  return {
    encryptPassword,
    compare,
    verify,
    generateToken,
  };
};

module.exports = {
  authServiceImpl,
};
