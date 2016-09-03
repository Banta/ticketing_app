angular.module('app.services', ['ngCachedResource', 'app.utils'])
    .factory('User', function ($cachedResource) {
        return $cachedResource('users', '/users/:id', {id: "@id"});
    })
