const utilsImpl = () => {
  const containsDuplicates = (array) => {
    const result = array.some((element) => {
      if (array.indexOf(element) !== array.lastIndexOf(element)) {
        return true;
      }
      return false;
    });
    return result;
  };
  return {
    containsDuplicates,
  };
};

module.exports = {
  utilsImpl,
};
