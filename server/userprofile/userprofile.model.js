const { mongoose } = require('./../db/mongoose');
const { ObjectID } = require('mongodb');

var KidsSchema = new mongoose.Schema({
    name: String,
    DOB: Date,
    gender: String
}, { _id: false });

var UserProfileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    memberId: String,
    mobile: String,
    isMobileVerified: Boolean,
    location: String,
    DOB: Date,
    gender: String,
    kids: [ KidsSchema ],
    likes: [{
        kind: String,
        item: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'likes.kind'
        }
    }],
    favourites: [{
        kind: String,
        item: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'favourites.kind'
        }
    }]
});

// metaOps = 'likes' || 'favourites', metaKind = 'BookProfile' || 'Moment', metaId = 'BookProfile._id' || 'Moment._id'
UserProfileSchema.statics.findByMeta = function(userProfileId, metaOps, metaKind, metaId) {
    var UserProfile = this;

    var _id = ObjectID(userProfileId);
    var kindValue = metaKind;
    var idValue = ObjectID(metaId);

    var where = {};
    where._id = _id;
    where[metaOps] = { $elemMatch: { 'kind': kindValue, 'item': idValue} };

    return UserProfile.findOne(where);
};

var UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = { UserProfile };