'use strict';

//Setting up route
angular.module('odocs').config(['$stateProvider',
	function($stateProvider) {
		// Odocs state routing
		$stateProvider.
		state('listOdocs', {
			url: '/odocs',
			templateUrl: 'modules/odocs/views/list-odocs.client.view.html'
		}).
		state('createOdoc', {
			url: '/odocs/create',
			templateUrl: 'modules/odocs/views/create-odoc.client.view.html'
		}).
		state('viewOdoc', {
			url: '/odocs/:odocId',
			templateUrl: 'modules/odocs/views/view-odoc.client.view.html'
		}).
		state('editOdoc', {
			url: '/odocs/:odocId/edit',
			templateUrl: 'modules/odocs/views/edit-odoc.client.view.html'
		});
	}
]);