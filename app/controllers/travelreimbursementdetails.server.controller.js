'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Travelreimbursementdetail = mongoose.model('Travelreimbursementdetail'),
	_ = require('lodash');

/**
 * Create a Travelreimbursementdetail
 */
exports.create = function(req, res) {
	var travelreimbursementdetail = new Travelreimbursementdetail(req.body);
	travelreimbursementdetail.user = req.user;

	travelreimbursementdetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelreimbursementdetail);
		}
	});
};

/**
 * Show the current Travelreimbursementdetail
 */
exports.read = function(req, res) {
	res.jsonp(req.travelreimbursementdetail);
};

/**
 * Update a Travelreimbursementdetail
 */
exports.update = function(req, res) {
	var travelreimbursementdetail = req.travelreimbursementdetail ;

	travelreimbursementdetail = _.extend(travelreimbursementdetail , req.body);

	travelreimbursementdetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelreimbursementdetail);
		}
	});
};

/**
 * Delete an Travelreimbursementdetail
 */
exports.delete = function(req, res) {
	var travelreimbursementdetail = req.travelreimbursementdetail ;

	travelreimbursementdetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelreimbursementdetail);
		}
	});
};

/**
 * List of Travelreimbursementdetails
 */
exports.list = function(req, res) { 
	Travelreimbursementdetail.find().sort('-created').populate('user', 'displayName').exec(function(err, travelreimbursementdetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelreimbursementdetails);
		}
	});
};

/**
 * Travelreimbursementdetail middleware
 */
exports.travelreimbursementdetailByID = function(req, res, next, id) { 
	Travelreimbursementdetail.findById(id).populate('user', 'displayName').exec(function(err, travelreimbursementdetail) {
		if (err) return next(err);
		if (! travelreimbursementdetail) return next(new Error('Failed to load Travelreimbursementdetail ' + id));
		req.travelreimbursementdetail = travelreimbursementdetail ;
		next();
	});
};

/**
 * Travelreimbursementdetail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.travelreimbursementdetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
