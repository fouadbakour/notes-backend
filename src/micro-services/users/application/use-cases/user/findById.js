const findById = (id, userRepository) => userRepository.findById(id).then((user) => {
  // Build the final payload
  const payload = {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  };

  return payload;
});

module.exports = {
  findById,
};
