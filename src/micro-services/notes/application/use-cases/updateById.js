const updateById = (
  id,
  repository,
  userId,
  title,
  category,
  tags,
) => repository
  .findByProperty({ createdBy: userId, _id: id })
  .then((matchingRecord) => {
    if (matchingRecord.length) {
      // Perform update!
      return repository.updateById(
        id,
        title || matchingRecord.title,
        category || matchingRecord.category,
        tags || matchingRecord.tags,
      ).then(() => ({ message: 'updated' }));
    }
    throw new Error('You are not allowed to edit this record');
  }).catch(() => {
    throw new Error('Note not found');
  });
module.exports = {
  updateById,
};
