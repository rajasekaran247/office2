'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Procedure = mongoose.model('Procedure'),
	_ = require('lodash');

/**
 * Create a Procedure
 */
exports.create = function(req, res) {
	var procedure = new Procedure(req.body);
	procedure.user = req.user;

	procedure.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(procedure);
		}
	});
};

/**
 * Show the current Procedure
 */
exports.read = function(req, res) {
	res.jsonp(req.procedure);
};

/**
 * Update a Procedure
 */
exports.update = function(req, res) {
	var procedure = req.procedure ;

	procedure = _.extend(procedure , req.body);

	procedure.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(procedure);
		}
	});
};

/**
 * Delete an Procedure
 */
exports.delete = function(req, res) {
	var procedure = req.procedure ;

	procedure.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(procedure);
		}
	});
};

/**
 * List of Procedures
 */
exports.list = function(req, res) { 
	Procedure.find().sort('-created').populate('user', 'displayName').exec(function(err, procedures) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(procedures);
		}
	});
};

/**
 * Procedure middleware
 */
exports.procedureByID = function(req, res, next, id) { 
	Procedure.findById(id).populate('user', 'displayName').exec(function(err, procedure) {
		if (err) return next(err);
		if (! procedure) return next(new Error('Failed to load Procedure ' + id));
		req.procedure = procedure ;
		next();
	});
};

/**
 * Procedure authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.procedure.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
