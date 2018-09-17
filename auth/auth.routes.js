const Router = require('express').Router();

const AuthConroller = require('./auth.controller');

Router.post('/register', AuthConroller.register);

module.exports = Router;