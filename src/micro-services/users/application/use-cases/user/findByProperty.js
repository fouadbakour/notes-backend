const findByProperty = (params, repository) => repository.findByProperty(params)
  .then((arrau) => {
    // Map users
    const mapped = arrau.map((record) => {
      const payload = {
        id: record.id,
        email: record.email,
        createdAt: record.createdAt,
      };
      return payload;
    });
    return mapped;
  });
module.exports = {
  findByProperty,
};
