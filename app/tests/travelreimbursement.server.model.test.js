'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Travelreimbursement = mongoose.model('Travelreimbursement');

/**
 * Globals
 */
var user, travelreimbursement;

/**
 * Unit tests
 */
describe('Travelreimbursement Model Unit Tests:', function() {
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
			travelreimbursement = new Travelreimbursement({
				name: 'Travelreimbursement Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return travelreimbursement.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			travelreimbursement.name = '';

			return travelreimbursement.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Travelreimbursement.remove().exec();
		User.remove().exec();

		done();
	});
});