app.controller('ConfirmationCtrl', function ($scope, $location, $localstorage, $stateParams, Confirmation) {
    var confirmation_token = $stateParams.confirmation_token

    if (confirmation_token) {
        var user = new Confirmation({confirmation_token: confirmation_token})
        user.$save();
        user.$promise.then(
            function (data) {
                console.log('User was successfully created: ' + JSON.stringify(data))

                // Store user information in local storage
                $localstorage.setObject('user', data);

                // Set a success alert
                $scope.flashNotice('Email confirmed. Proceed with signing in')
                window.location = '/#sign_in'
            },
            function (err) {
                console.log('Error confirming email' + JSON.stringify(err))
                // Set a successfully alert message for the user
                $scope.flashAlert('Confirmation token is invalid')
                window.location = '/#home'
            }).finally(function () {
        })
    } else {
        // Set a successfully alert message for the user
        $scope.flashAlert('Confirmation token is invalid')
        window.location = '/#home'
    }
});
