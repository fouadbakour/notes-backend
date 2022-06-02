const findById = (id, userId, repository) => repository.findById(id).then((record) => {
  // Check if its my category
  if (record.createdBy !== userId) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  // Map
  const payload = {
    id: record.id,
    title: record.title,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
  return payload;
}).catch(() => {
  const error = new Error('Category not found');
  error.statusCode = 404;
  throw error;
});
module.exports = {
  findById,
};
