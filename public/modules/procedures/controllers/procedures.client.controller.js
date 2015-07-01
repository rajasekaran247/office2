'use strict';

// Procedures controller
angular.module('procedures').controller('ProceduresController', ['$scope', '$stateParams', '$location', 'Authentication', 'Procedures',
	function($scope, $stateParams, $location, Authentication, Procedures) {
		$scope.authentication = Authentication;

		// Create new Procedure
		$scope.create = function() {
			// Create new Procedure object
			var procedure = new Procedures ({
				jobid: this.jobid,
				content: this.content
			});

			// Redirect after save
			procedure.$save(function(response) {
				$location.path('procedures/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Procedure
		$scope.remove = function(procedure) {
			if ( procedure ) { 
				procedure.$remove();

				for (var i in $scope.procedures) {
					if ($scope.procedures [i] === procedure) {
						$scope.procedures.splice(i, 1);
					}
				}
			} else {
				$scope.procedure.$remove(function() {
					$location.path('procedures');
				});
			}
		};

		// Update existing Procedure
		$scope.update = function() {
			var procedure = $scope.procedure;

			procedure.$update(function() {
				$location.path('procedures/' + procedure._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Procedures
		$scope.find = function() {
			$scope.procedures = Procedures.query();
		};

		// Find existing Procedure
		$scope.findOne = function() {
			$scope.procedure = Procedures.get({ 
				procedureId: $stateParams.procedureId
			});
		};
	}
]);
