app.controller('ResetPasswordCtrl', function ($scope, $location, $localstorage, $stateParams, UserPassword) {
    var reset_token = $stateParams.reset_token

    if (reset_token != $scope.passResetToken()) {
        // Set an alert message for the user
        $scope.flashAlert('Password reset token is invalid')
        $scope.redirect('home')
    }

    $scope.showErrors = false
    $scope.data = {}

    $scope.submitForm = function (userForm, data) {
        if (userForm.$invalid == true) {
            $scope.showErrors = true
        } else {
            $scope.showProgress('Please wait...')

            var user = UserPassword.update({
                id: $scope.getUser().id,
                user: {password: $scope.data.password, reset_token: reset_token}
            });
            user.$promise.then(
                function (data) {
                    $scope.flashNotice('Password successfully reset')
                    $scope.redirect('sign_in')
                },
                function (err) {
                    console.log('Error saving user.')
                    $scope.flashAlert('Password could not be reset. Please try again or contact support.')
                    $scope.redirect('home')
                }).finally(function () {
                $scope.hideProgress()
            })
        }
    }
})
