const FoodService = require('./food.service');

exports.create = async (req, res, next) => {
  try {
    const food = await FoodService.create(req.body, req.query.userId);
    res.status(200).json({ food });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const food = await FoodService.update(req.body, req.params.id, req.query.userId);
    res.status(200).json({ food });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const food = await FoodService.findUsersFood(req.params.id, req.query.userId);
    res.status(200).json({ food });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const food = await FoodService.findAllFood(req.query.userId);
    res.status(200).json({ food });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const food = await FoodService.delete(req.params.id, req.query.userId);
    res.status(200).json({ food });
  } catch (err) {
    next(err);
  }
};

exports.book = async (req, res, next) => {
  try {
    const bookedFood = await FoodService.bookFood(req.params.id, req.params.userId);
    res.status(200).json({ bookedFood });
  } catch (err) {
    next(err);
  }
};