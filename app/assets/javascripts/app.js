var app = angular.module("app", ['ngRoute', 'ui.router']);
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

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('home');
});
