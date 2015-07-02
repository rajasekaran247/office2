'use strict';

(function() {
	// Odocs Controller Spec
	describe('Odocs Controller Tests', function() {
		// Initialize global variables
		var OdocsController,
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

			// Initialize the Odocs controller.
			OdocsController = $controller('OdocsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Odoc object fetched from XHR', inject(function(Odocs) {
			// Create sample Odoc using the Odocs service
			var sampleOdoc = new Odocs({
				name: 'New Odoc'
			});

			// Create a sample Odocs array that includes the new Odoc
			var sampleOdocs = [sampleOdoc];

			// Set GET response
			$httpBackend.expectGET('odocs').respond(sampleOdocs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.odocs).toEqualData(sampleOdocs);
		}));

		it('$scope.findOne() should create an array with one Odoc object fetched from XHR using a odocId URL parameter', inject(function(Odocs) {
			// Define a sample Odoc object
			var sampleOdoc = new Odocs({
				name: 'New Odoc'
			});

			// Set the URL parameter
			$stateParams.odocId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/odocs\/([0-9a-fA-F]{24})$/).respond(sampleOdoc);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.odoc).toEqualData(sampleOdoc);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Odocs) {
			// Create a sample Odoc object
			var sampleOdocPostData = new Odocs({
				name: 'New Odoc'
			});

			// Create a sample Odoc response
			var sampleOdocResponse = new Odocs({
				_id: '525cf20451979dea2c000001',
				name: 'New Odoc'
			});

			// Fixture mock form input values
			scope.name = 'New Odoc';

			// Set POST response
			$httpBackend.expectPOST('odocs', sampleOdocPostData).respond(sampleOdocResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Odoc was created
			expect($location.path()).toBe('/odocs/' + sampleOdocResponse._id);
		}));

		it('$scope.update() should update a valid Odoc', inject(function(Odocs) {
			// Define a sample Odoc put data
			var sampleOdocPutData = new Odocs({
				_id: '525cf20451979dea2c000001',
				name: 'New Odoc'
			});

			// Mock Odoc in scope
			scope.odoc = sampleOdocPutData;

			// Set PUT response
			$httpBackend.expectPUT(/odocs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/odocs/' + sampleOdocPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid odocId and remove the Odoc from the scope', inject(function(Odocs) {
			// Create new Odoc object
			var sampleOdoc = new Odocs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Odocs array and include the Odoc
			scope.odocs = [sampleOdoc];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/odocs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOdoc);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.odocs.length).toBe(0);
		}));
	});
}());