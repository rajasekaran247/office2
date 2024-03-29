'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        // Some example string
        $scope.helloText = 'Welcome to Office';
        $scope.descriptionText = 'This is a typical Office web application. You can use it to quickly track and update your project status.';
	}
]);
