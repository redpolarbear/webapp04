var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var {User} = require('./user.model.js');
var {BookProfile} = require('./bookprofile.model.js');

var BookSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bookProfileId: {
        type: Schema.Types.ObjectId,
        ref: 'BookProfile'
    },
    privacy: {
        isAllowedToDisplayToPublic: Boolean,
        isAllowedToDisplayToFriends: Boolean,
        isAllowedToLendToPublic: Boolean,
        isAllowedToLendToFriends: Boolean
    }
}, {
    timestamps: true
});

var Book = mongoose.model('Book', BookSchema);

module.exports = {Book};