const { mongoose } = require('./userprofile.model');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { User } = require('./../user/user.model');
const { UserProfile } = require('./userprofile.model');

var exports = module.exports = {};

exports.patchUserProfile = function(req, res) {
    var body = _.pick(req.body, [
        'firstName',
        'lastName',
        'mobile',
        'location',
        'DOB',
        'gender']);
    var id = req.user.userProfile;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    UserProfile.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then( (doc) => {
        if(!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((e) => {
        res.status(404).send(e.message);
    })
};