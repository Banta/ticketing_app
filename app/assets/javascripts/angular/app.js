var app = angular.module("app", ['ngRoute', 'app.services', 'ui.router', 'ngMaterial', 'ngMessages', 'app.utils']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/templates/home.html',
            controller: 'HomeCtrl'
        })

        .state('about', {
            url: '/about',
            templateUrl: '/templates/about.html',
            controller: 'AboutCtrl'
        })

        .state('sign_in', {
            url: '/sign_in',
            templateUrl: '/templates/sign_in.html',
            controller: 'SignInCtrl'
        })

        .state('sign_up', {
            url: '/sign_up',
            templateUrl: '/templates/sign_up.html',
            controller: 'SignUpCtrl'
        })

        .state('confirmation', {
            url: '/confirmation?confirmation_token',
            controller: 'ConfirmationCtrl'
        })

        .state('forgot_password', {
            url: '/forgot_password',
            templateUrl: '/templates/forgot_password.html',
            controller: 'ForgotPasswordCtrl'
        })

        .state('tickets', {
            url: '/tickets',
            templateUrl: '/templates/tickets.html',
            controller: 'TicketsCtrl'
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('home');
});
