const { category } = require('../../entity/categoryEntity');

const addCategory = (
  title,
  createdAt,
  authorization,
  categoriesRepository,
  authService,
) => {
  // Validate incoming values
  if (!title) {
    throw new Error('title field cannot be empty');
  }
  // get the user ID from the access token
  const userId = authService.getUserId(authorization);

  // Prepare new record object based on our entity
  const newCategory = category(title, createdAt, userId);

  // Validate if the record is already exits in our DB, step 1
  return categoriesRepository
    .findByProperty({ title })
    .then((matchingRecord) => {
      if (matchingRecord.length) {
        throw new Error(`Category with title: ${title} already exists`);
      }
      // If all the above are fine, query our repository to add it to our DB
      return categoriesRepository.add(newCategory).then((addedCategory) => {
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
