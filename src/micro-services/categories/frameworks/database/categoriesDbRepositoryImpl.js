const CategoryModel = require('./categoryModel');

// move it to a proper place
function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

const categoriesDbRepositoryImpl = () => {
  // mongoose query function to find a record by a givin property
  const findByProperty = (params, createdBy) => CategoryModel.find(omit(params, 'page', 'perPage'))
    .skip(params.perPage * params.page - params.perPage)
    .limit(params.perPage);

  // mongoose query function to count all records
  const countAll = (params) => CategoryModel.countDocuments(omit(params, 'page', 'perPage'));

  // mongoose query function to find record by document ID
  const findById = (id) => CategoryModel.findById(id);

  // mongoose query function to find record by document ID and remove it
  const deleteById = (id) => CategoryModel.findByIdAndRemove(id);

  // mongoose query function to edit a record by document ID
  const updateById = (id, newTitle) => CategoryModel.findByIdAndUpdate(id, { title: newTitle });

  // mongoose query function to add new record
  const add = (entity) => {
    const newRecord = new CategoryModel({
      title: entity.getTitle(),
      createdAt: new Date(),
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
  categoriesDbRepositoryImpl,
};
