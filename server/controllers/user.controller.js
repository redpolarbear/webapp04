const _ = require('lodash');
const { ObjectID } = require('mongodb');

const { User } = require('./../models/user.model');
const { UserProfile } = require('./../models/userprofile.model');

var exports = module.exports = {};

exports.createUser = function(req, res) {
    var body = _.pick(req.body, ['name', 'email', 'password']);

    var user;
    var userProfile = new UserProfile();

    userProfile.save().then( (doc) => {
        body.userProfileId = doc._id;
        user = new User(body);
        return user.save();
    }).then( () => {
        return user.generateAuthToken();
    }).then ( (token) => {
        res.header('x-auth', token).send(user);
    }).catch( (e) => {
        res.status(400).send(e);
    });

    // var userProfileId = new ObjectID();
    // body.userProfileId = userProfileId;
    // var userProfile;
    // var user = new User(body);
    // user.save().then( () => {
    //     userProfile = new UserProfile({
    //         _id: userProfileId
    //     });
    //     return userProfile.save();
    // }).then(() => {
    //     return user.generateAuthToken();
    // }).then((token) => {
    //     res.header('x-auth', token).send(user);
    // }).catch( (e) => {
    //     res.status(400).send(e);
    // });
};

exports.loginUser = function(req, res) {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredential(body.email, body.password).then( (user) => {
        return user.generateAuthToken().then( (token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch( (e) => {
        res.status(400).send(e);
    });
};
