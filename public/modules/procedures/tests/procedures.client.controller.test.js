'use strict';

(function() {
	// Procedures Controller Spec
	describe('Procedures Controller Tests', function() {
		// Initialize global variables
		var ProceduresController,
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

			// Initialize the Procedures controller.
			ProceduresController = $controller('ProceduresController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Procedure object fetched from XHR', inject(function(Procedures) {
			// Create sample Procedure using the Procedures service
			var sampleProcedure = new Procedures({
				name: 'New Procedure'
			});

			// Create a sample Procedures array that includes the new Procedure
			var sampleProcedures = [sampleProcedure];

			// Set GET response
			$httpBackend.expectGET('procedures').respond(sampleProcedures);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.procedures).toEqualData(sampleProcedures);
		}));

		it('$scope.findOne() should create an array with one Procedure object fetched from XHR using a procedureId URL parameter', inject(function(Procedures) {
			// Define a sample Procedure object
			var sampleProcedure = new Procedures({
				name: 'New Procedure'
			});

			// Set the URL parameter
			$stateParams.procedureId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/procedures\/([0-9a-fA-F]{24})$/).respond(sampleProcedure);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.procedure).toEqualData(sampleProcedure);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Procedures) {
			// Create a sample Procedure object
			var sampleProcedurePostData = new Procedures({
				name: 'New Procedure'
			});

			// Create a sample Procedure response
			var sampleProcedureResponse = new Procedures({
				_id: '525cf20451979dea2c000001',
				name: 'New Procedure'
			});

			// Fixture mock form input values
			scope.name = 'New Procedure';

			// Set POST response
			$httpBackend.expectPOST('procedures', sampleProcedurePostData).respond(sampleProcedureResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Procedure was created
			expect($location.path()).toBe('/procedures/' + sampleProcedureResponse._id);
		}));

		it('$scope.update() should update a valid Procedure', inject(function(Procedures) {
			// Define a sample Procedure put data
			var sampleProcedurePutData = new Procedures({
				_id: '525cf20451979dea2c000001',
				name: 'New Procedure'
			});

			// Mock Procedure in scope
			scope.procedure = sampleProcedurePutData;

			// Set PUT response
			$httpBackend.expectPUT(/procedures\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/procedures/' + sampleProcedurePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid procedureId and remove the Procedure from the scope', inject(function(Procedures) {
			// Create new Procedure object
			var sampleProcedure = new Procedures({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Procedures array and include the Procedure
			scope.procedures = [sampleProcedure];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/procedures\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProcedure);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.procedures.length).toBe(0);
		}));
	});
}());