var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var {Review} = require('./review.model.js');

var BookProfileSchema = new Schema({
    title: String,
    subtitle: String,
    author: [String],
    printType: String,
    language: [String],
    industryIdentifiers: {
        ISBN_10: String,
        ISBN_13: String
    },
    categories: [String],
    tags: [String],
    pageCount: Number,
    publisher: String,
    publishedDate: Date,
    webReaderLink: String,
    meta: {
        likes: Number,
        favourites: Number
    },
    reviewsId: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, {
    timestamps: true
});

var BookProfile = mongoose.model('BookProfile', BookProfileSchema);

module.exports = { BookProfile };