'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var procedures = require('../../app/controllers/procedures.server.controller');

	// Procedures Routes
	app.route('/procedures')
		.get(procedures.list)
		.post(users.requiresLogin, procedures.create);

	app.route('/procedures/:procedureId')
		.get(procedures.read)
		.put(users.requiresLogin, procedures.hasAuthorization, procedures.update)
		.delete(users.requiresLogin, procedures.hasAuthorization, procedures.delete);

	// Finish by binding the Procedure middleware
	app.param('procedureId', procedures.procedureByID);
};
