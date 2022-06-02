const axios = require('axios');
const { CATEGORIES_SERVICE } = require('../../config/config');

const categoriesServiceInterImpl = () => {
  // GET {BASE_URL}/api/v1/categories/{categoryId}
  const validateCategoryExistence = (req) => {
    const { id } = req.params;
    const { authorization } = req.header;
    const url = `${CATEGORIES_SERVICE}/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: authorization,
      },
    }).then((record) => {
      const { data } = record;
      return data;
    }).catch((err) => {
      const { message } = err.response.data;
      throw new Error(message);
    });
  };
  return {
    validateCategoryExistence,
  };
};

module.exports = {
  categoriesServiceInterImpl,
};
