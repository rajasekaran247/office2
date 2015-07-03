'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Travelreimbursement = mongoose.model('Travelreimbursement'),
	_ = require('lodash');

/**
 * Create a Travelreimbursement
 */
exports.create = function(req, res) {
	var travelreimbursement = new Travelreimbursement(req.body);
	travelreimbursement.user = req.user;

	travelreimbursement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelreimbursement);
		}
	});
};

/**
 * Show the current Travelreimbursement
 */
exports.read = function(req, res) {
	res.jsonp(req.travelreimbursement);
};

/**
 * Update a Travelreimbursement
 */
exports.update = function(req, res) {
	var travelreimbursement = req.travelreimbursement ;

	travelreimbursement = _.extend(travelreimbursement , req.body);

	travelreimbursement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelreimbursement);
		}
	});
};

/**
 * Delete an Travelreimbursement
 */
exports.delete = function(req, res) {
	var travelreimbursement = req.travelreimbursement ;

	travelreimbursement.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelreimbursement);
		}
	});
};

/**
 * List of Travelreimbursements
 */
exports.list = function(req, res) { 
	Travelreimbursement.find().sort('-created').populate('user', 'displayName').exec(function(err, travelreimbursements) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(travelreimbursements);
		}
	});
};

/**
 * Travelreimbursement middleware
 */
exports.travelreimbursementByID = function(req, res, next, id) { 
	Travelreimbursement.findById(id).populate('user', 'displayName').exec(function(err, travelreimbursement) {
		if (err) return next(err);
		if (! travelreimbursement) return next(new Error('Failed to load Travelreimbursement ' + id));
		req.travelreimbursement = travelreimbursement ;
		next();
	});
};

/**
 * Travelreimbursement authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.travelreimbursement.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
