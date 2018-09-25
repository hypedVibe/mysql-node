const schemas = require('./validationSchemas');
const ResponseError = require('../errors/reponseError');

function validateReq (schema) {
  return (req, res, next)  => {
    schemas[schema].forEach((key) => {
      if (!req.body[key]) {
        throw new ResponseError(`Key ${key} is missing in request`, 400);
      }
    });
    
    return next();
  }
}

module.exports = validateReq;