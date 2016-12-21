const _ = require('lodash');

const { BookProfile } = require('./../models/bookprofile.model');

var exports = module.exports = {};

exports.createBookProfile = function(req, res) {
    var body = _.pick(req.body,
        [
            'title',
            'subtitle',
            'originTitle',
            'author',
            'printType',
            'language',
            'imageMediumUrl',
            'imageLargeUrl',
            'ISBN10',
            'ISBN13',
            'categories',
            'tags',
            'pageCount',
            'publisher',
            'publishedDate',
            'summary',
            'price'
        ]);

    var bookProfile = new BookProfile(body);

    bookProfile.save().then( (doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
};