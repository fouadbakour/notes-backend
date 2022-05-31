const findByProperty = (params, userRepository) => userRepository.findByProperty(params)
  .then((usersArray) => {
    // Map users
    const mapped = usersArray.map((user) => {
      const payload = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      };
      return payload;
    });
    return mapped;
  });
module.exports = {
  findByProperty,
};
