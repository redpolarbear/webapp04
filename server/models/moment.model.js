const { mongoose } = require('./../db/mongoose');

const { User } = require('./user.model');
const { Book } = require('./book.model');

var MomentReviewSchema = new mongoose.Schema({


});

var MomentSchema = new mongoose.Schema({

    content: String,
    imageUrlIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    likes: [{

    }],
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewsIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MomentReview' }]
}, {
    timestamps: true
});

var Moment = mongoose.model('Moment', MomentSchema);

module.exports = { Moment };