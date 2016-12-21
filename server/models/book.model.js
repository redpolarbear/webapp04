const { mongoose } = require('./../db/mongoose');
const Schema = mongoose.Schema;

const {User} = require('./user.model.js');
const {BookProfile} = require('./bookprofile.model.js');

var PrivacySchema = new Schema ({
    isAllowedToDisplayToPublic: Boolean,
    isAllowedToDisplayToFriends: Boolean,
    isAllowedToLendToPublic: Boolean,
    isAllowedToLendToFriends: Boolean
}, { _id: false });

var BookSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bookProfileId: {
        type: Schema.Types.ObjectId,
        ref: 'BookProfile'
    },
    privacy: PrivacySchema
}, {
    timestamps: true
});

var Book = mongoose.model('Book', BookSchema);

module.exports = {Book};