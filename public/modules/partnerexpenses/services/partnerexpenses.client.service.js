'use strict';

//Partnerexpenses service used to communicate Partnerexpenses REST endpoints
angular.module('partnerexpenses').factory('Partnerexpenses', ['$resource',
	function($resource) {
		return $resource('partnerexpenses/:partnerexpenseId', { partnerexpenseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);