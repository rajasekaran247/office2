'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Invoicedetail = mongoose.model('Invoicedetail');

/**
 * Globals
 */
var user, invoicedetail;

/**
 * Unit tests
 */
describe('Invoicedetail Model Unit Tests:', function() {
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
			invoicedetail = new Invoicedetail({
				name: 'Invoicedetail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return invoicedetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			invoicedetail.name = '';

			return invoicedetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Invoicedetail.remove().exec();
		User.remove().exec();

		done();
	});
});