'use strict';

// Travelreimbursements controller
angular.module('travelreimbursements').controller('TravelreimbursementsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Travelreimbursements',
	function($scope, $stateParams, $location, Authentication, Travelreimbursements) {
		$scope.authentication = Authentication;

		// Create new Travelreimbursement
		$scope.create = function() {
			// Create new Travelreimbursement object
			var travelreimbursement = new Travelreimbursements ({
				entryno: this.entryno,
				entrydate: this.entrydate,
				employeename: this.employeename,
				partnername: this.partnername
			});

			// Redirect after save
			travelreimbursement.$save(function(response) {
				$location.path('travelreimbursements/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Travelreimbursement
		$scope.remove = function(travelreimbursement) {
			if ( travelreimbursement ) { 
				travelreimbursement.$remove();

				for (var i in $scope.travelreimbursements) {
					if ($scope.travelreimbursements [i] === travelreimbursement) {
						$scope.travelreimbursements.splice(i, 1);
					}
				}
			} else {
				$scope.travelreimbursement.$remove(function() {
					$location.path('travelreimbursements');
				});
			}
		};

		// Update existing Travelreimbursement
		$scope.update = function() {
			var travelreimbursement = $scope.travelreimbursement;

			travelreimbursement.$update(function() {
				$location.path('travelreimbursements/' + travelreimbursement._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Travelreimbursements
		$scope.find = function() {
			$scope.travelreimbursements = Travelreimbursements.query();
		};

		// Find existing Travelreimbursement
		$scope.findOne = function() {
			$scope.travelreimbursement = Travelreimbursements.get({ 
				travelreimbursementId: $stateParams.travelreimbursementId
			});
		};
	}
]);
