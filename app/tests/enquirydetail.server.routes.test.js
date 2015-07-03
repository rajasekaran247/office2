'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Enquirydetail = mongoose.model('Enquirydetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, enquirydetail;

/**
 * Enquirydetail routes tests
 */
describe('Enquirydetail CRUD tests', function() {
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

		// Save a user to the test db and create new Enquirydetail
		user.save(function() {
			enquirydetail = {
				name: 'Enquirydetail Name'
			};

			done();
		});
	});

	it('should be able to save Enquirydetail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Enquirydetail
				agent.post('/enquirydetails')
					.send(enquirydetail)
					.expect(200)
					.end(function(enquirydetailSaveErr, enquirydetailSaveRes) {
						// Handle Enquirydetail save error
						if (enquirydetailSaveErr) done(enquirydetailSaveErr);

						// Get a list of Enquirydetails
						agent.get('/enquirydetails')
							.end(function(enquirydetailsGetErr, enquirydetailsGetRes) {
								// Handle Enquirydetail save error
								if (enquirydetailsGetErr) done(enquirydetailsGetErr);

								// Get Enquirydetails list
								var enquirydetails = enquirydetailsGetRes.body;

								// Set assertions
								(enquirydetails[0].user._id).should.equal(userId);
								(enquirydetails[0].name).should.match('Enquirydetail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Enquirydetail instance if not logged in', function(done) {
		agent.post('/enquirydetails')
			.send(enquirydetail)
			.expect(401)
			.end(function(enquirydetailSaveErr, enquirydetailSaveRes) {
				// Call the assertion callback
				done(enquirydetailSaveErr);
			});
	});

	it('should not be able to save Enquirydetail instance if no name is provided', function(done) {
		// Invalidate name field
		enquirydetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Enquirydetail
				agent.post('/enquirydetails')
					.send(enquirydetail)
					.expect(400)
					.end(function(enquirydetailSaveErr, enquirydetailSaveRes) {
						// Set message assertion
						(enquirydetailSaveRes.body.message).should.match('Please fill Enquirydetail name');
						
						// Handle Enquirydetail save error
						done(enquirydetailSaveErr);
					});
			});
	});

	it('should be able to update Enquirydetail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Enquirydetail
				agent.post('/enquirydetails')
					.send(enquirydetail)
					.expect(200)
					.end(function(enquirydetailSaveErr, enquirydetailSaveRes) {
						// Handle Enquirydetail save error
						if (enquirydetailSaveErr) done(enquirydetailSaveErr);

						// Update Enquirydetail name
						enquirydetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Enquirydetail
						agent.put('/enquirydetails/' + enquirydetailSaveRes.body._id)
							.send(enquirydetail)
							.expect(200)
							.end(function(enquirydetailUpdateErr, enquirydetailUpdateRes) {
								// Handle Enquirydetail update error
								if (enquirydetailUpdateErr) done(enquirydetailUpdateErr);

								// Set assertions
								(enquirydetailUpdateRes.body._id).should.equal(enquirydetailSaveRes.body._id);
								(enquirydetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Enquirydetails if not signed in', function(done) {
		// Create new Enquirydetail model instance
		var enquirydetailObj = new Enquirydetail(enquirydetail);

		// Save the Enquirydetail
		enquirydetailObj.save(function() {
			// Request Enquirydetails
			request(app).get('/enquirydetails')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Enquirydetail if not signed in', function(done) {
		// Create new Enquirydetail model instance
		var enquirydetailObj = new Enquirydetail(enquirydetail);

		// Save the Enquirydetail
		enquirydetailObj.save(function() {
			request(app).get('/enquirydetails/' + enquirydetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', enquirydetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Enquirydetail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Enquirydetail
				agent.post('/enquirydetails')
					.send(enquirydetail)
					.expect(200)
					.end(function(enquirydetailSaveErr, enquirydetailSaveRes) {
						// Handle Enquirydetail save error
						if (enquirydetailSaveErr) done(enquirydetailSaveErr);

						// Delete existing Enquirydetail
						agent.delete('/enquirydetails/' + enquirydetailSaveRes.body._id)
							.send(enquirydetail)
							.expect(200)
							.end(function(enquirydetailDeleteErr, enquirydetailDeleteRes) {
								// Handle Enquirydetail error error
								if (enquirydetailDeleteErr) done(enquirydetailDeleteErr);

								// Set assertions
								(enquirydetailDeleteRes.body._id).should.equal(enquirydetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Enquirydetail instance if not signed in', function(done) {
		// Set Enquirydetail user 
		enquirydetail.user = user;

		// Create new Enquirydetail model instance
		var enquirydetailObj = new Enquirydetail(enquirydetail);

		// Save the Enquirydetail
		enquirydetailObj.save(function() {
			// Try deleting Enquirydetail
			request(app).delete('/enquirydetails/' + enquirydetailObj._id)
			.expect(401)
			.end(function(enquirydetailDeleteErr, enquirydetailDeleteRes) {
				// Set message assertion
				(enquirydetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Enquirydetail error error
				done(enquirydetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Enquirydetail.remove().exec();
		done();
	});
});