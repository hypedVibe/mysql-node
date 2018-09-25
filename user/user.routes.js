const Router = require('express').Router();

const UserConroller = require('./user.controller');

Router
  .post('/profile', UserConroller.create);

module.exports = Router;