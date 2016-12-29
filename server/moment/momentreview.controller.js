const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { MomentReview } = require('./momentreview.model');

var exports = module.exports = {};

exports.createMomentReview = function(req, res) {
    var body = req.body;
    body.creator = req.user.get('_id');

    var momentReview = new MomentReview(body);

    momentReview.save(body).then( (doc) => {
        if (!doc) {
            return res.status(400).send();
        }

        res.send(doc);
    })
};
