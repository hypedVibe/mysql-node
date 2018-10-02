const schemas = require('./validationSchemas');
const ResponseError = require('../errors/reponseError');

function validation (schema, reqData) {
  if (schemas[schema].required) {
    schemas[schema].required.forEach((key) => {
      if (!reqData[key]) {
        throw new ResponseError(`Key '${key}' is missing in request`, 400);
      }
    });
  }

  if (schemas[schema].notAllowed) {
    schemas[schema].notAllowed.forEach((key) => {
      if (reqData[key]) {
        throw new ResponseError(`Key '${key}' is not allowed`, 400);
      }
    });
  }
}

function validateReq (schema) {
  return (req, res, next) => {
    validation(schema, {...req.body, ...req.params, ...req.query});
    return next();
  };
}

module.exports = validateReq;