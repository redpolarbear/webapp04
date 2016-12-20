var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var {User} = require('./user.model.js');

var ReviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    votes: Number,
    comment: String
}, {
    timestamps: true
});

var Review = mongoose.model('Review', ReviewSchema);

module.exports = { Review };