app.controller('ForgotPasswordCtrl', function($scope, UserPassword) {

    // Redirect user to home page if they have already signed in
    if ($scope.signed_in) {
        $scope.flashAlert('You are already signed in.')
        $scope.redirect('home')
    }

    $scope.showErrors = false;
    $scope.data = {};

    $scope.submitForm = function (userForm, data) {
        if (userForm.$invalid == true) {
            $scope.showErrors = true
        } else {
            $scope.showProgress('Please wait...')
            var user = new UserPassword({user: $scope.data});
            user.$save()
            user.$promise.then(
                function (data) {
                    $localstorage.setObject('user', data);
                    console.log('Request sent successfully: ' + JSON.stringify(data))
                    $scope.redirect('home')
                },
                function (err) {
                    console.log('Error saving user.');
                    $scope.flashAlert('Error occurred please contact support.')
                }).finally(function () {
                $scope.hideProgress()
            });
        }
    }
});
