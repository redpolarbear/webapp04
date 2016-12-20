'use strict';

var express = require('express');
var router = express.Router();

var {Book} = require('./../models/book.model');
var {BookProfile} = require('./../models/bookprofile.model');
var {User} = require('./../models/user.model');

var bookController = require('./../controllers/book.controller');
//var authMiddleware

router.post('/', bookController.createBook);
// router.get('/', bookController.getBook);
// router.get('/:id', bookController.getBookById);
// router.delete('/:id', bookController.deleteBookById);
// router.patch('/:id', bookController.updateBookById);



