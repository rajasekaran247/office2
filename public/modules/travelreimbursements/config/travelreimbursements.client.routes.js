'use strict';

//Setting up route
angular.module('travelreimbursements').config(['$stateProvider',
	function($stateProvider) {
		// Travelreimbursements state routing
		$stateProvider.
		state('listTravelreimbursements', {
			url: '/travelreimbursements',
			templateUrl: 'modules/travelreimbursements/views/list-travelreimbursements.client.view.html'
		}).
		state('createTravelreimbursement', {
			url: '/travelreimbursements/create',
			templateUrl: 'modules/travelreimbursements/views/create-travelreimbursement.client.view.html'
		}).
		state('viewTravelreimbursement', {
			url: '/travelreimbursements/:travelreimbursementId',
			templateUrl: 'modules/travelreimbursements/views/view-travelreimbursement.client.view.html'
		}).
		state('editTravelreimbursement', {
			url: '/travelreimbursements/:travelreimbursementId/edit',
			templateUrl: 'modules/travelreimbursements/views/edit-travelreimbursement.client.view.html'
		});
	}
]);