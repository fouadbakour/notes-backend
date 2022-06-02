const updateById = (id, repository, userId, titleToChange) => repository
  .findByProperty({ createdBy: userId, _id: id })
  .then((matchingRecord) => {
    if (matchingRecord.length) {
      // We found a record, now lets see if the other records contains the
      // same new title are are trying to add, if we found, throw error.
      return repository.findByProperty({ title: titleToChange }).then((matchingTitleRecord) => {
        if (matchingTitleRecord.length) {
          throw new Error(`Category with title: ${titleToChange} already exists`);
        }
        // Perform update!
        return repository.updateById(id, titleToChange).then(() => ({ message: 'updated' }));
      });
    }
    throw new Error('You are not allowed to edit this record');
  });
module.exports = {
  updateById,
};
