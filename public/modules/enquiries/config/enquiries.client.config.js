'use strict';

// Configuring the Articles module
angular.module('enquiries').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Enquiries', 'enquiries', 'dropdown', '/enquiries(/create)?');
		Menus.addSubMenuItem('topbar', 'enquiries', 'List Enquiries', 'enquiries');
		Menus.addSubMenuItem('topbar', 'enquiries', 'New Enquiry', 'enquiries/create');
	}
]);