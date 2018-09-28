const Router = require('express').Router();

const FoodController = require('./food.controller');

const validateReq = require('../../middleware/validateReq');

// TODO: test routes
Router
  .post('/', validateReq('post_food'), FoodController.create)
  .get('/:id', FoodController.get)
  .get('/all', FoodController.get)
  .put('/:id', validateReq('put_food'), FoodController.update)
  .delete('/:id', FoodController.delete);

module.exports = Router;