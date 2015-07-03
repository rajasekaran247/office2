'use strict';

// Configuring the Articles module
angular.module('officeexpenses').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Officeexpenses', 'officeexpenses', 'dropdown', '/officeexpenses(/create)?');
		Menus.addSubMenuItem('topbar', 'officeexpenses', 'List Officeexpenses', 'officeexpenses');
		Menus.addSubMenuItem('topbar', 'officeexpenses', 'New Officeexpense', 'officeexpenses/create');
	}
]);