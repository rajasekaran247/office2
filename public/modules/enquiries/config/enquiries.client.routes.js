'use strict';

//Setting up route
angular.module('enquiries').config(['$stateProvider',
	function($stateProvider) {
		// Enquiries state routing
		$stateProvider.
		state('listEnquiries', {
			url: '/enquiries',
			templateUrl: 'modules/enquiries/views/list-enquiries.client.view.html'
		}).
		state('createEnquiry', {
			url: '/enquiries/create',
			templateUrl: 'modules/enquiries/views/create-enquiry.client.view.html'
		}).
		state('viewEnquiry', {
			url: '/enquiries/:enquiryId',
			templateUrl: 'modules/enquiries/views/view-enquiry.client.view.html'
		}).
		state('editEnquiry', {
			url: '/enquiries/:enquiryId/edit',
			templateUrl: 'modules/enquiries/views/edit-enquiry.client.view.html'
		});
	}
]);