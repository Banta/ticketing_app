var mainApp = angular.module("mainApp", ['ngRoute']);
mainApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/templates/home.html',
            controller: 'HomeCtrl'
        })

        .when('/about', {
            templateUrl: '/templates/about.html',
            controller: 'AboutCtrl'
        })

        .otherwise({
            redirectTo: '/home'
        });
}]);
