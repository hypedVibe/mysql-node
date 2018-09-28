const User = require('../../models/index').User;

const ResponseError = require('../../errors/reponseError');

exports.create = async (userData) => {
  const profile = await User.create(userData);
  return profile;
};

exports.update = async (userId, userData) => {
  await User.update(userData, { where: { id: userId } });
  const profile = await exports.getProfile(userId);
  return profile;
};

exports.get = async (userId) => {
  const profile = await User.findOne({ where: { id: userId } });
  if (!profile) {
    throw new ResponseError(`User with ${userId} id wasn't found`, 404);
  }
  return profile;
};

exports.delete = async (userId) => {
  const profile = await exports.getProfile(userId);
  await User.destroy({ where: { id: userId } });
  return profile;
};