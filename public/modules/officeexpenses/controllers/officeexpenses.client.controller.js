'use strict';

// Officeexpenses controller
angular.module('officeexpenses').controller('OfficeexpensesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Officeexpenses',
	function($scope, $stateParams, $location, Authentication, Officeexpenses) {
		$scope.authentication = Authentication;

		// Create new Officeexpense
		$scope.create = function() {
			// Create new Officeexpense object
			var officeexpense = new Officeexpenses ({
				entryno: this.entryno,
				date: this.date,
				employeename: this.employeename,
				sno: this.sno,
				description: this.description,
				amount: this.amount,
				notes: this.notes
			});

			// Redirect after save
			officeexpense.$save(function(response) {
				$location.path('officeexpenses/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Officeexpense
		$scope.remove = function(officeexpense) {
			if ( officeexpense ) { 
				officeexpense.$remove();

				for (var i in $scope.officeexpenses) {
					if ($scope.officeexpenses [i] === officeexpense) {
						$scope.officeexpenses.splice(i, 1);
					}
				}
			} else {
				$scope.officeexpense.$remove(function() {
					$location.path('officeexpenses');
				});
			}
		};

		// Update existing Officeexpense
		$scope.update = function() {
			var officeexpense = $scope.officeexpense;

			officeexpense.$update(function() {
				$location.path('officeexpenses/' + officeexpense._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Officeexpenses
		$scope.find = function() {
			$scope.officeexpenses = Officeexpenses.query();
		};

		// Find existing Officeexpense
		$scope.findOne = function() {
			$scope.officeexpense = Officeexpenses.get({ 
				officeexpenseId: $stateParams.officeexpenseId
			});
		};
	}
]);
