'use strict';

//Setting up route
angular.module('travelreimbursementdetails').config(['$stateProvider',
	function($stateProvider) {
		// Travelreimbursementdetails state routing
		$stateProvider.
		state('listTravelreimbursementdetails', {
			url: '/travelreimbursementdetails',
			templateUrl: 'modules/travelreimbursementdetails/views/list-travelreimbursementdetails.client.view.html'
		}).
		state('createTravelreimbursementdetail', {
			url: '/travelreimbursementdetails/create',
			templateUrl: 'modules/travelreimbursementdetails/views/create-travelreimbursementdetail.client.view.html'
		}).
		state('viewTravelreimbursementdetail', {
			url: '/travelreimbursementdetails/:travelreimbursementdetailId',
			templateUrl: 'modules/travelreimbursementdetails/views/view-travelreimbursementdetail.client.view.html'
		}).
		state('editTravelreimbursementdetail', {
			url: '/travelreimbursementdetails/:travelreimbursementdetailId/edit',
			templateUrl: 'modules/travelreimbursementdetails/views/edit-travelreimbursementdetail.client.view.html'
		});
	}
]);