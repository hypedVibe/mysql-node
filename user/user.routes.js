const Router = require('express').Router();

const UserConroller = require('./user.controller');

const validateReq = require('../middleware/validateReq');

Router
  .post('/profile', validateReq('post_profile'), UserConroller.create)
  .put('/profile/:id', validateReq('put_profile'), UserConroller.update)
  .get('/profile/:id', UserConroller.get);

module.exports = Router;