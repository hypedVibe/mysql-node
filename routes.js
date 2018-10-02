const Router = require('express').Router();
const errorHandling = require('./middleware/errorHandling').errorHandling;

const UserRoutes = require('./features/user/user.routes');
const FoodRoutes = require('./features/food/food.routes');

Router.use('/user', UserRoutes);
Router.use('/food', FoodRoutes);

Router.use(errorHandling);


module.exports = Router;