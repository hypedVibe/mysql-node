const responseError = require('../reponseError').createError;

exports.smth = () => {
  // TODO: extend error obj so it contains status code
  const e = new Error('omg')
  e.statusCode = 403;
  throw e
}