const findByProperty = (params, userRepository) => userRepository.findByProperty(params);
module.exports = {
  findByProperty,
};
