'use strict';

//Procedures service used to communicate Procedures REST endpoints
angular.module('procedures').factory('Procedures', ['$resource',
	function($resource) {
		return $resource('procedures/:procedureId', { procedureId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);