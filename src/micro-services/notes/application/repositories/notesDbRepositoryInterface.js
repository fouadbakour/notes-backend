const notesDbRepositoryInterface = (repository) => {
  const findByProperty = (params, createdBy) => repository.findByProperty(params, createdBy);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (record) => repository.add(record);
  const deleteById = (id) => repository.deleteById(id);
  const updateById = (
    id,
    title,
    category,
    tags,
  ) => repository.updateById(id, title, category, tags);

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
  notesDbRepositoryInterface,
};
