'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Enquiry = mongoose.model('Enquiry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, enquiry;

/**
 * Enquiry routes tests
 */
describe('Enquiry CRUD tests', function() {
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

		// Save a user to the test db and create new Enquiry
		user.save(function() {
			enquiry = {
				name: 'Enquiry Name'
			};

			done();
		});
	});

	it('should be able to save Enquiry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Enquiry
				agent.post('/enquiries')
					.send(enquiry)
					.expect(200)
					.end(function(enquirySaveErr, enquirySaveRes) {
						// Handle Enquiry save error
						if (enquirySaveErr) done(enquirySaveErr);

						// Get a list of Enquiries
						agent.get('/enquiries')
							.end(function(enquiriesGetErr, enquiriesGetRes) {
								// Handle Enquiry save error
								if (enquiriesGetErr) done(enquiriesGetErr);

								// Get Enquiries list
								var enquiries = enquiriesGetRes.body;

								// Set assertions
								(enquiries[0].user._id).should.equal(userId);
								(enquiries[0].name).should.match('Enquiry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Enquiry instance if not logged in', function(done) {
		agent.post('/enquiries')
			.send(enquiry)
			.expect(401)
			.end(function(enquirySaveErr, enquirySaveRes) {
				// Call the assertion callback
				done(enquirySaveErr);
			});
	});

	it('should not be able to save Enquiry instance if no name is provided', function(done) {
		// Invalidate name field
		enquiry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Enquiry
				agent.post('/enquiries')
					.send(enquiry)
					.expect(400)
					.end(function(enquirySaveErr, enquirySaveRes) {
						// Set message assertion
						(enquirySaveRes.body.message).should.match('Please fill Enquiry name');
						
						// Handle Enquiry save error
						done(enquirySaveErr);
					});
			});
	});

	it('should be able to update Enquiry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Enquiry
				agent.post('/enquiries')
					.send(enquiry)
					.expect(200)
					.end(function(enquirySaveErr, enquirySaveRes) {
						// Handle Enquiry save error
						if (enquirySaveErr) done(enquirySaveErr);

						// Update Enquiry name
						enquiry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Enquiry
						agent.put('/enquiries/' + enquirySaveRes.body._id)
							.send(enquiry)
							.expect(200)
							.end(function(enquiryUpdateErr, enquiryUpdateRes) {
								// Handle Enquiry update error
								if (enquiryUpdateErr) done(enquiryUpdateErr);

								// Set assertions
								(enquiryUpdateRes.body._id).should.equal(enquirySaveRes.body._id);
								(enquiryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Enquiries if not signed in', function(done) {
		// Create new Enquiry model instance
		var enquiryObj = new Enquiry(enquiry);

		// Save the Enquiry
		enquiryObj.save(function() {
			// Request Enquiries
			request(app).get('/enquiries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Enquiry if not signed in', function(done) {
		// Create new Enquiry model instance
		var enquiryObj = new Enquiry(enquiry);

		// Save the Enquiry
		enquiryObj.save(function() {
			request(app).get('/enquiries/' + enquiryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', enquiry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Enquiry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Enquiry
				agent.post('/enquiries')
					.send(enquiry)
					.expect(200)
					.end(function(enquirySaveErr, enquirySaveRes) {
						// Handle Enquiry save error
						if (enquirySaveErr) done(enquirySaveErr);

						// Delete existing Enquiry
						agent.delete('/enquiries/' + enquirySaveRes.body._id)
							.send(enquiry)
							.expect(200)
							.end(function(enquiryDeleteErr, enquiryDeleteRes) {
								// Handle Enquiry error error
								if (enquiryDeleteErr) done(enquiryDeleteErr);

								// Set assertions
								(enquiryDeleteRes.body._id).should.equal(enquirySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Enquiry instance if not signed in', function(done) {
		// Set Enquiry user 
		enquiry.user = user;

		// Create new Enquiry model instance
		var enquiryObj = new Enquiry(enquiry);

		// Save the Enquiry
		enquiryObj.save(function() {
			// Try deleting Enquiry
			request(app).delete('/enquiries/' + enquiryObj._id)
			.expect(401)
			.end(function(enquiryDeleteErr, enquiryDeleteRes) {
				// Set message assertion
				(enquiryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Enquiry error error
				done(enquiryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Enquiry.remove().exec();
		done();
	});
});