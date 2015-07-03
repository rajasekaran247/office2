'use strict';

//Setting up route
angular.module('enquirydetails').config(['$stateProvider',
	function($stateProvider) {
		// Enquirydetails state routing
		$stateProvider.
		state('listEnquirydetails', {
			url: '/enquirydetails',
			templateUrl: 'modules/enquirydetails/views/list-enquirydetails.client.view.html'
		}).
		state('createEnquirydetail', {
			url: '/enquirydetails/create',
			templateUrl: 'modules/enquirydetails/views/create-enquirydetail.client.view.html'
		}).
		state('viewEnquirydetail', {
			url: '/enquirydetails/:enquirydetailId',
			templateUrl: 'modules/enquirydetails/views/view-enquirydetail.client.view.html'
		}).
		state('editEnquirydetail', {
			url: '/enquirydetails/:enquirydetailId/edit',
			templateUrl: 'modules/enquirydetails/views/edit-enquirydetail.client.view.html'
		});
	}
]);