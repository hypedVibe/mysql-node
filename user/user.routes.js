const Router = require('express').Router();

const UserConroller = require('./user.controller');

Router
  .post('/createprofile', UserConroller.create);

module.exports = Router;