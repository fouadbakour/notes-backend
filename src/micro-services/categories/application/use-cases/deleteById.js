const deleteById = (id, repository, userId) => repository
  .findByProperty({ createdBy: userId, _id: id })
  .then((matchingRecord) => {
    if (matchingRecord.length) {
      // We found the created record by the same user, delete
      return repository.deleteById(id).then(() => ({ message: 'deleted' }));
    }
    throw new Error('You are not allowed delete to delete this record');
  });
module.exports = {
  deleteById,
};
