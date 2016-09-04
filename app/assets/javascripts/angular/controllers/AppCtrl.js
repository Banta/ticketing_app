app.controller('AppCtrl', function ($scope, $location, $localstorage) {
    console.log('AppCtrl loaded')

    $scope.signed_in = false
    if ($localstorage.get('auth_token')) {
        $scope.signed_in = true
    }
});
