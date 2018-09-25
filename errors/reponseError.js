function ResponseError (message, statusCode) {
  this.statusCode = statusCode || 500;
  this.message = message;
}

ResponseError.prototype = Object.create(Error.prototype);

module.exports = ResponseError;