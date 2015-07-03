'use strict';

//Setting up route
angular.module('officeexpenses').config(['$stateProvider',
	function($stateProvider) {
		// Officeexpenses state routing
		$stateProvider.
		state('listOfficeexpenses', {
			url: '/officeexpenses',
			templateUrl: 'modules/officeexpenses/views/list-officeexpenses.client.view.html'
		}).
		state('createOfficeexpense', {
			url: '/officeexpenses/create',
			templateUrl: 'modules/officeexpenses/views/create-officeexpense.client.view.html'
		}).
		state('viewOfficeexpense', {
			url: '/officeexpenses/:officeexpenseId',
			templateUrl: 'modules/officeexpenses/views/view-officeexpense.client.view.html'
		}).
		state('editOfficeexpense', {
			url: '/officeexpenses/:officeexpenseId/edit',
			templateUrl: 'modules/officeexpenses/views/edit-officeexpense.client.view.html'
		});
	}
]);