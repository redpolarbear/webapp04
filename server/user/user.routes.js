'use strict';

var express = require('express');
var router = express.Router();

var userController = require('./user.controller.js');
var middleware = require('./../middleware/authenticate');

// base route: /api/user
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.delete('/logout', middleware.authenticate, userController.logoutUser);
// router.delete('/login', middleware.requireAuthentication, usersController.logoutUser);

module.exports = router;