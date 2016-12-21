const { mongoose } = require('./../db/mongoose');

const { User } = require('./user.model');
const { BookProfile } = require('./bookprofile.model');

var BookReviewSchema = new mongoose.Schema({
    bookProfileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookProfile'
    },
    votes: Number,
    comment: String,
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var BookReview = mongoose.model('BookReview', BookReviewSchema);

module.exports = { BookReview };