'use strict';

var express = require('express');
var router = express.Router();

var userProfileController = require('./userprofile.controller.js');
var middleware = require('./../middleware/authenticate');

router.use(middleware.authenticate);
router.patch('/', userProfileController.patchUserProfile);
router.get('/like', userProfileController.likeAndFavouriteOps);
router.get('/favourite', userProfileController.likeAndFavouriteOps);

module.exports = router;