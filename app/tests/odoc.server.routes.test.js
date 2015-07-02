'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Odoc = mongoose.model('Odoc'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, odoc;

/**
 * Odoc routes tests
 */
describe('Odoc CRUD tests', function() {
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

		// Save a user to the test db and create new Odoc
		user.save(function() {
			odoc = {
				name: 'Odoc Name'
			};

			done();
		});
	});

	it('should be able to save Odoc instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Odoc
				agent.post('/odocs')
					.send(odoc)
					.expect(200)
					.end(function(odocSaveErr, odocSaveRes) {
						// Handle Odoc save error
						if (odocSaveErr) done(odocSaveErr);

						// Get a list of Odocs
						agent.get('/odocs')
							.end(function(odocsGetErr, odocsGetRes) {
								// Handle Odoc save error
								if (odocsGetErr) done(odocsGetErr);

								// Get Odocs list
								var odocs = odocsGetRes.body;

								// Set assertions
								(odocs[0].user._id).should.equal(userId);
								(odocs[0].name).should.match('Odoc Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Odoc instance if not logged in', function(done) {
		agent.post('/odocs')
			.send(odoc)
			.expect(401)
			.end(function(odocSaveErr, odocSaveRes) {
				// Call the assertion callback
				done(odocSaveErr);
			});
	});

	it('should not be able to save Odoc instance if no name is provided', function(done) {
		// Invalidate name field
		odoc.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Odoc
				agent.post('/odocs')
					.send(odoc)
					.expect(400)
					.end(function(odocSaveErr, odocSaveRes) {
						// Set message assertion
						(odocSaveRes.body.message).should.match('Please fill Odoc name');
						
						// Handle Odoc save error
						done(odocSaveErr);
					});
			});
	});

	it('should be able to update Odoc instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Odoc
				agent.post('/odocs')
					.send(odoc)
					.expect(200)
					.end(function(odocSaveErr, odocSaveRes) {
						// Handle Odoc save error
						if (odocSaveErr) done(odocSaveErr);

						// Update Odoc name
						odoc.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Odoc
						agent.put('/odocs/' + odocSaveRes.body._id)
							.send(odoc)
							.expect(200)
							.end(function(odocUpdateErr, odocUpdateRes) {
								// Handle Odoc update error
								if (odocUpdateErr) done(odocUpdateErr);

								// Set assertions
								(odocUpdateRes.body._id).should.equal(odocSaveRes.body._id);
								(odocUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Odocs if not signed in', function(done) {
		// Create new Odoc model instance
		var odocObj = new Odoc(odoc);

		// Save the Odoc
		odocObj.save(function() {
			// Request Odocs
			request(app).get('/odocs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Odoc if not signed in', function(done) {
		// Create new Odoc model instance
		var odocObj = new Odoc(odoc);

		// Save the Odoc
		odocObj.save(function() {
			request(app).get('/odocs/' + odocObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', odoc.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Odoc instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Odoc
				agent.post('/odocs')
					.send(odoc)
					.expect(200)
					.end(function(odocSaveErr, odocSaveRes) {
						// Handle Odoc save error
						if (odocSaveErr) done(odocSaveErr);

						// Delete existing Odoc
						agent.delete('/odocs/' + odocSaveRes.body._id)
							.send(odoc)
							.expect(200)
							.end(function(odocDeleteErr, odocDeleteRes) {
								// Handle Odoc error error
								if (odocDeleteErr) done(odocDeleteErr);

								// Set assertions
								(odocDeleteRes.body._id).should.equal(odocSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Odoc instance if not signed in', function(done) {
		// Set Odoc user 
		odoc.user = user;

		// Create new Odoc model instance
		var odocObj = new Odoc(odoc);

		// Save the Odoc
		odocObj.save(function() {
			// Try deleting Odoc
			request(app).delete('/odocs/' + odocObj._id)
			.expect(401)
			.end(function(odocDeleteErr, odocDeleteRes) {
				// Set message assertion
				(odocDeleteRes.body.message).should.match('User is not logged in');

				// Handle Odoc error error
				done(odocDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Odoc.remove().exec();
		done();
	});
});