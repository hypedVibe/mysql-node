const UserService = require('../user/user.service');

const ResponseError = require('../../errors/reponseError');

const Food = require('../../models/index').Food;

exports.create = async (foodData, userId) => {
  await UserService.get(userId);
  foodData.userId = Number(userId);
  const food = await Food.create(foodData);
  return food;
};

exports.update = async (foodData, foodId, userId) => {
  await UserService.get(userId);

  await Food.update(foodData, { where: { id: foodId } });

  const food = await exports.findUsersFood(foodId, userId);

  return food;
};

exports.findUsersFood = async (foodId, userId) => {
  const foods = await Food.findAll({ where: { id: foodId, userId } });
  if (foods.length === 0) {
    throw new ResponseError('Food of this user was not found', 404);
  }
  return foods;
};

exports.findAllFood = async (userId) => {
  const query = { where: {} };
  if (userId) {
    query.where.userId = userId;
  }
  const foods = await Food.findAll(query);
  return foods;
};

exports.delete = async (foodId, userId) => {
  const food = await exports.findUsersFood(foodId, userId);
  await Food.destroy({ where: { id: foodId } });
  return food;
};