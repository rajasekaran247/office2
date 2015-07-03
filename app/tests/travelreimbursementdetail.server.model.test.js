'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Travelreimbursementdetail = mongoose.model('Travelreimbursementdetail');

/**
 * Globals
 */
var user, travelreimbursementdetail;

/**
 * Unit tests
 */
describe('Travelreimbursementdetail Model Unit Tests:', function() {
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
			travelreimbursementdetail = new Travelreimbursementdetail({
				name: 'Travelreimbursementdetail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return travelreimbursementdetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			travelreimbursementdetail.name = '';

			return travelreimbursementdetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Travelreimbursementdetail.remove().exec();
		User.remove().exec();

		done();
	});
});