const categoriesServiceInterface = (service) => {
  const validateCategoryExistence = (req) => service.validateCategoryExistence(req);
  return {
    validateCategoryExistence,
  };
};

module.exports = {
  categoriesServiceInterface,
};
