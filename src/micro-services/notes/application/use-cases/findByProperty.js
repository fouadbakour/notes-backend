const findByProperty = (params, repository) => repository.findByProperty(params)
  .then((array) => {
    // Map
    const mapped = array.map((record) => {
      const payload = {
        id: record.id,
        title: record.title,
        category: record.category,
        tags: record.tags,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      };
      return payload;
    });
    return mapped;
  });
module.exports = {
  findByProperty,
};
