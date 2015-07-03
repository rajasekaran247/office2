'use strict';

// Configuring the Articles module
angular.module('travelreimbursementdetails').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Travelreimbursementdetails', 'travelreimbursementdetails', 'dropdown', '/travelreimbursementdetails(/create)?');
		Menus.addSubMenuItem('topbar', 'travelreimbursementdetails', 'List Travelreimbursementdetails', 'travelreimbursementdetails');
		Menus.addSubMenuItem('topbar', 'travelreimbursementdetails', 'New Travelreimbursementdetail', 'travelreimbursementdetails/create');
	}
]);