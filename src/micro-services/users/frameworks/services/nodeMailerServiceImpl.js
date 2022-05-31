const nodemailer = require('nodemailer');
const { NODE_MAILER_USER, NODE_MAILER_PASSWORD } = require('../../config/nodemailerConfig');

const nodeMailerServiceImpl = () => {
  const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: NODE_MAILER_USER,
      pass: NODE_MAILER_PASSWORD,
    },
  });
  const sendWelcomeEmail = (targetEmail) => {
    transport.sendMail({
      from: NODE_MAILER_USER,
      to: targetEmail,
      subject: 'Welcome!',
      html: '<h1>Welcome to our notes app!</h1>',
    }).catch();
  };

  return {
    sendWelcomeEmail,
  };
};

module.exports = {
  nodeMailerServiceImpl,
};
