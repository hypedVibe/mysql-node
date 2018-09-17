exports.errorHandling = (err, req, res, next) => {
  console.error(err);
  if (!err.statusCode) {
    err.statusCode = 500;
  }

  res.status(err.statusCode).json({ error: err });
  next(err);
};
