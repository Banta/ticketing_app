var app = angular.module("app", ['ngRoute', 'app.services', 'ui.router', 'ngMaterial', 'ngMessages',
        'app.utils', 'ngFlash'])

    .run(function ($http, $localstorage, $state, $rootScope) {
        $http.defaults.headers.common.Authorization = $localstorage.get('auth_token')
        $http.defaults.headers.common.Accept = 'application/vnd.tickets.v1'

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                // This will be executed every time a state changes
            })
    })

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: '/templates/app.html',
        controller: 'AppCtrl'
    })
    $stateProvider
        .state('app.home', {
            url: '/home',
            templateUrl: '/templates/home.html',
            controller: 'HomeCtrl'
        })

        .state('app.about', {
            url: '/about',
            templateUrl: '/templates/about.html',
            controller: 'AboutCtrl'
        })

        .state('app.sign_in', {
            url: '/sign_in',
            templateUrl: '/templates/sign_in.html',
            controller: 'SignInCtrl'
        })

        .state('app.sign_out', {
            url: '/sign_out',
            controller: 'SignOutCtrl'
        })

        .state('app.sign_up', {
            url: '/sign_up',
            templateUrl: '/templates/sign_up.html',
            controller: 'SignUpCtrl'
        })

        .state('app.confirmation', {
            url: '/confirmation?confirmation_token',
            controller: 'ConfirmationCtrl'
        })

        .state('app.reset_password', {
            url: '/password?reset_token',
            templateUrl: '/templates/reset_password.html',
            controller: 'ResetPasswordCtrl'
        })

        .state('app.forgot_password', {
            url: '/forgot_password',
            templateUrl: '/templates/forgot_password.html',
            controller: 'ForgotPasswordCtrl'
        })

        .state('app.tickets', {
            url: '/tickets',
            templateUrl: '/templates/tickets.html',
            controller: 'TicketsCtrl'
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('app/home');
});
