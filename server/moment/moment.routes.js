'use strict';

var express = require('express');
var router = express.Router();

var momentController = require('./moment.controller');
var middleware = require('./../middleware/authenticate');

// base route: /api/moment
router.use(middleware.authenticate);
router.post('/', momentController.createMoment);

module.exports = router;