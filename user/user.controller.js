const UserService = require('./user.service');

exports.create = async (req, res, next) => {
  try {
    const profile = await UserService.createProfile(req.body);
    res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const profile = await UserService.updateProfile(req.params.id, req.body);
    res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const profile = await UserService.getProfile(req.params.id);
    res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
};