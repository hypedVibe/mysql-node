const UserService = require('./user.service');

exports.create = async (req, res, next) => {
  try {
    const profile = UserService.createProfile(req.body);

    res.status(200).json({ profile });
  } catch (err) {
    next(err)
  }
};