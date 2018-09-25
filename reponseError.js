function ResponseError (message, statusCode) {
  this.statusCode = statusCode;
  this.message = message;
}

ResponseError.prototype = Object.create(Error.prototype);

module.exports = ResponseError;