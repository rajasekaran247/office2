'use strict';

//Invoicedetails service used to communicate Invoicedetails REST endpoints
angular.module('invoicedetails').factory('Invoicedetails', ['$resource',
	function($resource) {
		return $resource('invoicedetails/:invoicedetailId', { invoicedetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);