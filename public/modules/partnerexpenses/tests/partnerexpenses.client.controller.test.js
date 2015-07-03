'use strict';

(function() {
	// Partnerexpenses Controller Spec
	describe('Partnerexpenses Controller Tests', function() {
		// Initialize global variables
		var PartnerexpensesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Partnerexpenses controller.
			PartnerexpensesController = $controller('PartnerexpensesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Partnerexpense object fetched from XHR', inject(function(Partnerexpenses) {
			// Create sample Partnerexpense using the Partnerexpenses service
			var samplePartnerexpense = new Partnerexpenses({
				name: 'New Partnerexpense'
			});

			// Create a sample Partnerexpenses array that includes the new Partnerexpense
			var samplePartnerexpenses = [samplePartnerexpense];

			// Set GET response
			$httpBackend.expectGET('partnerexpenses').respond(samplePartnerexpenses);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.partnerexpenses).toEqualData(samplePartnerexpenses);
		}));

		it('$scope.findOne() should create an array with one Partnerexpense object fetched from XHR using a partnerexpenseId URL parameter', inject(function(Partnerexpenses) {
			// Define a sample Partnerexpense object
			var samplePartnerexpense = new Partnerexpenses({
				name: 'New Partnerexpense'
			});

			// Set the URL parameter
			$stateParams.partnerexpenseId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/partnerexpenses\/([0-9a-fA-F]{24})$/).respond(samplePartnerexpense);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.partnerexpense).toEqualData(samplePartnerexpense);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Partnerexpenses) {
			// Create a sample Partnerexpense object
			var samplePartnerexpensePostData = new Partnerexpenses({
				name: 'New Partnerexpense'
			});

			// Create a sample Partnerexpense response
			var samplePartnerexpenseResponse = new Partnerexpenses({
				_id: '525cf20451979dea2c000001',
				name: 'New Partnerexpense'
			});

			// Fixture mock form input values
			scope.name = 'New Partnerexpense';

			// Set POST response
			$httpBackend.expectPOST('partnerexpenses', samplePartnerexpensePostData).respond(samplePartnerexpenseResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Partnerexpense was created
			expect($location.path()).toBe('/partnerexpenses/' + samplePartnerexpenseResponse._id);
		}));

		it('$scope.update() should update a valid Partnerexpense', inject(function(Partnerexpenses) {
			// Define a sample Partnerexpense put data
			var samplePartnerexpensePutData = new Partnerexpenses({
				_id: '525cf20451979dea2c000001',
				name: 'New Partnerexpense'
			});

			// Mock Partnerexpense in scope
			scope.partnerexpense = samplePartnerexpensePutData;

			// Set PUT response
			$httpBackend.expectPUT(/partnerexpenses\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/partnerexpenses/' + samplePartnerexpensePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid partnerexpenseId and remove the Partnerexpense from the scope', inject(function(Partnerexpenses) {
			// Create new Partnerexpense object
			var samplePartnerexpense = new Partnerexpenses({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Partnerexpenses array and include the Partnerexpense
			scope.partnerexpenses = [samplePartnerexpense];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/partnerexpenses\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePartnerexpense);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.partnerexpenses.length).toBe(0);
		}));
	});
}());