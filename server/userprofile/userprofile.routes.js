'use strict';

var express = require('express');
var router = express.Router();

var userProfileController = require('./userprofile.controller.js');
var middleware = require('./../middleware/authenticate');

// base route: /api/profile
router.use(middleware.authenticate);
router.patch('/', userProfileController.patchUserProfile);

// http://localhost/api/profile/like?kind=bookprofile&id=xxxxxxxx
router.get('/like', userProfileController.likeAndFavouriteOps);

// http://localhost/api/profile/favourite?kind=bookprofile&id=xxxxxxxx
router.get('/favourite', userProfileController.likeAndFavouriteOps);
router.get('/:id', userProfileController.getUserProfile);

module.exports = router;