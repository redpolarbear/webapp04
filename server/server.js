require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
var logger = require('morgan');


var app = express();
const port = process.env.PORT;

var usersRouters = require('./routes/user.routes');
var userProfilesRouters = require('./routes/userprofile.routes');
var bookProfilesRouters = require('./routes/bookprofile.routes');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api/users', usersRouters);
app.use('/api/profiles', userProfilesRouters);
app.use('/api/book/detail', bookProfilesRouters);

app.listen(port, () => {
    console.log('The server is up and running on port: ' + port);
});

module.exports = { app };