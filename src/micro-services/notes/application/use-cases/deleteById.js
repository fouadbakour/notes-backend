const deleteById = (id, repository, userId) => repository
  .findByProperty({ createdBy: userId, _id: id })
  .then((matchingRecord) => {
    if (matchingRecord.length) {
      // We found the created record by the same user, delete
      return repository.deleteById(id).then(() => ({ message: 'deleted' }));
    }
    const error = new Error('You are not allowed to delete this record');
    error.statusCode = 403;
    throw error;
  }).catch(() => {
    const error = new Error('Note not found');
    error.statusCode = 404;
    throw error;
  });
module.exports = {
  deleteById,
};
