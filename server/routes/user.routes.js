'use strict';

var express = require('express');
var router = express.Router();

var userController = require('./../controllers/user.controller');
var middleware = require('./../middleware/authenticate');

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
// router.delete('/login', middleware.requireAuthentication, usersController.logoutUser);

module.exports = router;