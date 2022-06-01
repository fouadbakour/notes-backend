const { category } = require('../../entity/categoryEntity');

const addCategory = (
  titleToAdd,
  createdAt,
  repository,
  userId,
) => {
  // Validate incoming values
  if (!titleToAdd) {
    throw new Error('title field cannot be empty');
  }

  // Validate if the record is already exits in our DB
  // Query to find records that contains same title created by the same user
  return repository
    .findByProperty({ title: titleToAdd, createdBy: userId })
    .then((matchingRecord) => {
      if (matchingRecord.length) {
        throw new Error(`Category with title: ${titleToAdd} already exists`);
      }

      // Prepare new record object based on our entity
      const newCategory = category(titleToAdd, createdAt, userId);

      // If all the above are fine, query our repository to add it to our DB
      return repository.add(newCategory).then((addedCategory) => {
        // Map
        const mapped = {
          id: addedCategory.id,
          title: addedCategory.title,
          createdBy: addedCategory.createdBy,
        };
        return mapped;
      }).catch((err) => {
        throw new Error(err.message);
      });
    });
};

module.exports = {
  addCategory,
};
