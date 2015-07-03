'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Travelreimbursement = mongoose.model('Travelreimbursement'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, travelreimbursement;

/**
 * Travelreimbursement routes tests
 */
describe('Travelreimbursement CRUD tests', function() {
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

		// Save a user to the test db and create new Travelreimbursement
		user.save(function() {
			travelreimbursement = {
				name: 'Travelreimbursement Name'
			};

			done();
		});
	});

	it('should be able to save Travelreimbursement instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travelreimbursement
				agent.post('/travelreimbursements')
					.send(travelreimbursement)
					.expect(200)
					.end(function(travelreimbursementSaveErr, travelreimbursementSaveRes) {
						// Handle Travelreimbursement save error
						if (travelreimbursementSaveErr) done(travelreimbursementSaveErr);

						// Get a list of Travelreimbursements
						agent.get('/travelreimbursements')
							.end(function(travelreimbursementsGetErr, travelreimbursementsGetRes) {
								// Handle Travelreimbursement save error
								if (travelreimbursementsGetErr) done(travelreimbursementsGetErr);

								// Get Travelreimbursements list
								var travelreimbursements = travelreimbursementsGetRes.body;

								// Set assertions
								(travelreimbursements[0].user._id).should.equal(userId);
								(travelreimbursements[0].name).should.match('Travelreimbursement Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Travelreimbursement instance if not logged in', function(done) {
		agent.post('/travelreimbursements')
			.send(travelreimbursement)
			.expect(401)
			.end(function(travelreimbursementSaveErr, travelreimbursementSaveRes) {
				// Call the assertion callback
				done(travelreimbursementSaveErr);
			});
	});

	it('should not be able to save Travelreimbursement instance if no name is provided', function(done) {
		// Invalidate name field
		travelreimbursement.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travelreimbursement
				agent.post('/travelreimbursements')
					.send(travelreimbursement)
					.expect(400)
					.end(function(travelreimbursementSaveErr, travelreimbursementSaveRes) {
						// Set message assertion
						(travelreimbursementSaveRes.body.message).should.match('Please fill Travelreimbursement name');
						
						// Handle Travelreimbursement save error
						done(travelreimbursementSaveErr);
					});
			});
	});

	it('should be able to update Travelreimbursement instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travelreimbursement
				agent.post('/travelreimbursements')
					.send(travelreimbursement)
					.expect(200)
					.end(function(travelreimbursementSaveErr, travelreimbursementSaveRes) {
						// Handle Travelreimbursement save error
						if (travelreimbursementSaveErr) done(travelreimbursementSaveErr);

						// Update Travelreimbursement name
						travelreimbursement.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Travelreimbursement
						agent.put('/travelreimbursements/' + travelreimbursementSaveRes.body._id)
							.send(travelreimbursement)
							.expect(200)
							.end(function(travelreimbursementUpdateErr, travelreimbursementUpdateRes) {
								// Handle Travelreimbursement update error
								if (travelreimbursementUpdateErr) done(travelreimbursementUpdateErr);

								// Set assertions
								(travelreimbursementUpdateRes.body._id).should.equal(travelreimbursementSaveRes.body._id);
								(travelreimbursementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Travelreimbursements if not signed in', function(done) {
		// Create new Travelreimbursement model instance
		var travelreimbursementObj = new Travelreimbursement(travelreimbursement);

		// Save the Travelreimbursement
		travelreimbursementObj.save(function() {
			// Request Travelreimbursements
			request(app).get('/travelreimbursements')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Travelreimbursement if not signed in', function(done) {
		// Create new Travelreimbursement model instance
		var travelreimbursementObj = new Travelreimbursement(travelreimbursement);

		// Save the Travelreimbursement
		travelreimbursementObj.save(function() {
			request(app).get('/travelreimbursements/' + travelreimbursementObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', travelreimbursement.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Travelreimbursement instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Travelreimbursement
				agent.post('/travelreimbursements')
					.send(travelreimbursement)
					.expect(200)
					.end(function(travelreimbursementSaveErr, travelreimbursementSaveRes) {
						// Handle Travelreimbursement save error
						if (travelreimbursementSaveErr) done(travelreimbursementSaveErr);

						// Delete existing Travelreimbursement
						agent.delete('/travelreimbursements/' + travelreimbursementSaveRes.body._id)
							.send(travelreimbursement)
							.expect(200)
							.end(function(travelreimbursementDeleteErr, travelreimbursementDeleteRes) {
								// Handle Travelreimbursement error error
								if (travelreimbursementDeleteErr) done(travelreimbursementDeleteErr);

								// Set assertions
								(travelreimbursementDeleteRes.body._id).should.equal(travelreimbursementSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Travelreimbursement instance if not signed in', function(done) {
		// Set Travelreimbursement user 
		travelreimbursement.user = user;

		// Create new Travelreimbursement model instance
		var travelreimbursementObj = new Travelreimbursement(travelreimbursement);

		// Save the Travelreimbursement
		travelreimbursementObj.save(function() {
			// Try deleting Travelreimbursement
			request(app).delete('/travelreimbursements/' + travelreimbursementObj._id)
			.expect(401)
			.end(function(travelreimbursementDeleteErr, travelreimbursementDeleteRes) {
				// Set message assertion
				(travelreimbursementDeleteRes.body.message).should.match('User is not logged in');

				// Handle Travelreimbursement error error
				done(travelreimbursementDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Travelreimbursement.remove().exec();
		done();
	});
});