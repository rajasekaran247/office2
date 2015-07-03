'use strict';

// Configuring the Articles module
angular.module('enquirydetails').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Enquirydetails', 'enquirydetails', 'dropdown', '/enquirydetails(/create)?');
		Menus.addSubMenuItem('topbar', 'enquirydetails', 'List Enquirydetails', 'enquirydetails');
		Menus.addSubMenuItem('topbar', 'enquirydetails', 'New Enquirydetail', 'enquirydetails/create');
	}
]);