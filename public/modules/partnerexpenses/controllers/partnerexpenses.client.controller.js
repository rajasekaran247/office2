'use strict';

// Partnerexpenses controller
angular.module('partnerexpenses').controller('PartnerexpensesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Partnerexpenses',
	function($scope, $stateParams, $location, Authentication, Partnerexpenses) {
		$scope.authentication = Authentication;

		// Create new Partnerexpense
		$scope.create = function() {
			// Create new Partnerexpense object
			var partnerexpense = new Partnerexpenses ({
				entryno: this.entryno,
				date: this.date,
				partnername: this.partnername,
				sno: this.sno,
				description: this.description,
				amount: this.amount,
				notes: this.notes
			});

			// Redirect after save
			partnerexpense.$save(function(response) {
				$location.path('partnerexpenses/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Partnerexpense
		$scope.remove = function(partnerexpense) {
			if ( partnerexpense ) { 
				partnerexpense.$remove();

				for (var i in $scope.partnerexpenses) {
					if ($scope.partnerexpenses [i] === partnerexpense) {
						$scope.partnerexpenses.splice(i, 1);
					}
				}
			} else {
				$scope.partnerexpense.$remove(function() {
					$location.path('partnerexpenses');
				});
			}
		};

		// Update existing Partnerexpense
		$scope.update = function() {
			var partnerexpense = $scope.partnerexpense;

			partnerexpense.$update(function() {
				$location.path('partnerexpenses/' + partnerexpense._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Partnerexpenses
		$scope.find = function() {
			$scope.partnerexpenses = Partnerexpenses.query();
		};

		// Find existing Partnerexpense
		$scope.findOne = function() {
			$scope.partnerexpense = Partnerexpenses.get({ 
				partnerexpenseId: $stateParams.partnerexpenseId
			});
		};
	}
]);
