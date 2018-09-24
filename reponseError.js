exports.createError = function (message, statusCode) {
  this.statusCode = statusCode;
  this.message = message;
  return Error.call(this);
}