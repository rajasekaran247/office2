'use strict';

// Configuring the Articles module
angular.module('invoicedetails').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Invoicedetails', 'invoicedetails', 'dropdown', '/invoicedetails(/create)?');
		Menus.addSubMenuItem('topbar', 'invoicedetails', 'List Invoicedetails', 'invoicedetails');
		Menus.addSubMenuItem('topbar', 'invoicedetails', 'New Invoicedetail', 'invoicedetails/create');
	}
]);