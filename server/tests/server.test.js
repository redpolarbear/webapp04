const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
// const {Todo} = require('./../models/todo');
const { User } = require('./../models/user.model');
const { UserProfile } = require('./../models/userprofile.model');

const { users, populateUsers, userProfiles, populateUserProfiles } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateUserProfiles);
// beforeEach(populateTodos);

describe('POST /api/users', () => {
    it('should create a user', (done) => {
        var name = 'bill';
        var email = 'bgates@example.com';
        var password = '123mnb!';

        request(app)
            .post('/api/users')
            .send({name, email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);

            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findOne({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    return UserProfile.findOne({_id: res.body.userProfileId})
                }).then( (profile) => {
                    expect(profile).toExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return validation errors if request invalid', (done) => {
        request(app)
            .post('/api/users')
            .send({
                email: 'and',
                password: '123'
            })
            .expect(400)
            .end(done);
    });

    it('should not create user if email in use', (done) => {
        request(app)
            .post('/api/users')
            .send({
                name: 'mike',
                email: users[0].email,
                password: 'Password123!'
            })
            .expect(400)
            .end(done);
    });

    it('should not create user if name in use', (done) => {
        request(app)
            .post('/api/users')
            .send({
                name: users[0].name,
                email: 'mjordan@example.com',
                password: 'Password123!'
            })
            .expect(400)
            .end(done);
    });
});

describe('POST /api/users/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
            .post('/api/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[1]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    return UserProfile.findById(users[1].userProfileId);
                }).then( (profile) => {
                    expect(profile).toExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should reject invalid login', (done) => {
        request(app)
            .post('/api/users/login')
            .send({
                email: users[1].email,
                password: users[1].password + '1'
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(1);
                    done();
                }).catch((e) => done(e));
            });
    });
});