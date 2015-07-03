'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Officeexpense = mongoose.model('Officeexpense'),
	_ = require('lodash');

/**
 * Create a Officeexpense
 */
exports.create = function(req, res) {
	var officeexpense = new Officeexpense(req.body);
	officeexpense.user = req.user;

	officeexpense.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(officeexpense);
		}
	});
};

/**
 * Show the current Officeexpense
 */
exports.read = function(req, res) {
	res.jsonp(req.officeexpense);
};

/**
 * Update a Officeexpense
 */
exports.update = function(req, res) {
	var officeexpense = req.officeexpense ;

	officeexpense = _.extend(officeexpense , req.body);

	officeexpense.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(officeexpense);
		}
	});
};

/**
 * Delete an Officeexpense
 */
exports.delete = function(req, res) {
	var officeexpense = req.officeexpense ;

	officeexpense.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(officeexpense);
		}
	});
};

/**
 * List of Officeexpenses
 */
exports.list = function(req, res) { 
	Officeexpense.find().sort('-created').populate('user', 'displayName').exec(function(err, officeexpenses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(officeexpenses);
		}
	});
};

/**
 * Officeexpense middleware
 */
exports.officeexpenseByID = function(req, res, next, id) { 
	Officeexpense.findById(id).populate('user', 'displayName').exec(function(err, officeexpense) {
		if (err) return next(err);
		if (! officeexpense) return next(new Error('Failed to load Officeexpense ' + id));
		req.officeexpense = officeexpense ;
		next();
	});
};

/**
 * Officeexpense authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.officeexpense.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
