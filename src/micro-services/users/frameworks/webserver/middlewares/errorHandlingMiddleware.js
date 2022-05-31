/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
const errorHandlingMiddleware = (err, req, res, next) => {
  console.log('>>>> icoming error', err.statusCode);
  err.statusCode = err.statusCode || 404;
  return err.customMessage || err.message
    ? res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.customMessage || err.message,
    })
    : res.status(err.statusCode).json({ status: err.statusCode, message: err });
};

module.exports = {
  errorHandlingMiddleware,
};
