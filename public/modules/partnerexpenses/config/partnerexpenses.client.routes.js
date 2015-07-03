'use strict';

//Setting up route
angular.module('partnerexpenses').config(['$stateProvider',
	function($stateProvider) {
		// Partnerexpenses state routing
		$stateProvider.
		state('listPartnerexpenses', {
			url: '/partnerexpenses',
			templateUrl: 'modules/partnerexpenses/views/list-partnerexpenses.client.view.html'
		}).
		state('createPartnerexpense', {
			url: '/partnerexpenses/create',
			templateUrl: 'modules/partnerexpenses/views/create-partnerexpense.client.view.html'
		}).
		state('viewPartnerexpense', {
			url: '/partnerexpenses/:partnerexpenseId',
			templateUrl: 'modules/partnerexpenses/views/view-partnerexpense.client.view.html'
		}).
		state('editPartnerexpense', {
			url: '/partnerexpenses/:partnerexpenseId/edit',
			templateUrl: 'modules/partnerexpenses/views/edit-partnerexpense.client.view.html'
		});
	}
]);