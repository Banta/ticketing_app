angular.module('app.services', ['ngCachedResource', 'app.utils'])
    .factory('User', function ($cachedResource) {
        return $cachedResource('users', '/users/:id', {id: "@id"})
    })
    .factory('Confirmation', function ($cachedResource) {
        return $cachedResource('confirmation', '/confirmations', {id: "@id"})
    })
    .factory('UserSession', function ($cachedResource) {
        return $cachedResource('sessions', '/sessions/:id', {id: "@id"})
    })
