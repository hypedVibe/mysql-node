const UserService = require('./user.service');

exports.create = async (req, res, next) => {
  try {
    const profile = await UserService.createProfile(req.body);

    res.status(200).json({ profile });
  } catch (err) {
    console.log('$$$$$$$$$$')
    next(err)
  }
};