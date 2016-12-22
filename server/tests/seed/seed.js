const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { User } = require('./../../models/user.model');
const { UserProfile } = require('./../../models/userprofile.model');

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
    userProfileId: userOneProfleId,
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    name: 'rose',
    email: 'rmarry@example.com',
    password: 'userTwoPass',
    userProfileId: userTwoProfileId,
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}];

// const todos = [{
//     _id: new ObjectID(),
//     text: 'First test todo',
//     _creator: userOneId
// }, {
//     _id: new ObjectID(),
//     text: 'Second test todo',
//     completed: true,
//     completedAt: 333,
//     _creator: userTwoId
// }];

// const populateTodos = (done) => {
//     Todo.remove({}).then(() => {
//         return Todo.insertMany(todos);
//     }).then(() => done());
// };

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

module.exports = {users, populateUsers, userProfiles, populateUserProfiles};
