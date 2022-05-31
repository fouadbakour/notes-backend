const categoriesDbRepositoryInterface = (repository) => {
  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (record) => repository.add(record);
  const deleteById = (id) => repository.deleteById(id);
  const updateById = (id, title) => repository.updateById(id, title);

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
  categoriesDbRepositoryInterface,
};
