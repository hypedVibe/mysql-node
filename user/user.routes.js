const Router = require('express').Router();

const UserController = require('./user.controller');

const validateReq = require('../middleware/validateReq');

Router
  .post('/profile', validateReq('post_profile'), UserController.create)
  .put('/profile/:id', validateReq('put_profile'), UserController.update)
  .get('/profile/:id', UserController.get)
  .delete('/profile/:id', UserController.delete);

module.exports = Router;