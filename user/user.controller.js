const UserService = require('./user.service');

exports.create = async (req, res, next) => {
  try {
    UserService.smth()

    res.status(200).json({})
  } catch (err) {
    next(err)
  }
};