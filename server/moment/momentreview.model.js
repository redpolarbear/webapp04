const { mongoose } = require('./../db/mongoose');

const { User } = require('././user.model.js');
const { Moment } = require('./moment.model.js');

var MomentReviewSchema = new mongoose.Schema({
    comment: String,
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    // TODO replyto???
}, {
    timestamps: true
});

var MomentReview = mongoose.model('BookReview', MomentReviewSchema);

module.exports = { MomentReview };