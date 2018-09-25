const Router = require('express').Router();

const UserConroller = require('./user.controller');

const validateReq = require('../middleware/validateReq');

Router
  .post('/profile', validateReq('profile'), UserConroller.create);

module.exports = Router;