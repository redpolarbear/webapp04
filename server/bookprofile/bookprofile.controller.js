const _ = require('lodash');
const validator = require('validator');
const { ObjectID } = require('mongodb');

const { BookProfile } = require('./bookprofile.model.js');

var exports = module.exports = {};

exports.createBookProfile = function(req, res) {
    var body = _.pick(req.body,
        [
            'title',
            'subtitle',
            'originTitle',
            'authors',
            'printType',
            'languages',
            'imageMediumUrl',
            'imageLargeUrl',
            'isbn10',
            'isbn13',
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

// function for GET /api/book/detail?isbn=xxxxx
exports.getBookProfileByISBN = function(req, res) {
    var query = req.query;

    if ( query.hasOwnProperty('isbn') && validator.isISBN(query.isbn) ) {
        var isbn = query.isbn;

        BookProfile.findByISBN(isbn).then( (doc) => {
            res.send(doc);
        }).catch( (e) => {
            res.status(400).send(e);
        });
    } else {
        return res.status(400).send('Please input the ISBN or ISBN is invalid!');
    }
};
