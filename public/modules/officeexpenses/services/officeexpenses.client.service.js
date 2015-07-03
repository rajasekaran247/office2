'use strict';

//Officeexpenses service used to communicate Officeexpenses REST endpoints
angular.module('officeexpenses').factory('Officeexpenses', ['$resource',
	function($resource) {
		return $resource('officeexpenses/:officeexpenseId', { officeexpenseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);