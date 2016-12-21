const { mongoose } = require('./../db/mongoose');

const { User } = require('./user.model');
const { Moment } = require('./moment.model');

var MomentReviewSchema = new mongoose.Schema({
    momentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Moment'
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

var MomentReview = mongoose.model('BookReview', MomentReviewSchema);

module.exports = { MomentReview };