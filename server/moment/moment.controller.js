const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { Moment } = require('./moment.model');

var exports = module.exports = {};

exports.createMoment = function(req, res) {
    var body = req.body;
    body.creator = req.user.get('_id');

    var moment = new Moment(body);

    moment.save(body).then( (doc) => {
        if (!doc) {
            return res.status(400).send();
        }

        res.send(doc);
    })
};
