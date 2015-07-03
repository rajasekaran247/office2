'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Officeexpense = mongoose.model('Officeexpense'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, officeexpense;

/**
 * Officeexpense routes tests
 */
describe('Officeexpense CRUD tests', function() {
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

		// Save a user to the test db and create new Officeexpense
		user.save(function() {
			officeexpense = {
				name: 'Officeexpense Name'
			};

			done();
		});
	});

	it('should be able to save Officeexpense instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Officeexpense
				agent.post('/officeexpenses')
					.send(officeexpense)
					.expect(200)
					.end(function(officeexpenseSaveErr, officeexpenseSaveRes) {
						// Handle Officeexpense save error
						if (officeexpenseSaveErr) done(officeexpenseSaveErr);

						// Get a list of Officeexpenses
						agent.get('/officeexpenses')
							.end(function(officeexpensesGetErr, officeexpensesGetRes) {
								// Handle Officeexpense save error
								if (officeexpensesGetErr) done(officeexpensesGetErr);

								// Get Officeexpenses list
								var officeexpenses = officeexpensesGetRes.body;

								// Set assertions
								(officeexpenses[0].user._id).should.equal(userId);
								(officeexpenses[0].name).should.match('Officeexpense Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Officeexpense instance if not logged in', function(done) {
		agent.post('/officeexpenses')
			.send(officeexpense)
			.expect(401)
			.end(function(officeexpenseSaveErr, officeexpenseSaveRes) {
				// Call the assertion callback
				done(officeexpenseSaveErr);
			});
	});

	it('should not be able to save Officeexpense instance if no name is provided', function(done) {
		// Invalidate name field
		officeexpense.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Officeexpense
				agent.post('/officeexpenses')
					.send(officeexpense)
					.expect(400)
					.end(function(officeexpenseSaveErr, officeexpenseSaveRes) {
						// Set message assertion
						(officeexpenseSaveRes.body.message).should.match('Please fill Officeexpense name');
						
						// Handle Officeexpense save error
						done(officeexpenseSaveErr);
					});
			});
	});

	it('should be able to update Officeexpense instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Officeexpense
				agent.post('/officeexpenses')
					.send(officeexpense)
					.expect(200)
					.end(function(officeexpenseSaveErr, officeexpenseSaveRes) {
						// Handle Officeexpense save error
						if (officeexpenseSaveErr) done(officeexpenseSaveErr);

						// Update Officeexpense name
						officeexpense.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Officeexpense
						agent.put('/officeexpenses/' + officeexpenseSaveRes.body._id)
							.send(officeexpense)
							.expect(200)
							.end(function(officeexpenseUpdateErr, officeexpenseUpdateRes) {
								// Handle Officeexpense update error
								if (officeexpenseUpdateErr) done(officeexpenseUpdateErr);

								// Set assertions
								(officeexpenseUpdateRes.body._id).should.equal(officeexpenseSaveRes.body._id);
								(officeexpenseUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Officeexpenses if not signed in', function(done) {
		// Create new Officeexpense model instance
		var officeexpenseObj = new Officeexpense(officeexpense);

		// Save the Officeexpense
		officeexpenseObj.save(function() {
			// Request Officeexpenses
			request(app).get('/officeexpenses')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Officeexpense if not signed in', function(done) {
		// Create new Officeexpense model instance
		var officeexpenseObj = new Officeexpense(officeexpense);

		// Save the Officeexpense
		officeexpenseObj.save(function() {
			request(app).get('/officeexpenses/' + officeexpenseObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', officeexpense.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Officeexpense instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Officeexpense
				agent.post('/officeexpenses')
					.send(officeexpense)
					.expect(200)
					.end(function(officeexpenseSaveErr, officeexpenseSaveRes) {
						// Handle Officeexpense save error
						if (officeexpenseSaveErr) done(officeexpenseSaveErr);

						// Delete existing Officeexpense
						agent.delete('/officeexpenses/' + officeexpenseSaveRes.body._id)
							.send(officeexpense)
							.expect(200)
							.end(function(officeexpenseDeleteErr, officeexpenseDeleteRes) {
								// Handle Officeexpense error error
								if (officeexpenseDeleteErr) done(officeexpenseDeleteErr);

								// Set assertions
								(officeexpenseDeleteRes.body._id).should.equal(officeexpenseSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Officeexpense instance if not signed in', function(done) {
		// Set Officeexpense user 
		officeexpense.user = user;

		// Create new Officeexpense model instance
		var officeexpenseObj = new Officeexpense(officeexpense);

		// Save the Officeexpense
		officeexpenseObj.save(function() {
			// Try deleting Officeexpense
			request(app).delete('/officeexpenses/' + officeexpenseObj._id)
			.expect(401)
			.end(function(officeexpenseDeleteErr, officeexpenseDeleteRes) {
				// Set message assertion
				(officeexpenseDeleteRes.body.message).should.match('User is not logged in');

				// Handle Officeexpense error error
				done(officeexpenseDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Officeexpense.remove().exec();
		done();
	});
});