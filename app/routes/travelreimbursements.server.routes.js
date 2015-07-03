'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var travelreimbursements = require('../../app/controllers/travelreimbursements.server.controller');

	// Travelreimbursements Routes
	app.route('/travelreimbursements')
		.get(travelreimbursements.list)
		.post(users.requiresLogin, travelreimbursements.create);

	app.route('/travelreimbursements/:travelreimbursementId')
		.get(travelreimbursements.read)
		.put(users.requiresLogin, travelreimbursements.hasAuthorization, travelreimbursements.update)
		.delete(users.requiresLogin, travelreimbursements.hasAuthorization, travelreimbursements.delete);

	// Finish by binding the Travelreimbursement middleware
	app.param('travelreimbursementId', travelreimbursements.travelreimbursementByID);
};
