const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { User } = require('./../../user/user.model.js');
const { UserProfile } = require('./../../userprofile/userprofile.model');
const { BookProfile } = require('./../../bookprofile/bookprofile.model');

const userOneId = new ObjectID();
const userOneProfleId = new ObjectID();
const userTwoId = new ObjectID();
const userTwoProfileId = new ObjectID();

const userProfiles = [{
    _id: userOneProfleId,
    firstname: 'John',
    lastname: 'Smith',
    gender: 'male'
}, {
    _id: userTwoProfileId,
    firstname: 'Rose',
    lastname: 'Marry',
    gender: 'female'
}];

const users = [{
    _id: userOneId,
    name: 'john',
    email: 'jsmith@example.com',
    password: 'userOnePass',
    userProfile: userOneProfleId,
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    name: 'rose',
    email: 'rmarry@example.com',
    password: 'userTwoPass',
    userProfile: userTwoProfileId,
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

const populateUserProfiles = (done) => {
    UserProfile.remove({}).then( () => {
        var userOneProfile = new UserProfile(userProfiles[0]).save();
        var userTwoProfile = new UserProfile(userProfiles[1]).save()

        return Promise.all([userOneProfile, userTwoProfile]);
    }).then ( () => done());
};

const populateBookProfiles = (done) => {
    BookProfile.remove({}).then( () => done());
};

module.exports = {users, populateUsers, userProfiles, populateUserProfiles, populateBookProfiles};
