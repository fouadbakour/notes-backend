const findByProperty = (params, repository) => repository.findByProperty(params)
  .then((array) => {
    // Map
    const mapped = array.map((record) => {
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
