'use strict';

// Configuring the Articles module
angular.module('core').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Office', 'office', 'dropdown');
		Menus.addSubMenuItem('topbar', 'office', 'Comments', 'comments');
		Menus.addSubMenuItem('topbar', 'office', 'Contacts', 'contacts');
		Menus.addSubMenuItem('topbar', 'office', 'Core', 'core');
		Menus.addSubMenuItem('topbar', 'office', 'Enquiries', 'enquiries');
		Menus.addSubMenuItem('topbar', 'office', 'Enquirydetails', 'enquirydetails');
		Menus.addSubMenuItem('topbar', 'office', 'Invoicedetails', 'invoicedetails');
		Menus.addSubMenuItem('topbar', 'office', 'Invoices', 'invoices');
		Menus.addSubMenuItem('topbar', 'office', 'Jobs', 'jobs');
		Menus.addSubMenuItem('topbar', 'office', 'Notes', 'notes');
		Menus.addSubMenuItem('topbar', 'office', 'Odocs', 'odocs');
		Menus.addSubMenuItem('topbar', 'office', 'Officeexpenses', 'officeexpenses');
		Menus.addSubMenuItem('topbar', 'office', 'Partnerexpenses', 'partnerexpenses');
		Menus.addSubMenuItem('topbar', 'office', 'Procedures', 'procedures');
		Menus.addSubMenuItem('topbar', 'office', 'Profiles', 'profiles');
		Menus.addSubMenuItem('topbar', 'office', 'Timesheets', 'timesheets');
		Menus.addSubMenuItem('topbar', 'office', 'Travelreimbursementdetails', 'travelreimbursementdetails');
		Menus.addSubMenuItem('topbar', 'office', 'Travelreimbursements', 'travelreimbursements');
		Menus.addSubMenuItem('topbar', 'office', 'Users', 'users');

	}
]);
