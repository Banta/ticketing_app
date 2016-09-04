app.controller('AppCtrl', function ($scope, $location, $localstorage) {
    console.log('AppCtrl loaded')

    $scope.signed_in = false
    if ($localstorage.get('auth_token')) {
        $scope.signed_in = true
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
});
