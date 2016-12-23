'use strict';

var express = require('express');
var router = express.Router();

var bookController = require('./book.controller.js');
var middleware = require('./../middleware/authenticate');

router.use(middleware.authenticate);
// router.get('/', bookController.getBook);
// router.get('/:id', bookController.getBookById);
// router.delete('/:id', bookController.deleteBookById);
// router.patch('/:id', bookController.updateBookById);

module.exports = router;


