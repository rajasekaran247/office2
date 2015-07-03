'use strict';

// Enquiries controller
angular.module('enquiries').controller('EnquiriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Enquiries',
	function($scope, $stateParams, $location, Authentication, Enquiries) {
		$scope.authentication = Authentication;

		// Create new Enquiry
		$scope.create = function() {
			// Create new Enquiry object
			var enquiry = new Enquiries ({
				enquiryno: this.enquiryno,
				enquirydate: this.enquirydate,
				clientname: this.clientname,
				handlingresource: this.handlingresource,
				areaofenquiry: this.areaofenquiry,
				modeofreceipt: this.modeofreceipt,
				billable: this.billable,
				status: this.status,
				groupaffilation: this.groupaffilation,
				preparedby: this.preparedby,
				remarks: this.remarks
			});

			// Redirect after save
			enquiry.$save(function(response) {
				$location.path('enquiries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Enquiry
		$scope.remove = function(enquiry) {
			if ( enquiry ) { 
				enquiry.$remove();

				for (var i in $scope.enquiries) {
					if ($scope.enquiries [i] === enquiry) {
						$scope.enquiries.splice(i, 1);
					}
				}
			} else {
				$scope.enquiry.$remove(function() {
					$location.path('enquiries');
				});
			}
		};

		// Update existing Enquiry
		$scope.update = function() {
			var enquiry = $scope.enquiry;

			enquiry.$update(function() {
				$location.path('enquiries/' + enquiry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Enquiries
		$scope.find = function() {
			$scope.enquiries = Enquiries.query();
		};

		// Find existing Enquiry
		$scope.findOne = function() {
			$scope.enquiry = Enquiries.get({ 
				enquiryId: $stateParams.enquiryId
			});
		};
	}
]);
