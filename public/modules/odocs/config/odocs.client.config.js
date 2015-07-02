'use strict';

// Configuring the Articles module
angular.module('odocs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Odocs', 'odocs', 'dropdown', '/odocs(/create)?');
		Menus.addSubMenuItem('topbar', 'odocs', 'List Odocs', 'odocs');
		Menus.addSubMenuItem('topbar', 'odocs', 'New Odoc', 'odocs/create');
	}
]);