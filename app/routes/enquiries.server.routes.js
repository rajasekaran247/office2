'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var enquiries = require('../../app/controllers/enquiries.server.controller');

	// Enquiries Routes
	app.route('/enquiries')
		.get(enquiries.list)
		.post(users.requiresLogin, enquiries.create);

	app.route('/enquiries/:enquiryId')
		.get(enquiries.read)
		.put(users.requiresLogin, enquiries.hasAuthorization, enquiries.update)
		.delete(users.requiresLogin, enquiries.hasAuthorization, enquiries.delete);

	// Finish by binding the Enquiry middleware
	app.param('enquiryId', enquiries.enquiryByID);
};
