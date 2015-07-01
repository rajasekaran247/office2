'use strict';

//Setting up route
angular.module('procedures').config(['$stateProvider',
	function($stateProvider) {
		// Procedures state routing
		$stateProvider.
		state('listProcedures', {
			url: '/procedures',
			templateUrl: 'modules/procedures/views/list-procedures.client.view.html'
		}).
		state('createProcedure', {
			url: '/procedures/create',
			templateUrl: 'modules/procedures/views/create-procedure.client.view.html'
		}).
		state('viewProcedure', {
			url: '/procedures/:procedureId',
			templateUrl: 'modules/procedures/views/view-procedure.client.view.html'
		}).
		state('editProcedure', {
			url: '/procedures/:procedureId/edit',
			templateUrl: 'modules/procedures/views/edit-procedure.client.view.html'
		});
	}
]);