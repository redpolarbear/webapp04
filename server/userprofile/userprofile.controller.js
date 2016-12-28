const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { UserProfile } = require('./userprofile.model');
const { BookProfile } = require('./../bookprofile/bookprofile.model');
const { Moment } = require('./../moment/moment.model');

var exports = module.exports = {};

exports.patchUserProfile = function(req, res) {
    var body = _.pick(req.body, [
        'firstName',
        'lastName',
        'mobile',
        'location',
        'DOB',
        'gender']);
    var id = req.user.get('userProfile');

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

exports.likeAndFavouriteOps = function(req, res) {
    // http://localhost/api/profile/like?kind=bookprofile&id=xxxxxxxx
    // http://localhost/api/profile/favourite?kind=bookprofile&id=xxxxxxxx
    var query = req.query;
    var userProfileId = req.user.get('userProfile');
    var userId = req.user.get('_id');

    var metaKind = '';
    var metaId = '';
    var metaOps = '';

    if ( query.hasOwnProperty('kind') && query.hasOwnProperty('id') ) {

        if (req.path === '/like') {
            metaOps = 'likes';
        } else if (req.path === '/favourite') {
            metaOps = 'favourites';
        }

        metaId = query.id;
        metaKind = query.kind.toLowerCase();

        if ( metaKind !== 'bookprofile' && metaKind !== 'moment' || !ObjectID.isValid(query.id) ) {
            return res.status(400).send();
        }

        if ( metaKind === 'bookprofile') {
            metaKind = 'BookProfile';
        } else if ( metaKind === 'moment') {
            metaKind = 'Moment';
        }

        var newUserProfileMeta = {};
        newUserProfileMeta[metaOps] = { kind: metaKind, item: metaId };

        var newMeta = {};
        newMeta[metaOps] = userId;

        return UserProfile.findByMeta(userProfileId, metaOps, metaKind, metaId)
            .then( (profile) => {
                if (!profile) {
                    // add the book
                    UserProfile.findOneAndUpdate({_id: userProfileId},
                        {$push: newUserProfileMeta }, { new: true } ).then( (profile) => {
                        if (!profile) {
                            return res.status(404).send();
                        }

                        if ( metaKind === 'BookProfile' ) {
                            BookProfile.findOneAndUpdate( { _id: metaId }, { $push: newMeta }, { new: true } )
                                .then( (bookprofile) => {
                                    if (!bookprofile) {
                                        return res.status(404).send();
                                    }

                                    res.send({profile, bookprofile});
                                })
                        } else if ( metaKind === 'Moment' ) {
                            Moment.findOneAndUpdate( { _id: metaId }, { $push: newMeta }, { new: true } )
                                .then( (moment) => {
                                    if (!moment) {
                                        return res.status(404).send();
                                    }

                                    res.send({profile, moment});
                                })
                        }
                    })
                } else {
                    UserProfile.findOneAndUpdate({_id: userProfileId},
                        {$pull: newUserProfileMeta}, {new: true}).then((profile) => {
                        if (!profile) {
                            return res.status(404).send();
                        }
                        if ( metaKind === 'BookProfile' ) {
                            BookProfile.findOneAndUpdate( { _id: metaId }, { $pull: newMeta }, { new: true } )
                                .then( (bookprofile) => {
                                    if (!bookprofile) {
                                        return res.status(404).send();
                                    }

                                    res.send({profile, bookprofile});
                                })
                        } else if ( metaKind === 'Moment' ) {
                            Moment.findOneAndUpdate( { _id: metaId }, { $pull: newMeta }, { new: true } )
                                .then( (moment) => {
                                    if (!moment) {
                                        return res.status(404).send();
                                    }

                                    res.send({profile, moment});
                                })
                        }
                    })
                }
            })
    } else {
        return res.status(400).send();
    }
};

exports.getUserProfile = function(req, res) {
    var _id = req.params.id;

    UserProfile.findOne({_id})
        .populate({
            path: 'likes.item',
            // match: {'likes.kind': 'BookProfile'}
        })
        .then( (profile) => {
            if (!profile) {
                return res.status(404).send();
            }

            var data = _.filter(profile.likes, {kind: 'Moment'});

            res.send(data);
        })

};

