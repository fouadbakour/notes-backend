const { category } = require('../../entity/categoryEntity');

const addCategory = (
  titleToAdd,
  repository,
  userId,
) => {
  // Validate incoming values
  if (!titleToAdd) {
    const error = new Error('title field cannot be empty');
    error.statusCode = 400;
    throw error;
  }

  // Validate if the record is already exits in our DB
  // Query to find records that contains same title created by the same user
  return repository
    .findByProperty({ title: titleToAdd, createdBy: userId })
    .then((matchingRecord) => {
      if (matchingRecord.length) {
        const error = new Error(`Category with title: ${titleToAdd} already exists`);
        error.statusCode = 403;
        throw error;
      }

      // Prepare new record object based on our entity
      const newCategory = category(titleToAdd, userId);

      // If all the above are fine, query our repository to add it to our DB
      return repository.add(newCategory).then((addedCategory) => {
        // Map
        const mapped = {
          id: addedCategory.id,
          title: addedCategory.title,
        };
        return mapped;
      }).catch((err) => {
        const error = new Error(err.message);
        error.statusCode = 400;
        throw error;
      });
    });
};

module.exports = {
  addCategory,
};
