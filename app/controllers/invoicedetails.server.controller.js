'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Invoicedetail = mongoose.model('Invoicedetail'),
	_ = require('lodash');

/**
 * Create a Invoicedetail
 */
exports.create = function(req, res) {
	var invoicedetail = new Invoicedetail(req.body);
	invoicedetail.user = req.user;

	invoicedetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invoicedetail);
		}
	});
};

/**
 * Show the current Invoicedetail
 */
exports.read = function(req, res) {
	res.jsonp(req.invoicedetail);
};

/**
 * Update a Invoicedetail
 */
exports.update = function(req, res) {
	var invoicedetail = req.invoicedetail ;

	invoicedetail = _.extend(invoicedetail , req.body);

	invoicedetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invoicedetail);
		}
	});
};

/**
 * Delete an Invoicedetail
 */
exports.delete = function(req, res) {
	var invoicedetail = req.invoicedetail ;

	invoicedetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invoicedetail);
		}
	});
};

/**
 * List of Invoicedetails
 */
exports.list = function(req, res) { 
	Invoicedetail.find().sort('-created').populate('user', 'displayName').exec(function(err, invoicedetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invoicedetails);
		}
	});
};

/**
 * Invoicedetail middleware
 */
exports.invoicedetailByID = function(req, res, next, id) { 
	Invoicedetail.findById(id).populate('user', 'displayName').exec(function(err, invoicedetail) {
		if (err) return next(err);
		if (! invoicedetail) return next(new Error('Failed to load Invoicedetail ' + id));
		req.invoicedetail = invoicedetail ;
		next();
	});
};

/**
 * Invoicedetail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.invoicedetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
