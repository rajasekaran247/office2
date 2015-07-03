'use strict';

//Setting up route
angular.module('invoicedetails').config(['$stateProvider',
	function($stateProvider) {
		// Invoicedetails state routing
		$stateProvider.
		state('listInvoicedetails', {
			url: '/invoicedetails',
			templateUrl: 'modules/invoicedetails/views/list-invoicedetails.client.view.html'
		}).
		state('createInvoicedetail', {
			url: '/invoicedetails/create',
			templateUrl: 'modules/invoicedetails/views/create-invoicedetail.client.view.html'
		}).
		state('viewInvoicedetail', {
			url: '/invoicedetails/:invoicedetailId',
			templateUrl: 'modules/invoicedetails/views/view-invoicedetail.client.view.html'
		}).
		state('editInvoicedetail', {
			url: '/invoicedetails/:invoicedetailId/edit',
			templateUrl: 'modules/invoicedetails/views/edit-invoicedetail.client.view.html'
		});
	}
]);