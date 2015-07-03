'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Travelreimbursementdetail = mongoose.model('Travelreimbursementdetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, travelreimbursementdetail;

/**
 * Travelreimbursementdetail routes tests
 */
describe('Travelreimbursementdetail CRUD tests', function() {
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

		// Save a user to the test db and create new Travelreimbursementdetail
		user.save(function() {
			travelreimbursementdetail = {
				name: 'Travelreimbursementdetail Name'
			};

			done();
		});
	});

	it('should be able to save Travelreimbursementdetail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travelreimbursementdetail
				agent.post('/travelreimbursementdetails')
					.send(travelreimbursementdetail)
					.expect(200)
					.end(function(travelreimbursementdetailSaveErr, travelreimbursementdetailSaveRes) {
						// Handle Travelreimbursementdetail save error
						if (travelreimbursementdetailSaveErr) done(travelreimbursementdetailSaveErr);

						// Get a list of Travelreimbursementdetails
						agent.get('/travelreimbursementdetails')
							.end(function(travelreimbursementdetailsGetErr, travelreimbursementdetailsGetRes) {
								// Handle Travelreimbursementdetail save error
								if (travelreimbursementdetailsGetErr) done(travelreimbursementdetailsGetErr);

								// Get Travelreimbursementdetails list
								var travelreimbursementdetails = travelreimbursementdetailsGetRes.body;

								// Set assertions
								(travelreimbursementdetails[0].user._id).should.equal(userId);
								(travelreimbursementdetails[0].name).should.match('Travelreimbursementdetail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Travelreimbursementdetail instance if not logged in', function(done) {
		agent.post('/travelreimbursementdetails')
			.send(travelreimbursementdetail)
			.expect(401)
			.end(function(travelreimbursementdetailSaveErr, travelreimbursementdetailSaveRes) {
				// Call the assertion callback
				done(travelreimbursementdetailSaveErr);
			});
	});

	it('should not be able to save Travelreimbursementdetail instance if no name is provided', function(done) {
		// Invalidate name field
		travelreimbursementdetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travelreimbursementdetail
				agent.post('/travelreimbursementdetails')
					.send(travelreimbursementdetail)
					.expect(400)
					.end(function(travelreimbursementdetailSaveErr, travelreimbursementdetailSaveRes) {
						// Set message assertion
						(travelreimbursementdetailSaveRes.body.message).should.match('Please fill Travelreimbursementdetail name');
						
						// Handle Travelreimbursementdetail save error
						done(travelreimbursementdetailSaveErr);
					});
			});
	});

	it('should be able to update Travelreimbursementdetail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travelreimbursementdetail
				agent.post('/travelreimbursementdetails')
					.send(travelreimbursementdetail)
					.expect(200)
					.end(function(travelreimbursementdetailSaveErr, travelreimbursementdetailSaveRes) {
						// Handle Travelreimbursementdetail save error
						if (travelreimbursementdetailSaveErr) done(travelreimbursementdetailSaveErr);

						// Update Travelreimbursementdetail name
						travelreimbursementdetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Travelreimbursementdetail
						agent.put('/travelreimbursementdetails/' + travelreimbursementdetailSaveRes.body._id)
							.send(travelreimbursementdetail)
							.expect(200)
							.end(function(travelreimbursementdetailUpdateErr, travelreimbursementdetailUpdateRes) {
								// Handle Travelreimbursementdetail update error
								if (travelreimbursementdetailUpdateErr) done(travelreimbursementdetailUpdateErr);

								// Set assertions
								(travelreimbursementdetailUpdateRes.body._id).should.equal(travelreimbursementdetailSaveRes.body._id);
								(travelreimbursementdetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Travelreimbursementdetails if not signed in', function(done) {
		// Create new Travelreimbursementdetail model instance
		var travelreimbursementdetailObj = new Travelreimbursementdetail(travelreimbursementdetail);

		// Save the Travelreimbursementdetail
		travelreimbursementdetailObj.save(function() {
			// Request Travelreimbursementdetails
			request(app).get('/travelreimbursementdetails')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Travelreimbursementdetail if not signed in', function(done) {
		// Create new Travelreimbursementdetail model instance
		var travelreimbursementdetailObj = new Travelreimbursementdetail(travelreimbursementdetail);

		// Save the Travelreimbursementdetail
		travelreimbursementdetailObj.save(function() {
			request(app).get('/travelreimbursementdetails/' + travelreimbursementdetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', travelreimbursementdetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Travelreimbursementdetail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travelreimbursementdetail
				agent.post('/travelreimbursementdetails')
					.send(travelreimbursementdetail)
					.expect(200)
					.end(function(travelreimbursementdetailSaveErr, travelreimbursementdetailSaveRes) {
						// Handle Travelreimbursementdetail save error
						if (travelreimbursementdetailSaveErr) done(travelreimbursementdetailSaveErr);

						// Delete existing Travelreimbursementdetail
						agent.delete('/travelreimbursementdetails/' + travelreimbursementdetailSaveRes.body._id)
							.send(travelreimbursementdetail)
							.expect(200)
							.end(function(travelreimbursementdetailDeleteErr, travelreimbursementdetailDeleteRes) {
								// Handle Travelreimbursementdetail error error
								if (travelreimbursementdetailDeleteErr) done(travelreimbursementdetailDeleteErr);

								// Set assertions
								(travelreimbursementdetailDeleteRes.body._id).should.equal(travelreimbursementdetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Travelreimbursementdetail instance if not signed in', function(done) {
		// Set Travelreimbursementdetail user 
		travelreimbursementdetail.user = user;

		// Create new Travelreimbursementdetail model instance
		var travelreimbursementdetailObj = new Travelreimbursementdetail(travelreimbursementdetail);

		// Save the Travelreimbursementdetail
		travelreimbursementdetailObj.save(function() {
			// Try deleting Travelreimbursementdetail
			request(app).delete('/travelreimbursementdetails/' + travelreimbursementdetailObj._id)
			.expect(401)
			.end(function(travelreimbursementdetailDeleteErr, travelreimbursementdetailDeleteRes) {
				// Set message assertion
				(travelreimbursementdetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Travelreimbursementdetail error error
				done(travelreimbursementdetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Travelreimbursementdetail.remove().exec();
		done();
	});
});