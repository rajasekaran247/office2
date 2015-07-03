'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var travelreimbursementdetails = require('../../app/controllers/travelreimbursementdetails.server.controller');

	// Travelreimbursementdetails Routes
	app.route('/travelreimbursementdetails')
		.get(travelreimbursementdetails.list)
		.post(users.requiresLogin, travelreimbursementdetails.create);

	app.route('/travelreimbursementdetails/:travelreimbursementdetailId')
		.get(travelreimbursementdetails.read)
		.put(users.requiresLogin, travelreimbursementdetails.hasAuthorization, travelreimbursementdetails.update)
		.delete(users.requiresLogin, travelreimbursementdetails.hasAuthorization, travelreimbursementdetails.delete);

	// Finish by binding the Travelreimbursementdetail middleware
	app.param('travelreimbursementdetailId', travelreimbursementdetails.travelreimbursementdetailByID);
};
