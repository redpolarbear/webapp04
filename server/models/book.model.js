const { mongoose } = require('./../db/mongoose');

const { User } = require('./user.model.js');
const { BookProfile } = require('./bookprofile.model.js');

var PrivacySchema = new mongoose.Schema({
    isAllowedToDisplayToPublic: Boolean,
    isAllowedToDisplayToFriends: Boolean,
    isAllowedToLendToPublic: Boolean,
    isAllowedToLendToFriends: Boolean
}, { _id: false });

var BookSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookProfileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookProfile'
    },
    privacy: PrivacySchema
}, {
    timestamps: true
});

var Book = mongoose.model('Book', BookSchema);

module.exports = { Book };