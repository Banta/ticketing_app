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

    .factory('UserSession', function ($cachedResource) {
        return $cachedResource('sessions', '/sessions/:id', {id: "@id"})
    })

    .factory('UserPassword', function ($cachedResource) {
        return $cachedResource('passwords', '/passwords/:id', {id: "@id"}, {
            update: {
                method: 'PUT'
            }
        })
    })

    .factory('Ticket', function ($cachedResource) {
        return $cachedResource('tickets', '/tickets/:id', {id: "@id"})
    })

