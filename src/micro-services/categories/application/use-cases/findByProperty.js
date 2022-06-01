const findByProperty = (params, repository, authorization, authService) => {
  // get the user ID from the access token
  const userId = authService.getUserId(authorization);
  return repository.findByProperty(params, userId).then((array) => {
    // Map
    const mapped = array.map((record) => {
      const payload = {
        id: record.id,
        title: record.title,
        createdAt: record.createdAt,
        createdBy: record.createdBy,
      };
      return payload;
    });
    return mapped;
  });
};
module.exports = {
  findByProperty,
};
