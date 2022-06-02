const utilsInterface = (service) => {
  const containsDuplicates = (array) => service.containsDuplicates(array);
  return {
    containsDuplicates,
  };
};

module.exports = {
  utilsInterface,
};
