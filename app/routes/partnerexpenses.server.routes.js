'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var partnerexpenses = require('../../app/controllers/partnerexpenses.server.controller');

	// Partnerexpenses Routes
	app.route('/partnerexpenses')
		.get(partnerexpenses.list)
		.post(users.requiresLogin, partnerexpenses.create);

	app.route('/partnerexpenses/:partnerexpenseId')
		.get(partnerexpenses.read)
		.put(users.requiresLogin, partnerexpenses.hasAuthorization, partnerexpenses.update)
		.delete(users.requiresLogin, partnerexpenses.hasAuthorization, partnerexpenses.delete);

	// Finish by binding the Partnerexpense middleware
	app.param('partnerexpenseId', partnerexpenses.partnerexpenseByID);
};
