'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var officeexpenses = require('../../app/controllers/officeexpenses.server.controller');

	// Officeexpenses Routes
	app.route('/officeexpenses')
		.get(officeexpenses.list)
		.post(users.requiresLogin, officeexpenses.create);

	app.route('/officeexpenses/:officeexpenseId')
		.get(officeexpenses.read)
		.put(users.requiresLogin, officeexpenses.hasAuthorization, officeexpenses.update)
		.delete(users.requiresLogin, officeexpenses.hasAuthorization, officeexpenses.delete);

	// Finish by binding the Officeexpense middleware
	app.param('officeexpenseId', officeexpenses.officeexpenseByID);
};
