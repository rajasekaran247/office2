'use strict';

(function() {
	// Travelreimbursements Controller Spec
	describe('Travelreimbursements Controller Tests', function() {
		// Initialize global variables
		var TravelreimbursementsController,
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

			// Initialize the Travelreimbursements controller.
			TravelreimbursementsController = $controller('TravelreimbursementsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Travelreimbursement object fetched from XHR', inject(function(Travelreimbursements) {
			// Create sample Travelreimbursement using the Travelreimbursements service
			var sampleTravelreimbursement = new Travelreimbursements({
				name: 'New Travelreimbursement'
			});

			// Create a sample Travelreimbursements array that includes the new Travelreimbursement
			var sampleTravelreimbursements = [sampleTravelreimbursement];

			// Set GET response
			$httpBackend.expectGET('travelreimbursements').respond(sampleTravelreimbursements);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.travelreimbursements).toEqualData(sampleTravelreimbursements);
		}));

		it('$scope.findOne() should create an array with one Travelreimbursement object fetched from XHR using a travelreimbursementId URL parameter', inject(function(Travelreimbursements) {
			// Define a sample Travelreimbursement object
			var sampleTravelreimbursement = new Travelreimbursements({
				name: 'New Travelreimbursement'
			});

			// Set the URL parameter
			$stateParams.travelreimbursementId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/travelreimbursements\/([0-9a-fA-F]{24})$/).respond(sampleTravelreimbursement);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.travelreimbursement).toEqualData(sampleTravelreimbursement);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Travelreimbursements) {
			// Create a sample Travelreimbursement object
			var sampleTravelreimbursementPostData = new Travelreimbursements({
				name: 'New Travelreimbursement'
			});

			// Create a sample Travelreimbursement response
			var sampleTravelreimbursementResponse = new Travelreimbursements({
				_id: '525cf20451979dea2c000001',
				name: 'New Travelreimbursement'
			});

			// Fixture mock form input values
			scope.name = 'New Travelreimbursement';

			// Set POST response
			$httpBackend.expectPOST('travelreimbursements', sampleTravelreimbursementPostData).respond(sampleTravelreimbursementResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Travelreimbursement was created
			expect($location.path()).toBe('/travelreimbursements/' + sampleTravelreimbursementResponse._id);
		}));

		it('$scope.update() should update a valid Travelreimbursement', inject(function(Travelreimbursements) {
			// Define a sample Travelreimbursement put data
			var sampleTravelreimbursementPutData = new Travelreimbursements({
				_id: '525cf20451979dea2c000001',
				name: 'New Travelreimbursement'
			});

			// Mock Travelreimbursement in scope
			scope.travelreimbursement = sampleTravelreimbursementPutData;

			// Set PUT response
			$httpBackend.expectPUT(/travelreimbursements\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/travelreimbursements/' + sampleTravelreimbursementPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid travelreimbursementId and remove the Travelreimbursement from the scope', inject(function(Travelreimbursements) {
			// Create new Travelreimbursement object
			var sampleTravelreimbursement = new Travelreimbursements({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Travelreimbursements array and include the Travelreimbursement
			scope.travelreimbursements = [sampleTravelreimbursement];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/travelreimbursements\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTravelreimbursement);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.travelreimbursements.length).toBe(0);
		}));
	});
}());