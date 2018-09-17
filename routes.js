const Router = require('express').Router();

const AuthRoutes = require('./auth/auth.routes');

Router.use(AuthRoutes);

module.exports = Router;