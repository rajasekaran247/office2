'use strict';

// Invoicedetails controller
angular.module('invoicedetails').controller('InvoicedetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Invoicedetails',
	function($scope, $stateParams, $location, Authentication, Invoicedetails) {
		$scope.authentication = Authentication;

		// Create new Invoicedetail
		$scope.create = function() {
			// Create new Invoicedetail object
			var invoicedetail = new Invoicedetails ({
				sno: this.sno,
				particulars: this.particulars,	
				amount: this.amount,
				notes: this.notes
			});

			// Redirect after save
			invoicedetail.$save(function(response) {
				$location.path('invoicedetails/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Invoicedetail
		$scope.remove = function(invoicedetail) {
			if ( invoicedetail ) { 
				invoicedetail.$remove();

				for (var i in $scope.invoicedetails) {
					if ($scope.invoicedetails [i] === invoicedetail) {
						$scope.invoicedetails.splice(i, 1);
					}
				}
			} else {
				$scope.invoicedetail.$remove(function() {
					$location.path('invoicedetails');
				});
			}
		};

		// Update existing Invoicedetail
		$scope.update = function() {
			var invoicedetail = $scope.invoicedetail;

			invoicedetail.$update(function() {
				$location.path('invoicedetails/' + invoicedetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Invoicedetails
		$scope.find = function() {
			$scope.invoicedetails = Invoicedetails.query();
		};

		// Find existing Invoicedetail
		$scope.findOne = function() {
			$scope.invoicedetail = Invoicedetails.get({ 
				invoicedetailId: $stateParams.invoicedetailId
			});
		};
	}
]);
