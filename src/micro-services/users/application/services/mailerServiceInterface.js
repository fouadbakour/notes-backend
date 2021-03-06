const mailerServiceInterface = (service) => {
  const sendWelcomeEmail = (targetEmail) => {
    service.sendWelcomeEmail(targetEmail);
  };

  return {
    sendWelcomeEmail,
  };
};

module.exports = {
  mailerServiceInterface,
};
