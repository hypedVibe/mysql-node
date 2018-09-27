const User = require('../models/index').User;

const ResponseError = require('../errors/reponseError');

exports.createProfile = async (userData) => {
  const profile = await User.create(userData);
  return profile;
};

exports.updateProfile = async (userId, userData) => {
  const profile = await exports.getProfile(userId);
  await User.update(userData, { where: { id: userId } });
  return profile;
};

exports.getProfile = async (userId) => {
  const profile = await User.findOne({ where: { id: userId } });
  if (!profile) {
    throw new ResponseError(`User with ${userId} id wasn't found`, 404);
  }
  return profile;
};

exports.deleteProfile = async (userId) => {
  const profile = await exports.getProfile(userId);
  await User.destroy({ where: { id: userId } });
  return profile;
};