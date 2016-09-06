app.controller('AppCtrl', function ($scope, $location, $localstorage, $state, spinnerService, Flash) {

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

    $scope.userRole = function () {
        return $localstorage.get('user_role')
    }

    $scope.isRole = function (role) {
        return $scope.userRole() === role
    }

    $scope.isUser = function () {
        return $scope.isRole('user')
    }

    $scope.isNotUser = function () {
        return $scope.isRole('user') != true
    }

    $scope.isAgent = function () {
        return $scope.isRole('agent')
    }

    $scope.isAdmin = function () {
        return $scope.isRole('admin')
    }

    $scope.isNotAdmin = function () {
        return $scope.isRole('admin') != true
    }

    $scope.newSession = function (auth_token, role) {
        $localstorage.set('auth_token', auth_token)
        $localstorage.set('user_role', role)
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
    $scope.showProgress = function () {
        spinnerService.show('html5spinner');
    }

    // Hide progress to the user
    $scope.hideProgress = function () {
        spinnerService.hide('html5spinner');
    }

    $scope.redirect = function (page) {
        $state.go('app.' + page)
    }
});
