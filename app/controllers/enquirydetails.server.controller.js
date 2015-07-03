'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Enquirydetail = mongoose.model('Enquirydetail'),
	_ = require('lodash');

/**
 * Create a Enquirydetail
 */
exports.create = function(req, res) {
	var enquirydetail = new Enquirydetail(req.body);
	enquirydetail.user = req.user;

	enquirydetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enquirydetail);
		}
	});
};

/**
 * Show the current Enquirydetail
 */
exports.read = function(req, res) {
	res.jsonp(req.enquirydetail);
};

/**
 * Update a Enquirydetail
 */
exports.update = function(req, res) {
	var enquirydetail = req.enquirydetail ;

	enquirydetail = _.extend(enquirydetail , req.body);

	enquirydetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enquirydetail);
		}
	});
};

/**
 * Delete an Enquirydetail
 */
exports.delete = function(req, res) {
	var enquirydetail = req.enquirydetail ;

	enquirydetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enquirydetail);
		}
	});
};

/**
 * List of Enquirydetails
 */
exports.list = function(req, res) { 
	Enquirydetail.find().sort('-created').populate('user', 'displayName').exec(function(err, enquirydetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enquirydetails);
		}
	});
};

/**
 * Enquirydetail middleware
 */
exports.enquirydetailByID = function(req, res, next, id) { 
	Enquirydetail.findById(id).populate('user', 'displayName').exec(function(err, enquirydetail) {
		if (err) return next(err);
		if (! enquirydetail) return next(new Error('Failed to load Enquirydetail ' + id));
		req.enquirydetail = enquirydetail ;
		next();
	});
};

/**
 * Enquirydetail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.enquirydetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
