'use strict';

// Configuring the Articles module
angular.module('travelreimbursements').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Travelreimbursements', 'travelreimbursements', 'dropdown', '/travelreimbursements(/create)?');
		Menus.addSubMenuItem('topbar', 'travelreimbursements', 'List Travelreimbursements', 'travelreimbursements');
		Menus.addSubMenuItem('topbar', 'travelreimbursements', 'New Travelreimbursement', 'travelreimbursements/create');
	}
]);