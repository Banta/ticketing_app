app.controller('AppCtrl', function ($scope, $location, $localstorage, $state, Flash) {
    console.log('AppCtrl loaded')

    $scope.signed_in = false

    if ($localstorage.get('auth_token')) {
        $scope.signed_in = true
    }

    $scope.getAuthToken = function () {
        return $localstorage.get('auth_token')
    }

    $scope.passResetToken = function () {
        return $localstorage.get('reset_token')
    }

    $scope.setPassResetToken = function (reset_token) {
        $localstorage.set('reset_token', reset_token)
    }

    $scope.authenticate_user = function () {
        if ($scope.signed_in === false) {
            $scope.flashAlert('Please sign in first to proceed.')
            $scope.redirect('home')
        }
    }

    $scope.getUser = function () {
        return $localstorage.getObject('user')
    }

    $scope.newSession = function (auth_token) {
        $localstorage.set('auth_token', auth_token)
        $scope.signed_in = true
    }

    $scope.destroySession = function () {
        $localstorage.remove('auth_token')
        $scope.signed_in = false
    }

    // Show success alert messages
    $scope.flashNotice = function (message) {
        Flash.create('success', message)
    }

    // Show danger alert messages
    $scope.flashAlert = function (message) {
        Flash.create('danger', message)
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
