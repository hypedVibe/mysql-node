/* eslint-disable no-console */

exports.errorHandling = (err, req, res, next) => {
  if (err) {
    console.error(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    return res.status(err.statusCode).json({ error: err.message });
  }
  next();
};
