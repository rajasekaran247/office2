'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var odocs = require('../../app/controllers/odocs.server.controller');

	// Odocs Routes
	app.route('/odocs')
		.get(odocs.list)
		.post(users.requiresLogin, odocs.create);

	app.route('/odocs/:odocId')
		.get(odocs.read)
		.put(users.requiresLogin, odocs.hasAuthorization, odocs.update)
		.delete(users.requiresLogin, odocs.hasAuthorization, odocs.delete);

	// Finish by binding the Odoc middleware
	app.param('odocId', odocs.odocByID);
};
