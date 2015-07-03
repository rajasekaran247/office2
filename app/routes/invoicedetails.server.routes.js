'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var invoicedetails = require('../../app/controllers/invoicedetails.server.controller');

	// Invoicedetails Routes
	app.route('/invoicedetails')
		.get(invoicedetails.list)
		.post(users.requiresLogin, invoicedetails.create);

	app.route('/invoicedetails/:invoicedetailId')
		.get(invoicedetails.read)
		.put(users.requiresLogin, invoicedetails.hasAuthorization, invoicedetails.update)
		.delete(users.requiresLogin, invoicedetails.hasAuthorization, invoicedetails.delete);

	// Finish by binding the Invoicedetail middleware
	app.param('invoicedetailId', invoicedetails.invoicedetailByID);
};
