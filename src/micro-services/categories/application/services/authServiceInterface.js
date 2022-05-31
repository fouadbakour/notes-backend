const authServiceInterface = (service) => {
  const verify = (token) => service.verify(token);
  return {
    verify,
  };
};

module.exports = {
  authServiceInterface,
};
