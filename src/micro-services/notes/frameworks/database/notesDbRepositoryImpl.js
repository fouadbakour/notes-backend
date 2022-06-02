const NoteModel = require('./notesModel');

// move it to a proper place
function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

const notesDbRepositoryImpl = () => {
  // mongoose query function to find a record by a givin property
  const findByProperty = (params) => NoteModel.find(omit(params, 'page', 'perPage'))
    .skip(params.perPage * params.page - params.perPage)
    .limit(params.perPage)
    .sort({ updatedAt: 'descending' });

  // mongoose query function to count all records
  const countAll = (params) => NoteModel.countDocuments(omit(params, 'page', 'perPage'));

  // mongoose query function to find record by document ID
  const findById = (id) => NoteModel.findById(id);

  // mongoose query function to find record by document ID and remove it
  const deleteById = (id) => NoteModel.findByIdAndRemove(id);

  // mongoose query function to edit a record by document ID
  const updateById = (
    id,
    title,
    category,
    tags,
  ) => NoteModel.findByIdAndUpdate(id, { title, category, tags });

  // mongoose query function to add new record
  const add = (entity) => {
    const newRecord = new NoteModel({
      title: entity.getTitle(),
      category: entity.getCategory(),
      tags: entity.getTags(),
      createdBy: entity.getCreatedBy(),
    });
    return newRecord.save();
  };

  return {
    findByProperty,
    countAll,
    findById,
    add,
    deleteById,
    updateById,
  };
};

module.exports = {
  notesDbRepositoryImpl,
};
