const Router = require('express').Router();
const errorHandling = require('./middleware/errorHandling').errorHandling;

const UserRoutes = require('./user/user.routes');

Router.use('/user', UserRoutes);
Router.use(errorHandling);


module.exports = Router;