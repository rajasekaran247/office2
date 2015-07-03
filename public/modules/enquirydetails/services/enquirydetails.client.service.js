'use strict';

//Enquirydetails service used to communicate Enquirydetails REST endpoints
angular.module('enquirydetails').factory('Enquirydetails', ['$resource',
	function($resource) {
		return $resource('enquirydetails/:enquirydetailId', { enquirydetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);