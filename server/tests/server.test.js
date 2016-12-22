const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { User } = require('./../models/user.model');
const { UserProfile } = require('./../models/userprofile.model');
const { BookProfile } = require('./../models/bookprofile.model');

const { users, populateUsers, userProfiles, populateUserProfiles, populateBookProfiles } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateUserProfiles);
beforeEach(populateBookProfiles);

// test the user creation
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

// test the user login
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

// test the user profile update
describe('PATCH /api/profiles', () => {
    it('should update the user\'s profile', (done) => {
        var profile = {
            'mobile': '12345678901',
            'location': 'Shanghai',
            'DOB': '1990-01-01'
        };

        request(app)
            .patch('/api/profiles')
            .set('x-auth', users[0].tokens[0].token)
            .send(profile)
            .expect(200)
            .expect( (res) => {
                expect(res.body.mobile).toBe(profile.mobile);
                expect(res.body.location).toBe(profile.location);
                expect((res.body.DOB).slice(0,10)).toBe(profile.DOB);
            })
            .end(done);
    });

});

// test the book profile creation
describe('POST /api/book/detail', () => {
   it('should create a new book profile', (done) => {
       var bookProfile = {
           'subtitle': 'Band 3: Logik der Forschung',
           'authors': ['Karl R. Popper'],
           'publishedDate':'2005-5-1',
           'originTitle': '',
           'binding': 'Taschenbuch',
           'languages': [],
           'pages': '601',
           'imageMediumUrl': 'http:\/\/open.6api.net\/mpic\/s28123842.jpg',
           'imageLargeUrl': 'http:\/\/open.6api.net\/lpic\/s28123842.jpg',
           'publisher':'Mohr Siebeck',
           'isbn10':'316148410X',
           'isbn13':'9783161484100',
           'title':'Gesammelte Werke',
           'summary':'',
           'price':'0.00'
       };

       request(app)
           .post('/api/book/detail')
           .set('x-auth', users[0].tokens[0].token)
           .send(bookProfile)
           .expect(200)
           .expect( (res) => {
               expect(res.body.title).toBe(bookProfile.title);
               expect(res.body.isbn10).toBe(bookProfile.isbn10);
               expect(res.body.isbn13).toBe(bookProfile.isbn13);
           })
           .end((err) => {
                if (err) {
                    return done(err)
                }

                BookProfile.findByISBN(bookProfile.isbn13).then((doc) => {
                    expect(doc).toExist();
                    expect(doc.title).toBe(bookProfile.title);
                    expect(doc.isbn10).toBe(bookProfile.isbn10);
                    expect(doc.isbn13).toBe(bookProfile.isbn13);
                    done();
                }).catch( (e) => done(e));
           });
   });
});