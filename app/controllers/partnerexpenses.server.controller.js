'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Partnerexpense = mongoose.model('Partnerexpense'),
	_ = require('lodash');

/**
 * Create a Partnerexpense
 */
exports.create = function(req, res) {
	var partnerexpense = new Partnerexpense(req.body);
	partnerexpense.user = req.user;

	partnerexpense.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partnerexpense);
		}
	});
};

/**
 * Show the current Partnerexpense
 */
exports.read = function(req, res) {
	res.jsonp(req.partnerexpense);
};

/**
 * Update a Partnerexpense
 */
exports.update = function(req, res) {
	var partnerexpense = req.partnerexpense ;

	partnerexpense = _.extend(partnerexpense , req.body);

	partnerexpense.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partnerexpense);
		}
	});
};

/**
 * Delete an Partnerexpense
 */
exports.delete = function(req, res) {
	var partnerexpense = req.partnerexpense ;

	partnerexpense.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partnerexpense);
		}
	});
};

/**
 * List of Partnerexpenses
 */
exports.list = function(req, res) { 
	Partnerexpense.find().sort('-created').populate('user', 'displayName').exec(function(err, partnerexpenses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partnerexpenses);
		}
	});
};

/**
 * Partnerexpense middleware
 */
exports.partnerexpenseByID = function(req, res, next, id) { 
	Partnerexpense.findById(id).populate('user', 'displayName').exec(function(err, partnerexpense) {
		if (err) return next(err);
		if (! partnerexpense) return next(new Error('Failed to load Partnerexpense ' + id));
		req.partnerexpense = partnerexpense ;
		next();
	});
};

/**
 * Partnerexpense authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.partnerexpense.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
