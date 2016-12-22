const { mongoose } = require('./../db/mongoose');

const { User } = require('./user.model.js');
const { BookProfile } = require('./bookprofile.model.js');

var PrivacySchema = new mongoose.Schema({
    isAllowedToDisplayToPublic: {
        type: Boolean,
        default: true
    },
    isAllowedToDisplayToFriends: {
        type: Boolean,
        default: true
    },
    isAllowedToLendToPublic: {
        type: Boolean,
        default: false
    },
    isAllowedToLendToFriends: {
        type: Boolean,
        default: true
    }
}, { _id: false });

var BookSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookProfileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookProfile'
    },
    status: {
        type: Number,
        default: 0 // 0 = on the book shelf
    },
    privacy: PrivacySchema
}, {
    timestamps: true
});

var Book = mongoose.model('Book', BookSchema);

module.exports = { Book };