'use strict';

(function() {
	// Travelreimbursementdetails Controller Spec
	describe('Travelreimbursementdetails Controller Tests', function() {
		// Initialize global variables
		var TravelreimbursementdetailsController,
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

			// Initialize the Travelreimbursementdetails controller.
			TravelreimbursementdetailsController = $controller('TravelreimbursementdetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Travelreimbursementdetail object fetched from XHR', inject(function(Travelreimbursementdetails) {
			// Create sample Travelreimbursementdetail using the Travelreimbursementdetails service
			var sampleTravelreimbursementdetail = new Travelreimbursementdetails({
				name: 'New Travelreimbursementdetail'
			});

			// Create a sample Travelreimbursementdetails array that includes the new Travelreimbursementdetail
			var sampleTravelreimbursementdetails = [sampleTravelreimbursementdetail];

			// Set GET response
			$httpBackend.expectGET('travelreimbursementdetails').respond(sampleTravelreimbursementdetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.travelreimbursementdetails).toEqualData(sampleTravelreimbursementdetails);
		}));

		it('$scope.findOne() should create an array with one Travelreimbursementdetail object fetched from XHR using a travelreimbursementdetailId URL parameter', inject(function(Travelreimbursementdetails) {
			// Define a sample Travelreimbursementdetail object
			var sampleTravelreimbursementdetail = new Travelreimbursementdetails({
				name: 'New Travelreimbursementdetail'
			});

			// Set the URL parameter
			$stateParams.travelreimbursementdetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/travelreimbursementdetails\/([0-9a-fA-F]{24})$/).respond(sampleTravelreimbursementdetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.travelreimbursementdetail).toEqualData(sampleTravelreimbursementdetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Travelreimbursementdetails) {
			// Create a sample Travelreimbursementdetail object
			var sampleTravelreimbursementdetailPostData = new Travelreimbursementdetails({
				name: 'New Travelreimbursementdetail'
			});

			// Create a sample Travelreimbursementdetail response
			var sampleTravelreimbursementdetailResponse = new Travelreimbursementdetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Travelreimbursementdetail'
			});

			// Fixture mock form input values
			scope.name = 'New Travelreimbursementdetail';

			// Set POST response
			$httpBackend.expectPOST('travelreimbursementdetails', sampleTravelreimbursementdetailPostData).respond(sampleTravelreimbursementdetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Travelreimbursementdetail was created
			expect($location.path()).toBe('/travelreimbursementdetails/' + sampleTravelreimbursementdetailResponse._id);
		}));

		it('$scope.update() should update a valid Travelreimbursementdetail', inject(function(Travelreimbursementdetails) {
			// Define a sample Travelreimbursementdetail put data
			var sampleTravelreimbursementdetailPutData = new Travelreimbursementdetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Travelreimbursementdetail'
			});

			// Mock Travelreimbursementdetail in scope
			scope.travelreimbursementdetail = sampleTravelreimbursementdetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/travelreimbursementdetails\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/travelreimbursementdetails/' + sampleTravelreimbursementdetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid travelreimbursementdetailId and remove the Travelreimbursementdetail from the scope', inject(function(Travelreimbursementdetails) {
			// Create new Travelreimbursementdetail object
			var sampleTravelreimbursementdetail = new Travelreimbursementdetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Travelreimbursementdetails array and include the Travelreimbursementdetail
			scope.travelreimbursementdetails = [sampleTravelreimbursementdetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/travelreimbursementdetails\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTravelreimbursementdetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.travelreimbursementdetails.length).toBe(0);
		}));
	});
}());