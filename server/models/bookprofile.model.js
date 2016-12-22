const { mongoose } = require('./../db/mongoose');

const { BookReview } = require('./bookreview.model.js');

var MetaSchema = new mongoose.Schema({
    likes: Number,
    favourites: Number
}, { _id: false });

var BookProfileSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    originTitle: String,
    authors: [String],
    printType: String,
    languages: [String],
    imageMediumUrl: String,
    imageLargeUrl: String,
    isbn10: {
        type: String,
        unique: true
    },
    isbn13: {
        type: String,
        unique: true
    },
    categories: [String],
    tags: [String],
    pageCount: Number,
    publisher: String,
    publishedDate: Date,
    summary: String,
    price: String,
    meta: MetaSchema,
    reviewsIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookReview' }]
}, {
    timestamps: true
});


BookProfileSchema.statics.findByISBN = function(isbn) {
    var BookProfile = this;

    if (isbn.length == 10) {
        return BookProfile.findOne({isbn10: isbn}).then( (bookProfile) => {
            if (!bookProfile) {
                return Promise.reject('Book was not found. -- ISBN10');
            } else {
                return Promise.resolve(bookProfile);
            }
        })
    } else if (isbn.length == 13) {
        return BookProfile.findOne({isbn13: isbn}).then( (bookProfile) => {
            if (!bookProfile) {
                return Promise.reject('Book was not found. --ISBN13');
            } else {
                return Promise.resolve(bookProfile);
            }
        })
    }
};


var BookProfile = mongoose.model('BookProfile', BookProfileSchema);

module.exports = { BookProfile };