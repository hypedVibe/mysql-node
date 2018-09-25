const User = require('../models/index').User;

exports.createProfile = async (userData) => {
  const profile = await User.create(userData);
  return profile;
};

exports.updateProfile = async (userId, userData) => {
  await User.update(userData, { where: { id: userId } });
  const profile = await User.findOne({ where: { id: userId } });
  return profile;
}

exports.getProfile = async (userId) => {
  const profile = await User.findOne({ where: { id: userId } });
  return profile;
}