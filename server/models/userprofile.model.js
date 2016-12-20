var mongoose = require('mongoose');

var UserProfile = mongoose.model('UserProfile', {
    firstName: String,
    lastName: String,
    memberId: String,
    mobile: String,
    isMobileVerified: Boolean,
    location: String,
    DOB: Date,
    gender: String,
    kids: [{
        name: String,
        DOB: Date,
        gender: String
    }]
});

module.exports = { UserProfile };