var mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: String,
    email: {
        type: String
    },
    passwordHash: {
        type: String
    },
    salt: {
        type: String
    }
});

module.exports = { User };