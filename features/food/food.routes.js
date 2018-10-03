const Router = require('express').Router();

const FoodController = require('./food.controller');

const validateReq = require('../../middleware/validateReq');

Router
  .post('/', validateReq('post_food'), FoodController.create)
  .get('/all', FoodController.getAll)
  .get('/:id', validateReq('get_food'), FoodController.get)
  .put('/:id', validateReq('put_food'), FoodController.update)
  .delete('/:id', validateReq('delete_food'), FoodController.delete)
  
  .get('/book/recipient/:recipientId', FoodController.getUsersBookedFood)
  .get('/book/:id/recipient/:recipientId', FoodController.book)
  .get('/book/cancel/:id/recipient/:recipientId', FoodController.cancelBook);

module.exports = Router;