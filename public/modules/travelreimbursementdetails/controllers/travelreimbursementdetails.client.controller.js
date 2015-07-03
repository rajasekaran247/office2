'use strict';

// Travelreimbursementdetails controller
angular.module('travelreimbursementdetails').controller('TravelreimbursementdetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Travelreimbursementdetails',
	function($scope, $stateParams, $location, Authentication, Travelreimbursementdetails) {
		$scope.authentication = Authentication;

		// Create new Travelreimbursementdetail
		$scope.create = function() {
			// Create new Travelreimbursementdetail object
			var travelreimbursementdetail = new Travelreimbursementdetails ({
				sno: this.sno,
				clientlocation: this.clientlocation,
				jobno: this.jobno,
				fromdate: this.fromdate,
				todate: this.todate,
				noofdays: this.noofdays,
				conveyance: this.conveyance,
				foodallowance: this.foodallowance,
				otherexpenses: this.otherexpenses,
				totalamount: this.totalamount
			});

			// Redirect after save
			travelreimbursementdetail.$save(function(response) {
				$location.path('travelreimbursementdetails/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Travelreimbursementdetail
		$scope.remove = function(travelreimbursementdetail) {
			if ( travelreimbursementdetail ) { 
				travelreimbursementdetail.$remove();

				for (var i in $scope.travelreimbursementdetails) {
					if ($scope.travelreimbursementdetails [i] === travelreimbursementdetail) {
						$scope.travelreimbursementdetails.splice(i, 1);
					}
				}
			} else {
				$scope.travelreimbursementdetail.$remove(function() {
					$location.path('travelreimbursementdetails');
				});
			}
		};

		// Update existing Travelreimbursementdetail
		$scope.update = function() {
			var travelreimbursementdetail = $scope.travelreimbursementdetail;

			travelreimbursementdetail.$update(function() {
				$location.path('travelreimbursementdetails/' + travelreimbursementdetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Travelreimbursementdetails
		$scope.find = function() {
			$scope.travelreimbursementdetails = Travelreimbursementdetails.query();
		};

		// Find existing Travelreimbursementdetail
		$scope.findOne = function() {
			$scope.travelreimbursementdetail = Travelreimbursementdetails.get({ 
				travelreimbursementdetailId: $stateParams.travelreimbursementdetailId
			});
		};
	}
]);
