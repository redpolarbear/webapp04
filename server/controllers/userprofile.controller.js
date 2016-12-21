const { mongoose } = require('./../models/userprofile.model');
const _ = require('lodash');

var exports = module.exports = {};

exports.addUserProfile = function(req, res) {
    var body = _.pick(req.body, [
        'firstName',
        'lastName',
        'memberId',
        'mobile',
        'location',
        'DOB',
        'gender']);





};