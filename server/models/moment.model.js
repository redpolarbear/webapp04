const { mongoose } = require('./../db/mongoose');

const { User } = require('./user.model');

var MomentSchema = new mongoose.Schema({

    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

var Moment = mongoose.model('Moment', MomentSchema);

module.exports = { Moment };