app.controller('ForgotPasswordCtrl', function($scope, UserPassword) {

    // Redirect user to home page if they have already signed in
    if ($scope.signed_in) {
        $scope.flashAlert('You are already signed in.')
        $scope.redirect('home')
    }

    $scope.showErrors = false
    $scope.data = {}

    $scope.submitForm = function (userForm, data) {
        if (userForm.$invalid == true) {
            $scope.showErrors = true
        } else {
            $scope.showProgress()
            var user = new UserPassword({user: $scope.data})
            user.$save()
            user.$promise.then(
                function (data) {
                    console.log('Request sent successfully')
                    $scope.setPassResetToken(data.reset_token)
                    $scope.flashNotice('A message with password reset instructions has been sent to your' +
                        ' email address.')
                    $scope.redirect('home')
                },
                function (err) {
                    console.log('Error saving user: ' + JSON.stringify(err))
                    if (err.status === 404) {
                        $scope.flashAlert('Email does not exist.')
                    } else {
                        $scope.flashAlert('Error occurred please contact support.')
                    }
                    $scope.data = {}
                }).finally(function () {
                $scope.hideProgress()
            });
        }
    }
});
