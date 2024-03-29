'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Partnerexpense = mongoose.model('Partnerexpense');

/**
 * Globals
 */
var user, partnerexpense;

/**
 * Unit tests
 */
describe('Partnerexpense Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			partnerexpense = new Partnerexpense({
				name: 'Partnerexpense Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return partnerexpense.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			partnerexpense.name = '';

			return partnerexpense.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Partnerexpense.remove().exec();
		User.remove().exec();

		done();
	});
});