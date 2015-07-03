'use strict';

(function() {
	// Officeexpenses Controller Spec
	describe('Officeexpenses Controller Tests', function() {
		// Initialize global variables
		var OfficeexpensesController,
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

			// Initialize the Officeexpenses controller.
			OfficeexpensesController = $controller('OfficeexpensesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Officeexpense object fetched from XHR', inject(function(Officeexpenses) {
			// Create sample Officeexpense using the Officeexpenses service
			var sampleOfficeexpense = new Officeexpenses({
				name: 'New Officeexpense'
			});

			// Create a sample Officeexpenses array that includes the new Officeexpense
			var sampleOfficeexpenses = [sampleOfficeexpense];

			// Set GET response
			$httpBackend.expectGET('officeexpenses').respond(sampleOfficeexpenses);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.officeexpenses).toEqualData(sampleOfficeexpenses);
		}));

		it('$scope.findOne() should create an array with one Officeexpense object fetched from XHR using a officeexpenseId URL parameter', inject(function(Officeexpenses) {
			// Define a sample Officeexpense object
			var sampleOfficeexpense = new Officeexpenses({
				name: 'New Officeexpense'
			});

			// Set the URL parameter
			$stateParams.officeexpenseId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/officeexpenses\/([0-9a-fA-F]{24})$/).respond(sampleOfficeexpense);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.officeexpense).toEqualData(sampleOfficeexpense);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Officeexpenses) {
			// Create a sample Officeexpense object
			var sampleOfficeexpensePostData = new Officeexpenses({
				name: 'New Officeexpense'
			});

			// Create a sample Officeexpense response
			var sampleOfficeexpenseResponse = new Officeexpenses({
				_id: '525cf20451979dea2c000001',
				name: 'New Officeexpense'
			});

			// Fixture mock form input values
			scope.name = 'New Officeexpense';

			// Set POST response
			$httpBackend.expectPOST('officeexpenses', sampleOfficeexpensePostData).respond(sampleOfficeexpenseResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Officeexpense was created
			expect($location.path()).toBe('/officeexpenses/' + sampleOfficeexpenseResponse._id);
		}));

		it('$scope.update() should update a valid Officeexpense', inject(function(Officeexpenses) {
			// Define a sample Officeexpense put data
			var sampleOfficeexpensePutData = new Officeexpenses({
				_id: '525cf20451979dea2c000001',
				name: 'New Officeexpense'
			});

			// Mock Officeexpense in scope
			scope.officeexpense = sampleOfficeexpensePutData;

			// Set PUT response
			$httpBackend.expectPUT(/officeexpenses\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/officeexpenses/' + sampleOfficeexpensePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid officeexpenseId and remove the Officeexpense from the scope', inject(function(Officeexpenses) {
			// Create new Officeexpense object
			var sampleOfficeexpense = new Officeexpenses({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Officeexpenses array and include the Officeexpense
			scope.officeexpenses = [sampleOfficeexpense];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/officeexpenses\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOfficeexpense);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.officeexpenses.length).toBe(0);
		}));
	});
}());