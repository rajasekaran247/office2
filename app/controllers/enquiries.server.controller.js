'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Enquiry = mongoose.model('Enquiry'),
	_ = require('lodash');

/**
 * Create a Enquiry
 */
exports.create = function(req, res) {
	var enquiry = new Enquiry(req.body);
	enquiry.user = req.user;

	enquiry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enquiry);
		}
	});
};

/**
 * Show the current Enquiry
 */
exports.read = function(req, res) {
	res.jsonp(req.enquiry);
};

/**
 * Update a Enquiry
 */
exports.update = function(req, res) {
	var enquiry = req.enquiry ;

	enquiry = _.extend(enquiry , req.body);

	enquiry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enquiry);
		}
	});
};

/**
 * Delete an Enquiry
 */
exports.delete = function(req, res) {
	var enquiry = req.enquiry ;

	enquiry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enquiry);
		}
	});
};

/**
 * List of Enquiries
 */
exports.list = function(req, res) { 
	Enquiry.find().sort('-created').populate('user', 'displayName').exec(function(err, enquiries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enquiries);
		}
	});
};

/**
 * Enquiry middleware
 */
exports.enquiryByID = function(req, res, next, id) { 
	Enquiry.findById(id).populate('user', 'displayName').exec(function(err, enquiry) {
		if (err) return next(err);
		if (! enquiry) return next(new Error('Failed to load Enquiry ' + id));
		req.enquiry = enquiry ;
		next();
	});
};

/**
 * Enquiry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.enquiry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
