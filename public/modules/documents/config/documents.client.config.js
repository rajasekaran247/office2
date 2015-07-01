'use strict';

// Configuring the Articles module
angular.module('documents').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Documents', 'documents', 'dropdown', '/documents(/create)?');
		Menus.addSubMenuItem('topbar', 'documents', 'List Documents', 'documents');
		Menus.addSubMenuItem('topbar', 'documents', 'New Document', 'documents/create');
	}
]);