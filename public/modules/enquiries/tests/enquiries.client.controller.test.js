'use strict';

(function() {
	// Enquiries Controller Spec
	describe('Enquiries Controller Tests', function() {
		// Initialize global variables
		var EnquiriesController,
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

			// Initialize the Enquiries controller.
			EnquiriesController = $controller('EnquiriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Enquiry object fetched from XHR', inject(function(Enquiries) {
			// Create sample Enquiry using the Enquiries service
			var sampleEnquiry = new Enquiries({
				name: 'New Enquiry'
			});

			// Create a sample Enquiries array that includes the new Enquiry
			var sampleEnquiries = [sampleEnquiry];

			// Set GET response
			$httpBackend.expectGET('enquiries').respond(sampleEnquiries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.enquiries).toEqualData(sampleEnquiries);
		}));

		it('$scope.findOne() should create an array with one Enquiry object fetched from XHR using a enquiryId URL parameter', inject(function(Enquiries) {
			// Define a sample Enquiry object
			var sampleEnquiry = new Enquiries({
				name: 'New Enquiry'
			});

			// Set the URL parameter
			$stateParams.enquiryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/enquiries\/([0-9a-fA-F]{24})$/).respond(sampleEnquiry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.enquiry).toEqualData(sampleEnquiry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Enquiries) {
			// Create a sample Enquiry object
			var sampleEnquiryPostData = new Enquiries({
				name: 'New Enquiry'
			});

			// Create a sample Enquiry response
			var sampleEnquiryResponse = new Enquiries({
				_id: '525cf20451979dea2c000001',
				name: 'New Enquiry'
			});

			// Fixture mock form input values
			scope.name = 'New Enquiry';

			// Set POST response
			$httpBackend.expectPOST('enquiries', sampleEnquiryPostData).respond(sampleEnquiryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Enquiry was created
			expect($location.path()).toBe('/enquiries/' + sampleEnquiryResponse._id);
		}));

		it('$scope.update() should update a valid Enquiry', inject(function(Enquiries) {
			// Define a sample Enquiry put data
			var sampleEnquiryPutData = new Enquiries({
				_id: '525cf20451979dea2c000001',
				name: 'New Enquiry'
			});

			// Mock Enquiry in scope
			scope.enquiry = sampleEnquiryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/enquiries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/enquiries/' + sampleEnquiryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid enquiryId and remove the Enquiry from the scope', inject(function(Enquiries) {
			// Create new Enquiry object
			var sampleEnquiry = new Enquiries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Enquiries array and include the Enquiry
			scope.enquiries = [sampleEnquiry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/enquiries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEnquiry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.enquiries.length).toBe(0);
		}));
	});
}());