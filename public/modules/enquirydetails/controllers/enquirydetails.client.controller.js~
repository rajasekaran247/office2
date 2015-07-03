'use strict';

// Enquirydetails controller
angular.module('enquirydetails').controller('EnquirydetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Enquirydetails',
	function($scope, $stateParams, $location, Authentication, Enquirydetails) {
		$scope.authentication = Authentication;

		// Create new Enquirydetail
		$scope.create = function() {
			// Create new Enquirydetail object
			var enquirydetail = new Enquirydetails ({
				sno: this.sno,
				details: this.details,
				notes: this.notes
			});

			// Redirect after save
			enquirydetail.$save(function(response) {
				$location.path('enquirydetails/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Enquirydetail
		$scope.remove = function(enquirydetail) {
			if ( enquirydetail ) { 
				enquirydetail.$remove();

				for (var i in $scope.enquirydetails) {
					if ($scope.enquirydetails [i] === enquirydetail) {
						$scope.enquirydetails.splice(i, 1);
					}
				}
			} else {
				$scope.enquirydetail.$remove(function() {
					$location.path('enquirydetails');
				});
			}
		};

		// Update existing Enquirydetail
		$scope.update = function() {
			var enquirydetail = $scope.enquirydetail;

			enquirydetail.$update(function() {
				$location.path('enquirydetails/' + enquirydetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Enquirydetails
		$scope.find = function() {
			$scope.enquirydetails = Enquirydetails.query();
		};

		// Find existing Enquirydetail
		$scope.findOne = function() {
			$scope.enquirydetail = Enquirydetails.get({ 
				enquirydetailId: $stateParams.enquirydetailId
			});
		};
	}
]);
