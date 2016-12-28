const { mongoose } = require('./../db/mongoose');
const { ObjectID } = require('mongodb');

const { BookProfile } = require('./../bookprofile/bookprofile.model');
const { Moment } = require('./../moment/moment.model');

var KidsSchema = new mongoose.Schema({
    name: String,
    DOB: Date,
    gender: String
}, { _id: false });

// likes.kind = BookProfile || Moment
var MetaSchema = new mongoose.Schema({
    likes: [{
        kind: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'likes.kind'
        }

    }],
    favourites: [{
        kind: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'favourites.kind'
        }
    }]
    //
    //
    // likes: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     allowNull: true,
    //     unique: true
    // }],
    // favourites: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     allowNull: true,
    //     unique: true
    // }]
}, { _id: false });

var UserProfileSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    //     unique: true
    // },
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
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'likes.kind'
        }

    }],
    favourites: [{
        kind: String,
        id: {
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
    where[metaOps] = { $elemMatch: { 'kind': kindValue, 'id': idValue} };

    console.log(where);

    return UserProfile.findOne(where);
};


var UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = { UserProfile };