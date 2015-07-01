'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Procedure = mongoose.model('Procedure'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, procedure;

/**
 * Procedure routes tests
 */
describe('Procedure CRUD tests', function() {
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

		// Save a user to the test db and create new Procedure
		user.save(function() {
			procedure = {
				name: 'Procedure Name'
			};

			done();
		});
	});

	it('should be able to save Procedure instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Procedure
				agent.post('/procedures')
					.send(procedure)
					.expect(200)
					.end(function(procedureSaveErr, procedureSaveRes) {
						// Handle Procedure save error
						if (procedureSaveErr) done(procedureSaveErr);

						// Get a list of Procedures
						agent.get('/procedures')
							.end(function(proceduresGetErr, proceduresGetRes) {
								// Handle Procedure save error
								if (proceduresGetErr) done(proceduresGetErr);

								// Get Procedures list
								var procedures = proceduresGetRes.body;

								// Set assertions
								(procedures[0].user._id).should.equal(userId);
								(procedures[0].name).should.match('Procedure Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Procedure instance if not logged in', function(done) {
		agent.post('/procedures')
			.send(procedure)
			.expect(401)
			.end(function(procedureSaveErr, procedureSaveRes) {
				// Call the assertion callback
				done(procedureSaveErr);
			});
	});

	it('should not be able to save Procedure instance if no name is provided', function(done) {
		// Invalidate name field
		procedure.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Procedure
				agent.post('/procedures')
					.send(procedure)
					.expect(400)
					.end(function(procedureSaveErr, procedureSaveRes) {
						// Set message assertion
						(procedureSaveRes.body.message).should.match('Please fill Procedure name');
						
						// Handle Procedure save error
						done(procedureSaveErr);
					});
			});
	});

	it('should be able to update Procedure instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Procedure
				agent.post('/procedures')
					.send(procedure)
					.expect(200)
					.end(function(procedureSaveErr, procedureSaveRes) {
						// Handle Procedure save error
						if (procedureSaveErr) done(procedureSaveErr);

						// Update Procedure name
						procedure.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Procedure
						agent.put('/procedures/' + procedureSaveRes.body._id)
							.send(procedure)
							.expect(200)
							.end(function(procedureUpdateErr, procedureUpdateRes) {
								// Handle Procedure update error
								if (procedureUpdateErr) done(procedureUpdateErr);

								// Set assertions
								(procedureUpdateRes.body._id).should.equal(procedureSaveRes.body._id);
								(procedureUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Procedures if not signed in', function(done) {
		// Create new Procedure model instance
		var procedureObj = new Procedure(procedure);

		// Save the Procedure
		procedureObj.save(function() {
			// Request Procedures
			request(app).get('/procedures')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Procedure if not signed in', function(done) {
		// Create new Procedure model instance
		var procedureObj = new Procedure(procedure);

		// Save the Procedure
		procedureObj.save(function() {
			request(app).get('/procedures/' + procedureObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', procedure.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Procedure instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Procedure
				agent.post('/procedures')
					.send(procedure)
					.expect(200)
					.end(function(procedureSaveErr, procedureSaveRes) {
						// Handle Procedure save error
						if (procedureSaveErr) done(procedureSaveErr);

						// Delete existing Procedure
						agent.delete('/procedures/' + procedureSaveRes.body._id)
							.send(procedure)
							.expect(200)
							.end(function(procedureDeleteErr, procedureDeleteRes) {
								// Handle Procedure error error
								if (procedureDeleteErr) done(procedureDeleteErr);

								// Set assertions
								(procedureDeleteRes.body._id).should.equal(procedureSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Procedure instance if not signed in', function(done) {
		// Set Procedure user 
		procedure.user = user;

		// Create new Procedure model instance
		var procedureObj = new Procedure(procedure);

		// Save the Procedure
		procedureObj.save(function() {
			// Try deleting Procedure
			request(app).delete('/procedures/' + procedureObj._id)
			.expect(401)
			.end(function(procedureDeleteErr, procedureDeleteRes) {
				// Set message assertion
				(procedureDeleteRes.body.message).should.match('User is not logged in');

				// Handle Procedure error error
				done(procedureDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Procedure.remove().exec();
		done();
	});
});