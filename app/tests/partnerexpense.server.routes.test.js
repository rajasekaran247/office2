'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Partnerexpense = mongoose.model('Partnerexpense'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, partnerexpense;

/**
 * Partnerexpense routes tests
 */
describe('Partnerexpense CRUD tests', function() {
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

		// Save a user to the test db and create new Partnerexpense
		user.save(function() {
			partnerexpense = {
				name: 'Partnerexpense Name'
			};

			done();
		});
	});

	it('should be able to save Partnerexpense instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Partnerexpense
				agent.post('/partnerexpenses')
					.send(partnerexpense)
					.expect(200)
					.end(function(partnerexpenseSaveErr, partnerexpenseSaveRes) {
						// Handle Partnerexpense save error
						if (partnerexpenseSaveErr) done(partnerexpenseSaveErr);

						// Get a list of Partnerexpenses
						agent.get('/partnerexpenses')
							.end(function(partnerexpensesGetErr, partnerexpensesGetRes) {
								// Handle Partnerexpense save error
								if (partnerexpensesGetErr) done(partnerexpensesGetErr);

								// Get Partnerexpenses list
								var partnerexpenses = partnerexpensesGetRes.body;

								// Set assertions
								(partnerexpenses[0].user._id).should.equal(userId);
								(partnerexpenses[0].name).should.match('Partnerexpense Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Partnerexpense instance if not logged in', function(done) {
		agent.post('/partnerexpenses')
			.send(partnerexpense)
			.expect(401)
			.end(function(partnerexpenseSaveErr, partnerexpenseSaveRes) {
				// Call the assertion callback
				done(partnerexpenseSaveErr);
			});
	});

	it('should not be able to save Partnerexpense instance if no name is provided', function(done) {
		// Invalidate name field
		partnerexpense.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Partnerexpense
				agent.post('/partnerexpenses')
					.send(partnerexpense)
					.expect(400)
					.end(function(partnerexpenseSaveErr, partnerexpenseSaveRes) {
						// Set message assertion
						(partnerexpenseSaveRes.body.message).should.match('Please fill Partnerexpense name');
						
						// Handle Partnerexpense save error
						done(partnerexpenseSaveErr);
					});
			});
	});

	it('should be able to update Partnerexpense instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Partnerexpense
				agent.post('/partnerexpenses')
					.send(partnerexpense)
					.expect(200)
					.end(function(partnerexpenseSaveErr, partnerexpenseSaveRes) {
						// Handle Partnerexpense save error
						if (partnerexpenseSaveErr) done(partnerexpenseSaveErr);

						// Update Partnerexpense name
						partnerexpense.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Partnerexpense
						agent.put('/partnerexpenses/' + partnerexpenseSaveRes.body._id)
							.send(partnerexpense)
							.expect(200)
							.end(function(partnerexpenseUpdateErr, partnerexpenseUpdateRes) {
								// Handle Partnerexpense update error
								if (partnerexpenseUpdateErr) done(partnerexpenseUpdateErr);

								// Set assertions
								(partnerexpenseUpdateRes.body._id).should.equal(partnerexpenseSaveRes.body._id);
								(partnerexpenseUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Partnerexpenses if not signed in', function(done) {
		// Create new Partnerexpense model instance
		var partnerexpenseObj = new Partnerexpense(partnerexpense);

		// Save the Partnerexpense
		partnerexpenseObj.save(function() {
			// Request Partnerexpenses
			request(app).get('/partnerexpenses')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Partnerexpense if not signed in', function(done) {
		// Create new Partnerexpense model instance
		var partnerexpenseObj = new Partnerexpense(partnerexpense);

		// Save the Partnerexpense
		partnerexpenseObj.save(function() {
			request(app).get('/partnerexpenses/' + partnerexpenseObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', partnerexpense.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Partnerexpense instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Partnerexpense
				agent.post('/partnerexpenses')
					.send(partnerexpense)
					.expect(200)
					.end(function(partnerexpenseSaveErr, partnerexpenseSaveRes) {
						// Handle Partnerexpense save error
						if (partnerexpenseSaveErr) done(partnerexpenseSaveErr);

						// Delete existing Partnerexpense
						agent.delete('/partnerexpenses/' + partnerexpenseSaveRes.body._id)
							.send(partnerexpense)
							.expect(200)
							.end(function(partnerexpenseDeleteErr, partnerexpenseDeleteRes) {
								// Handle Partnerexpense error error
								if (partnerexpenseDeleteErr) done(partnerexpenseDeleteErr);

								// Set assertions
								(partnerexpenseDeleteRes.body._id).should.equal(partnerexpenseSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Partnerexpense instance if not signed in', function(done) {
		// Set Partnerexpense user 
		partnerexpense.user = user;

		// Create new Partnerexpense model instance
		var partnerexpenseObj = new Partnerexpense(partnerexpense);

		// Save the Partnerexpense
		partnerexpenseObj.save(function() {
			// Try deleting Partnerexpense
			request(app).delete('/partnerexpenses/' + partnerexpenseObj._id)
			.expect(401)
			.end(function(partnerexpenseDeleteErr, partnerexpenseDeleteRes) {
				// Set message assertion
				(partnerexpenseDeleteRes.body.message).should.match('User is not logged in');

				// Handle Partnerexpense error error
				done(partnerexpenseDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Partnerexpense.remove().exec();
		done();
	});
});