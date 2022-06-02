const authServiceInterface = (service) => {
  const verify = (token) => service.verify(token);
  const getUserId = (token) => service.getUserId(token);
  return {
    verify,
    getUserId,
  };
};

module.exports = {
  authServiceInterface,
};
