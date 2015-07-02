'use strict';

// Odocs controller
angular.module('odocs').controller('OdocsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Odocs',
	function($scope, $stateParams, $location, Authentication, Odocs) {
		$scope.authentication = Authentication;

		// Create new Odoc
		$scope.create = function() {
			// Create new Odoc object
			var odoc = new Odocs ({
				jobid: this.jobid,
				file: this.file
			});

			// Redirect after save
			odoc.$save(function(response) {
				$location.path('odocs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Odoc
		$scope.remove = function(odoc) {
			if ( odoc ) { 
				odoc.$remove();

				for (var i in $scope.odocs) {
					if ($scope.odocs [i] === odoc) {
						$scope.odocs.splice(i, 1);
					}
				}
			} else {
				$scope.odoc.$remove(function() {
					$location.path('odocs');
				});
			}
		};

		// Update existing Odoc
		$scope.update = function() {
			var odoc = $scope.odoc;

			odoc.$update(function() {
				$location.path('odocs/' + odoc._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Odocs
		$scope.find = function() {
			$scope.odocs = Odocs.query();
		};

		// Find existing Odoc
		$scope.findOne = function() {
			$scope.odoc = Odocs.get({ 
				odocId: $stateParams.odocId
			});
		};
	}
]);
