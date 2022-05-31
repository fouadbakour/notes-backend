const findById = (id, userRepository) => userRepository.findById(id);

module.exports = {
  findById,
};
