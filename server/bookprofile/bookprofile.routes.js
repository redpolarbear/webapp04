'use strict';

var express = require('express');
var router = express.Router();

var bookProfileController = require('./bookprofile.controller.js');
var middleware = require('./../middleware/authenticate');

router.use(middleware.authenticate);
router.get('/', bookProfileController.getBookProfileByISBN);
router.post('/', bookProfileController.createBookProfile);
// router.get('/:id', bookController.getBookById);
// router.delete('/:id', bookController.deleteBookById);
// router.patch('/:id', bookController.updateBookById);

module.exports = router;






