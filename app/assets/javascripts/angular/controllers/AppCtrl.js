app.controller('AppCtrl', function ($scope, $location, $localstorage, $state) {
    console.log('AppCtrl loaded')

    $scope.signed_in = false

    if ($localstorage.get('auth_token')) {
        $scope.signed_in = true
    }

    $scope.getAuthToken = function () {
        return $localstorage.get('auth_token')
    }

    $scope.newSession = function (auth_token) {
        $localstorage.set('auth_token', auth_token)
        $scope.signed_in = true
    }

    $scope.destroySession = function () {
        $localstorage.remove('auth_token')
        $scope.signed_in = false
    }

    $scope.alert = {}

    // Show success alert messages
    $scope.flashNotice = function (message) {
        $scope.alert = {type: 'success', message: message, show: true}
    }

    // Show danger alert messages
    $scope.flashAlert = function (message) {
        $scope.alert = {type: 'danger', message: message, show: true}
    }

    // Show progress to the user
    $scope.showProgress = function (message) {
        // TODO
    }

    // Hide progress to the user
    $scope.hideProgress = function (message) {
        // TODO
    }

    $scope.redirect = function (page) {
        $state.go('app.' + page)
    }
});
