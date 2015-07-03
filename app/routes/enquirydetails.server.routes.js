'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var enquirydetails = require('../../app/controllers/enquirydetails.server.controller');

	// Enquirydetails Routes
	app.route('/enquirydetails')
		.get(enquirydetails.list)
		.post(users.requiresLogin, enquirydetails.create);

	app.route('/enquirydetails/:enquirydetailId')
		.get(enquirydetails.read)
		.put(users.requiresLogin, enquirydetails.hasAuthorization, enquirydetails.update)
		.delete(users.requiresLogin, enquirydetails.hasAuthorization, enquirydetails.delete);

	// Finish by binding the Enquirydetail middleware
	app.param('enquirydetailId', enquirydetails.enquirydetailByID);
};
