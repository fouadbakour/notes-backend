const { note } = require('../../entity/notesEntity');

const addNote = (
  title,
  category,
  tags,
  createdBy,
  repository,
) => {
  // Validate incoming values
  if (!title) {
    throw new Error('title field cannot be empty');
  }

  // Check if we have a category
  if (category) {
    // Check if the category ID is already exists
    console.log('>>>>> category', category);
  }
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

module.exports = {
  addNote,
};
