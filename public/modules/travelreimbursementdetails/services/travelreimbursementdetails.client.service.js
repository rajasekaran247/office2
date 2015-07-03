'use strict';

//Travelreimbursementdetails service used to communicate Travelreimbursementdetails REST endpoints
angular.module('travelreimbursementdetails').factory('Travelreimbursementdetails', ['$resource',
	function($resource) {
		return $resource('travelreimbursementdetails/:travelreimbursementdetailId', { travelreimbursementdetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);