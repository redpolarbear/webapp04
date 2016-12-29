const { mongoose } = require('./../db/mongoose');

const { User } = require('./../user/user.model.js');
const { Book } = require('./../book/book.model.js');

var MomentSchema = new mongoose.Schema({
    content: String,
    imageUrls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MomentReview' }]
}, {
    timestamps: true
});

var Moment = mongoose.model('Moment', MomentSchema);

module.exports = { Moment };