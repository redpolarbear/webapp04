'use strict';

var express = require('express');
var router = express.Router();

var userProfileController = require('./../controllers/userprofile.controller');
var middleware = require('./../middleware/authenticate');

router.use(middleware.authenticate);
router.patch('/', userProfileController.patchUserProfile);

module.exports = router;