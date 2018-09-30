const Router = require('express').Router();

const FoodController = require('./food.controller');

const validateReq = require('../../middleware/validateReq');

// TODO: test routes
Router
  .post('/', validateReq('post_food'), FoodController.create)
  .get('/all', FoodController.getAll)
  .get('/:id', validateReq('get_food'), FoodController.get)
  .put('/:id', validateReq('put_food'), FoodController.update)
  .delete('/:id', validateReq('delete_food'), FoodController.delete);

module.exports = Router;