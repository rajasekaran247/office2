'use strict';

// Notes controller
angular.module('notes').controller('NotesController', ['$scope', '$filter', '$stateParams', '$location', 'Authentication', 'Notes',
	function($scope, $filter, $stateParams, $location, Authentication, Notes) {
		$scope.authentication = Authentication;

		// Create new Note
		$scope.create = function() {
			// Create new Note object
			var note = new Notes ({
				JobId: this.JobId,
				Notesdate: this.Notesdate,
				Category: this.Category,
				Note: this.Note,
				Remindon: this.Remindon,
				Reminderemailaddress: this.Reminderemailaddress,
				Repeatreminderonyear: this.Repeatreminderonyear,
				Repeatreminderonmonth: this.Repeatreminderonmonth,
				Repeatreminderondays: this.Repeatreminderondays,
				Repeatreminderendby: this.Repeatreminderendby,
				CreatedBy: this.CreatedBy
			});

			// Redirect after save
			note.$save(function(response) {
				$location.path('notes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Note
		$scope.remove = function(note) {
			if ( note ) { 
				note.$remove();

				for (var i in $scope.notes) {
					if ($scope.notes [i] === note) {
						$scope.notes.splice(i, 1);
					}
				}
			} else {
				$scope.note.$remove(function() {
					$location.path('notes');
				});
			}
		};

		// Update existing Note
		$scope.update = function() {
			var note = $scope.note;

			note.$update(function() {
				$location.path('notes/' + note._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Notes
		$scope.find = function() {
			$scope.notes = Notes.query();
		};

		// Find existing Note
		$scope.findOne = function() {
			$scope.note = Notes.get({ 
				noteId: $stateParams.noteId
			});
			console.log('$scope.note',$scope.note);
		};
	}
]);
