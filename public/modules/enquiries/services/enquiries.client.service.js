'use strict';

//Enquiries service used to communicate Enquiries REST endpoints
angular.module('enquiries').factory('Enquiries', ['$resource',
	function($resource) {
		return $resource('enquiries/:enquiryId', { enquiryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);