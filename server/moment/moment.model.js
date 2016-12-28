const { mongoose } = require('./../db/mongoose');

const { User } = require('./../user/user.model.js');
const { Book } = require('./../book/book.model.js');
const { UserProfile } = require('./../userprofile/userprofile.model');

var MomentSchema = new mongoose.Schema({
    content: String,
    imageUrlIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile'
    }],
    creator: {
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