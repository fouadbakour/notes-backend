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
    throw new Error(err.message);
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
) => {
  // Validate incoming values
  if (!title) {
    throw new Error('title field cannot be empty');
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
        throw new Error(err.message);
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
