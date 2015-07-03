'use strict';

(function() {
	// Enquirydetails Controller Spec
	describe('Enquirydetails Controller Tests', function() {
		// Initialize global variables
		var EnquirydetailsController,
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

			// Initialize the Enquirydetails controller.
			EnquirydetailsController = $controller('EnquirydetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Enquirydetail object fetched from XHR', inject(function(Enquirydetails) {
			// Create sample Enquirydetail using the Enquirydetails service
			var sampleEnquirydetail = new Enquirydetails({
				name: 'New Enquirydetail'
			});

			// Create a sample Enquirydetails array that includes the new Enquirydetail
			var sampleEnquirydetails = [sampleEnquirydetail];

			// Set GET response
			$httpBackend.expectGET('enquirydetails').respond(sampleEnquirydetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.enquirydetails).toEqualData(sampleEnquirydetails);
		}));

		it('$scope.findOne() should create an array with one Enquirydetail object fetched from XHR using a enquirydetailId URL parameter', inject(function(Enquirydetails) {
			// Define a sample Enquirydetail object
			var sampleEnquirydetail = new Enquirydetails({
				name: 'New Enquirydetail'
			});

			// Set the URL parameter
			$stateParams.enquirydetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/enquirydetails\/([0-9a-fA-F]{24})$/).respond(sampleEnquirydetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.enquirydetail).toEqualData(sampleEnquirydetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Enquirydetails) {
			// Create a sample Enquirydetail object
			var sampleEnquirydetailPostData = new Enquirydetails({
				name: 'New Enquirydetail'
			});

			// Create a sample Enquirydetail response
			var sampleEnquirydetailResponse = new Enquirydetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Enquirydetail'
			});

			// Fixture mock form input values
			scope.name = 'New Enquirydetail';

			// Set POST response
			$httpBackend.expectPOST('enquirydetails', sampleEnquirydetailPostData).respond(sampleEnquirydetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Enquirydetail was created
			expect($location.path()).toBe('/enquirydetails/' + sampleEnquirydetailResponse._id);
		}));

		it('$scope.update() should update a valid Enquirydetail', inject(function(Enquirydetails) {
			// Define a sample Enquirydetail put data
			var sampleEnquirydetailPutData = new Enquirydetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Enquirydetail'
			});

			// Mock Enquirydetail in scope
			scope.enquirydetail = sampleEnquirydetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/enquirydetails\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/enquirydetails/' + sampleEnquirydetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid enquirydetailId and remove the Enquirydetail from the scope', inject(function(Enquirydetails) {
			// Create new Enquirydetail object
			var sampleEnquirydetail = new Enquirydetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Enquirydetails array and include the Enquirydetail
			scope.enquirydetails = [sampleEnquirydetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/enquirydetails\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEnquirydetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.enquirydetails.length).toBe(0);
		}));
	});
}());