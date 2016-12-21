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
    author: [String],
    printType: String,
    language: [String],
    imageMediumUrl: String,
    imageLargeUrl: String,
    ISBN10: String,
    ISBN13: String,
    categories: [String],
    tags: [String],
    pageCount: Number,
    publisher: String,
    publishedDate: Date,
    summary: String,
    price: String,
    meta: MetaSchema,
    reviewsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookReview' }]
}, {
    timestamps: true
});

var BookProfile = mongoose.model('BookProfile', BookProfileSchema);

BookProfileSchema.statics.findByISBN10 = function( ISBN10 ) {
    var BookProfile = this;

    return BookProfile.findOne({ISBN10}).then( (bookProfile) => {
        if (!bookProfile) {
            return Promise.reject();
        } else {
            return Promise.resolve(bookProfile);
        }
    })
};

BookProfileSchema.statics.findByISBN13 = function( ISBN13 ) {
    var BookProfile = this;

    return BookProfile.findOne({ISBN13}).then( (bookProfile) => {
        if (!bookProfile) {
            return Promise.reject();
        } else {
            return Promise.resolve(bookProfile);
        }
    })
};


module.exports = { BookProfile };