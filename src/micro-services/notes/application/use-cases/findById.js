const findById = (id, userId, repository) => repository.findById(id).then((record) => {
  // Check if its my category
  if (record.createdBy !== userId) {
    throw new Error('Note not found');
  }
  // Map
  const payload = {
    id: record.id,
    title: record.title,
    category: record.category,
    tags: record.tags,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
  return payload;
}).catch(() => {
  throw new Error('Note not found');
});
module.exports = {
  findById,
};
