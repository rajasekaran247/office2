'use strict';

//Odocs service used to communicate Odocs REST endpoints
angular.module('odocs').factory('Odocs', ['$resource',
	function($resource) {
		return $resource('odocs/:odocId', { odocId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);