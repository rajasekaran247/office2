'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Odoc = mongoose.model('Odoc'),
	_ = require('lodash');

/**
 * Create a Odoc
 */
exports.create = function(req, res) {
	var odoc = new Odoc(req.body);
	odoc.user = req.user;

	odoc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(odoc);
		}
	});
};

/**
 * Show the current Odoc
 */
exports.read = function(req, res) {
	res.jsonp(req.odoc);
};

/**
 * Update a Odoc
 */
exports.update = function(req, res) {
	var odoc = req.odoc ;

	odoc = _.extend(odoc , req.body);

	odoc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(odoc);
		}
	});
};

/**
 * Delete an Odoc
 */
exports.delete = function(req, res) {
	var odoc = req.odoc ;

	odoc.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(odoc);
		}
	});
};

/**
 * List of Odocs
 */
exports.list = function(req, res) { 
	Odoc.find().sort('-created').populate('user', 'displayName').exec(function(err, odocs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(odocs);
		}
	});
};

/**
 * Odoc middleware
 */
exports.odocByID = function(req, res, next, id) { 
	Odoc.findById(id).populate('user', 'displayName').exec(function(err, odoc) {
		if (err) return next(err);
		if (! odoc) return next(new Error('Failed to load Odoc ' + id));
		req.odoc = odoc ;
		next();
	});
};

/**
 * Odoc authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.odoc.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
