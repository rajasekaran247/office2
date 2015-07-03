'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Invoicedetail = mongoose.model('Invoicedetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, invoicedetail;

/**
 * Invoicedetail routes tests
 */
describe('Invoicedetail CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Invoicedetail
		user.save(function() {
			invoicedetail = {
				name: 'Invoicedetail Name'
			};

			done();
		});
	});

	it('should be able to save Invoicedetail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoicedetail
				agent.post('/invoicedetails')
					.send(invoicedetail)
					.expect(200)
					.end(function(invoicedetailSaveErr, invoicedetailSaveRes) {
						// Handle Invoicedetail save error
						if (invoicedetailSaveErr) done(invoicedetailSaveErr);

						// Get a list of Invoicedetails
						agent.get('/invoicedetails')
							.end(function(invoicedetailsGetErr, invoicedetailsGetRes) {
								// Handle Invoicedetail save error
								if (invoicedetailsGetErr) done(invoicedetailsGetErr);

								// Get Invoicedetails list
								var invoicedetails = invoicedetailsGetRes.body;

								// Set assertions
								(invoicedetails[0].user._id).should.equal(userId);
								(invoicedetails[0].name).should.match('Invoicedetail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Invoicedetail instance if not logged in', function(done) {
		agent.post('/invoicedetails')
			.send(invoicedetail)
			.expect(401)
			.end(function(invoicedetailSaveErr, invoicedetailSaveRes) {
				// Call the assertion callback
				done(invoicedetailSaveErr);
			});
	});

	it('should not be able to save Invoicedetail instance if no name is provided', function(done) {
		// Invalidate name field
		invoicedetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoicedetail
				agent.post('/invoicedetails')
					.send(invoicedetail)
					.expect(400)
					.end(function(invoicedetailSaveErr, invoicedetailSaveRes) {
						// Set message assertion
						(invoicedetailSaveRes.body.message).should.match('Please fill Invoicedetail name');
						
						// Handle Invoicedetail save error
						done(invoicedetailSaveErr);
					});
			});
	});

	it('should be able to update Invoicedetail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoicedetail
				agent.post('/invoicedetails')
					.send(invoicedetail)
					.expect(200)
					.end(function(invoicedetailSaveErr, invoicedetailSaveRes) {
						// Handle Invoicedetail save error
						if (invoicedetailSaveErr) done(invoicedetailSaveErr);

						// Update Invoicedetail name
						invoicedetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Invoicedetail
						agent.put('/invoicedetails/' + invoicedetailSaveRes.body._id)
							.send(invoicedetail)
							.expect(200)
							.end(function(invoicedetailUpdateErr, invoicedetailUpdateRes) {
								// Handle Invoicedetail update error
								if (invoicedetailUpdateErr) done(invoicedetailUpdateErr);

								// Set assertions
								(invoicedetailUpdateRes.body._id).should.equal(invoicedetailSaveRes.body._id);
								(invoicedetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Invoicedetails if not signed in', function(done) {
		// Create new Invoicedetail model instance
		var invoicedetailObj = new Invoicedetail(invoicedetail);

		// Save the Invoicedetail
		invoicedetailObj.save(function() {
			// Request Invoicedetails
			request(app).get('/invoicedetails')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Invoicedetail if not signed in', function(done) {
		// Create new Invoicedetail model instance
		var invoicedetailObj = new Invoicedetail(invoicedetail);

		// Save the Invoicedetail
		invoicedetailObj.save(function() {
			request(app).get('/invoicedetails/' + invoicedetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', invoicedetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Invoicedetail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoicedetail
				agent.post('/invoicedetails')
					.send(invoicedetail)
					.expect(200)
					.end(function(invoicedetailSaveErr, invoicedetailSaveRes) {
						// Handle Invoicedetail save error
						if (invoicedetailSaveErr) done(invoicedetailSaveErr);

						// Delete existing Invoicedetail
						agent.delete('/invoicedetails/' + invoicedetailSaveRes.body._id)
							.send(invoicedetail)
							.expect(200)
							.end(function(invoicedetailDeleteErr, invoicedetailDeleteRes) {
								// Handle Invoicedetail error error
								if (invoicedetailDeleteErr) done(invoicedetailDeleteErr);

								// Set assertions
								(invoicedetailDeleteRes.body._id).should.equal(invoicedetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Invoicedetail instance if not signed in', function(done) {
		// Set Invoicedetail user 
		invoicedetail.user = user;

		// Create new Invoicedetail model instance
		var invoicedetailObj = new Invoicedetail(invoicedetail);

		// Save the Invoicedetail
		invoicedetailObj.save(function() {
			// Try deleting Invoicedetail
			request(app).delete('/invoicedetails/' + invoicedetailObj._id)
			.expect(401)
			.end(function(invoicedetailDeleteErr, invoicedetailDeleteRes) {
				// Set message assertion
				(invoicedetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Invoicedetail error error
				done(invoicedetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Invoicedetail.remove().exec();
		done();
	});
});