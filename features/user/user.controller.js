const UserService = require('./user.service');

exports.create = async (req, res, next) => {
  try {
    const profile = await UserService.create(req.body);
    res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const profile = await UserService.update(req.params.id, req.body);
    res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const profile = await UserService.get(req.params.id);
    res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const profile = await UserService.delete(req.params.id);
    res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
};