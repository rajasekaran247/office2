'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Enquirydetail = mongoose.model('Enquirydetail');

/**
 * Globals
 */
var user, enquirydetail;

/**
 * Unit tests
 */
describe('Enquirydetail Model Unit Tests:', function() {
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
			enquirydetail = new Enquirydetail({
				name: 'Enquirydetail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return enquirydetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			enquirydetail.name = '';

			return enquirydetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Enquirydetail.remove().exec();
		User.remove().exec();

		done();
	});
});