'use strict';

// Contacts controller
angular.module('contacts').controller('ContactsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Contacts',
	function($scope, $stateParams, $location, Authentication, Contacts) {
		$scope.authentication = Authentication;

		// Create new Contact
		$scope.create = function() {
			// Create new Contact object
			var contact = new Contacts ({
				Name: this.Name,
				Code: this.Code,
				Type: this.Type,
				ContactType: this.ContactType,	
				Mailing: this.Mailing,
				Salutation: this.Salutation,
				TAN: this.TAN,
				PAN: this.PAN,
				TIN: this.TIN,
				ServiceTaxNumber: this.ServiceTaxNumber,
				AssignedToPartner: this.AssignedToPartner,
				AssignedToManager: this.AssignedToManager,	
				AssignedToEntities: this.AssignedToEntities,
				AssignedToBranchLocation: this.AssignedToBranchLocation,
				PostalAddressAddressee: this.PostalAddressAddressee,
				PostalAddressAddress: this.PostalAddressAddress,
				PostalAddressCity: this.PostalAddressCity,
				PostalAddressState: this.PostalAddressState,
				PostalAddressPostcode: this.PostalAddressPostcode,
				PostalAddressCountry: this.PostalAddressCountry,
				CommunicationsWorkPhone: this.CommunicationsWorkPhone,
				CommunicationsMobile: this.CommunicationsMobile,
				CommunicationsSkype: this.CommunicationsSkype,
				CommunicationsHomePhone: this.CommunicationsHomePhone,	
				CommunicationsFax: this.CommunicationsFax,
				CommunicationsTwitter: this.CommunicationsTwitter,
				CommunicationsEmail: this.CommunicationsEmail,
				CommunicationsLinkedIn: this.CommunicationsLinkedIn,
				CommunicationsWebsite: this.CommunicationsWebsite,
				MoreAbouttheContactTaxYearEnd: this.MoreAbouttheContactTaxYearEnd,
				MoreAbouttheContactClientType: this.MoreAbouttheContactClientType,
				MoreAbouttheContactClientTypeSubcategory: this.MoreAbouttheContactClientTypeSubcategory,
				NoofEmployees: this.NoofEmployees,
				Inbusinesssince: this.Inbusinesssince,
				AnnualAccountsSchedulingAnnualAccountsMonth: this.AnnualAccountsSchedulingAnnualAccountsMonth,
				ClientHistoryClientFrom: this.ClientHistoryClientFrom,
				ClientHistoryClientUntil: this.ClientHistoryClientUntil
			});     

			// Redirect after save
			contact.$save(function(response) {
				$location.path('contacts/' + response._id);

				// Clear form fields
				//$scope.contact = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Contact
		$scope.remove = function(contact) {
			if ( contact ) { 
				contact.$remove();

				for (var i in $scope.contacts) {
					if ($scope.contacts [i] === contact) {
						$scope.contacts.splice(i, 1);
					}
				}
			} else {
				$scope.contact.$remove(function() {
					$location.path('contacts');
				});
			}
		};

		// Update existing Contact
		$scope.update = function() {
			var contact = $scope.contact;

			contact.$update(function() {
				$location.path('contacts/' + contact._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Contacts
		$scope.find = function() {
			$scope.contacts = Contacts.query();
		};

		// Find existing Contact
		$scope.findOne = function() {
			$scope.contact = Contacts.get({ 
				contactId: $stateParams.contactId
			});
		};
	}
]);
