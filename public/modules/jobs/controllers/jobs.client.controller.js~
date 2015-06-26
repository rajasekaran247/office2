'use strict';

// Jobs controller
angular.module('jobs').controller('JobsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Jobs',
	function($scope, $stateParams, $location, Authentication, Jobs) {
		$scope.authentication = Authentication;

		// Create new Job
		$scope.create = function() {
			// Create new Job object
			var job = new Jobs ({
				Client: this.Client,
				JobType: this.JobType,
				PeriodEnded: this.PeriodEnded,
				Entities: this.Entities,
				BranchLocation: this.BranchLocation,
				JobOwner: this.JobOwner,
				CurrentlyResponsible: this.CurrentlyResponsible,
				TargetEndDate: this.TargetEndDate,
				JobStatus: this.JobStatus,
				Priority: this.Priority,
				JobDetails: this.JobDetails,
				OpeningWIP: this.OpeningWIP,
				OpeningWIPDescription: this.OpeningWIPDescription,
				AgreedFee: this.AgreedFee,
				BudgetTotal: this.BudgetTotal	
			});

			// Redirect after save
			job.$save(function(response) {
				$location.path('jobs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Job
		$scope.remove = function(job) {
			if ( job ) { 
				job.$remove();

				for (var i in $scope.jobs) {
					if ($scope.jobs [i] === job) {
						$scope.jobs.splice(i, 1);
					}
				}
			} else {
				$scope.job.$remove(function() {
					$location.path('jobs');
				});
			}
		};

		// Update existing Job
		$scope.update = function() {
			var job = $scope.job;

			job.$update(function() {
				$location.path('jobs/' + job._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Jobs
		$scope.find = function() {
			$scope.jobs = Jobs.query();
		};

		// Find existing Job
		$scope.findOne = function() {
			$scope.job = Jobs.get({ 
				jobId: $stateParams.jobId
			});
		};
	}
]);
