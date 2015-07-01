'use strict';

// Configuring the Articles module
angular.module('procedures').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Procedures', 'procedures', 'dropdown', '/procedures(/create)?');
		Menus.addSubMenuItem('topbar', 'procedures', 'List Procedures', 'procedures');
		Menus.addSubMenuItem('topbar', 'procedures', 'New Procedure', 'procedures/create');
	}
]);