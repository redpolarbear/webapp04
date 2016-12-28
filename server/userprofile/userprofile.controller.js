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

exports.likeAndFavouriteOps = function(req, res) {
    // http://localhost/api/profile/like?kind=bookprofile&id=xxxxxxxx
    // http://localhost/api/profile/favourite?kind=bookprofile&id=xxxxxxxx
    var query = req.query;
    var userProfileId = req.user.get('userProfile');

    var metaKind = '';
    var metaId = '';
    var metaOps = '';

    console.log(req.user);

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

        var newMeta = {};
        newMeta[metaOps] = { kind: metaKind, id: metaId };

        return UserProfile.findByMeta(userProfileId, metaOps, metaKind, metaId)
            .then( (profile) => {
                console.log(profile);
                if (!profile) {
                    UserProfile.findOneAndUpdate({_id: userProfileId},
                        {$push: newMeta }, { new: true } ).then( (profile) => {
                        if (!profile) {
                            return res.status(404).send();
                        }
                        res.send(profile);
                    })
                } else {
                    UserProfile.findOneAndUpdate({_id: userProfileId},
                        {$pull: newMeta}, {new: true}).then((profile) => {
                        if (!profile) {
                            return res.status(404).send();
                        }
                        res.send(profile);
                    })
                }
            })
    } else {
        return res.status(400).send();
    }
};

