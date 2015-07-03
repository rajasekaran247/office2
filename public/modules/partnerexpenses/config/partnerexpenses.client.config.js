'use strict';

// Configuring the Articles module
angular.module('partnerexpenses').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Partnerexpenses', 'partnerexpenses', 'dropdown', '/partnerexpenses(/create)?');
		Menus.addSubMenuItem('topbar', 'partnerexpenses', 'List Partnerexpenses', 'partnerexpenses');
		Menus.addSubMenuItem('topbar', 'partnerexpenses', 'New Partnerexpense', 'partnerexpenses/create');
	}
]);