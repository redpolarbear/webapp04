require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {BookProfile} = require('./models/bookprofile.model.js');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});



app.listen(port, () => {
    console.log('The server is up and running on port: ' + port);
});

module.exports = {app};