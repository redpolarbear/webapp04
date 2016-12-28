const { mongoose } = require('./../db/mongoose');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { Moment } = require('./moment.model');

var exports = module.exports = {};

exports.createMoment = function(req, res) {
    // get the user _id
    var body = {};
    body.creator = req.user.get('_id');

    // get the body from the req.body

    // if it has the image url array, upload the images to the oss

    //

    var moment = new Moment(body);

    moment.save(body).then( (doc) => {
        if (!doc) {
            return res.status(400).send();
        }

        res.send(doc);
    })
};
