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
    throw new Error('You are not allowed to edit this record');
  }).catch(() => {
    throw new Error('Note not found');
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
    throw new Error('title field cannot be empty');
  }
  // Validate incoming values
  if (tags) {
    if (utils.containsDuplicates(tags) === true) {
      throw new Error('Duplicate tags are not allowed.');
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
        throw new Error(err.message);
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
