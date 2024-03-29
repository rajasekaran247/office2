'use strict';

(function() {
	// Invoicedetails Controller Spec
	describe('Invoicedetails Controller Tests', function() {
		// Initialize global variables
		var InvoicedetailsController,
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

			// Initialize the Invoicedetails controller.
			InvoicedetailsController = $controller('InvoicedetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Invoicedetail object fetched from XHR', inject(function(Invoicedetails) {
			// Create sample Invoicedetail using the Invoicedetails service
			var sampleInvoicedetail = new Invoicedetails({
				name: 'New Invoicedetail'
			});

			// Create a sample Invoicedetails array that includes the new Invoicedetail
			var sampleInvoicedetails = [sampleInvoicedetail];

			// Set GET response
			$httpBackend.expectGET('invoicedetails').respond(sampleInvoicedetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.invoicedetails).toEqualData(sampleInvoicedetails);
		}));

		it('$scope.findOne() should create an array with one Invoicedetail object fetched from XHR using a invoicedetailId URL parameter', inject(function(Invoicedetails) {
			// Define a sample Invoicedetail object
			var sampleInvoicedetail = new Invoicedetails({
				name: 'New Invoicedetail'
			});

			// Set the URL parameter
			$stateParams.invoicedetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/invoicedetails\/([0-9a-fA-F]{24})$/).respond(sampleInvoicedetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.invoicedetail).toEqualData(sampleInvoicedetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Invoicedetails) {
			// Create a sample Invoicedetail object
			var sampleInvoicedetailPostData = new Invoicedetails({
				name: 'New Invoicedetail'
			});

			// Create a sample Invoicedetail response
			var sampleInvoicedetailResponse = new Invoicedetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Invoicedetail'
			});

			// Fixture mock form input values
			scope.name = 'New Invoicedetail';

			// Set POST response
			$httpBackend.expectPOST('invoicedetails', sampleInvoicedetailPostData).respond(sampleInvoicedetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Invoicedetail was created
			expect($location.path()).toBe('/invoicedetails/' + sampleInvoicedetailResponse._id);
		}));

		it('$scope.update() should update a valid Invoicedetail', inject(function(Invoicedetails) {
			// Define a sample Invoicedetail put data
			var sampleInvoicedetailPutData = new Invoicedetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Invoicedetail'
			});

			// Mock Invoicedetail in scope
			scope.invoicedetail = sampleInvoicedetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/invoicedetails\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/invoicedetails/' + sampleInvoicedetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid invoicedetailId and remove the Invoicedetail from the scope', inject(function(Invoicedetails) {
			// Create new Invoicedetail object
			var sampleInvoicedetail = new Invoicedetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Invoicedetails array and include the Invoicedetail
			scope.invoicedetails = [sampleInvoicedetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/invoicedetails\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleInvoicedetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.invoicedetails.length).toBe(0);
		}));
	});
}());