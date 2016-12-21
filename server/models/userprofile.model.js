const { mongoose } = require('./../db/mongoose');

const {User} = require('./user.model');

var KidsSchema = new mongoose.Schema({
    name: String,
    DOB: Date,
    gender: String
}, { _id: false });

var MetaSchema = new mongoose.Schema({
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        allowNull: true
    }],
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        allowNull: true
    }]
}, { _id: false });

var UserProfile = mongoose.model('UserProfile', {
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
    kids: [KidsSchema],
    meta: MetaSchema
});

module.exports = { UserProfile };