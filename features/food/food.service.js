const UserService = require('../user/user.service');

const ResponseError = require('../../errors/reponseError');

const { Food, BookedFood } = require('../../models/index');

exports.create = async (foodData, userId) => {
  await UserService.get(userId);
  foodData.userId = userId;
  const food = await Food.create(foodData);
  return food;
};

exports.update = async (foodData, foodId, userId) => {
  await UserService.get(userId);

  await exports.findUsersFood(foodId, userId);

  await Food.update(foodData, { where: { id: foodId } });

  const food = await exports.findUsersFood(foodId, userId);

  return food;
};

exports.findUsersFood = async (foodId, userId) => {
  const food = await Food.findOne({ where: { id: foodId, userId } });
  if (!food) {
    throw new ResponseError('Food of this user was not found', 404);
  }
  return food;
};

exports.get = async (foodId) => {
  const food = await Food.findOne({ where: { id: foodId } });
  if (!food) {
    throw new ResponseError(`Food with id ${foodId} wasn't found`, 400);
  }
  return food;
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
  await BookedFood.destroy({ where: { foodId, supplierId: userId } });
  await Food.destroy({ where: { id: foodId } });
  return food;
};

exports.getOneBookedFood = async (foodId, recipientId) => {
  const bookedFood = await BookedFood.findOne({ where: { foodId, recipientId } });
  return bookedFood;
};

exports.getUsersBookedFood = async (recipientId) => {
  const bookedFood = await BookedFood.findAll({ where: { recipientId } });
  if (bookedFood.length === 0) {
    return [];
  }
  const bookedFoodPromises = Promise.all(
    bookedFood.map(async (food) => {
      const usersFood = await Food.findOne({ where: { id: food.id } });
      return usersFood;
    }));
    
  return await bookedFoodPromises;
};

exports.bookFood = async (foodId, recipientId) => {
  const food = await exports.get(foodId);
  const bookedFood = await exports.getOneBookedFood(foodId, recipientId);
  if (bookedFood) {
    throw new ResponseError('This food was booked', 400);
  }
  await UserService.get(recipientId);

  await BookedFood.create({ foodId, recipientId, supplierId: food.userId });

  return food;
};

exports.cancelBook = async (foodId, recipientId) => {
  const food = await exports.get(foodId);
  const bookedFood = await exports.getOneBookedFood(foodId, recipientId);
  if (!bookedFood) {
    throw new ResponseError(`Food with id ${foodId} wasn't booked`, 400);
  }
  await BookedFood.destroy({ where: { foodId, recipientId } });
  return food;
};