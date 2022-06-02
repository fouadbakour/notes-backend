const { note } = require('../../entity/notesEntity');

// Private function
const prepareAndAdd = (
  title,
  category,
  tags,
  createdBy,
  repository,
) => {
  // Prepare new record object based on our entity
  const newNote = note(title, category, tags, createdBy);

  // If all the above are fine, query our repository to add it to our DB
  return repository.add(newNote).then((addedRecord) => {
    // Map
    const mapped = {
      id: addedRecord.id,
      title: addedRecord.title,
      category: addedRecord.category,
      tags: addedRecord.tags,
    };
    return mapped;
  }).catch((err) => {
    const error = new Error(err.message);
    error.statusCode = 400;
    throw error;
  });
};

// Public function
const addNote = (
  title,
  category,
  tags,
  createdBy,
  repository,
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
      .then(() => prepareAndAdd(
        title,
        category,
        tags,
        createdBy,
        repository,
      ))
      .catch((err) => {
        const error = new Error(err.message);
        error.statusCode = 404;
        throw error;
      });
  }
  return prepareAndAdd(
    title,
    category,
    tags,
    createdBy,
    repository,
  );
};

module.exports = {
  addNote,
};
