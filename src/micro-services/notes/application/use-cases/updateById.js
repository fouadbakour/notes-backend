// Private function
const prepareAndUpdate = (
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
    const error = new Error('You are not allowed to edit this record');
    error.statusCode = 403;
    throw error;
  }).catch(() => {
    const error = new Error('Note not found');
    error.statusCode = 404;
    throw error;
  });

// Public function
const updateById = (
  id,
  repository,
  userId,
  title,
  category,
  tags,
  categoriesService,
  authorization,
  utils,
) => {
  // Validate incoming values
  if (!title) {
    const error = new Error('title field cannot be empty');
    error.statusCode = 400;
    throw error;
  }
  // Validate incoming values
  if (tags) {
    if (utils.containsDuplicates(tags) === true) {
      const error = new Error('Duplicate tags are not allowed.');
      error.statusCode = 400;
      throw error;
    }
  }
  // Check if we have a category
  if (category) {
    // Check if the category ID is already exists
    const request = { params: { id: category }, header: { authorization } };
    return categoriesService.validateCategoryExistence(request)
      .then(() => prepareAndUpdate(
        id,
        repository,
        userId,
        title,
        category,
        tags,
      ))
      .catch((err) => {
        const error = new Error(err.message);
        error.statusCode = 400;
        throw error;
      });
  }
  return prepareAndUpdate(
    id,
    repository,
    userId,
    title,
    category,
    tags,
  );
};
module.exports = {
  updateById,
};
