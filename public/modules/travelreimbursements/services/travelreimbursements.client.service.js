'use strict';

//Travelreimbursements service used to communicate Travelreimbursements REST endpoints
angular.module('travelreimbursements').factory('Travelreimbursements', ['$resource',
	function($resource) {
		return $resource('travelreimbursements/:travelreimbursementId', { travelreimbursementId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);