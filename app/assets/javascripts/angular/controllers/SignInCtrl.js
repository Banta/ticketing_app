app.controller('SignInCtrl', function ($scope, UserSession) {
    if ($scope.signed_in) {
        $scope.flashAlert('You are already signed in.')
        $scope.redirect('home')
    }

    $scope.showErrors = false
    $scope.data = {}
    
    $scope.submitForm = function (userForm, data) {

        // Check if form has errors
        if (userForm.$invalid == true) {
            $scope.showErrors = true
        } else {
            var user = new UserSession({session: $scope.data})
            user.$save()
            user.$promise.then(
                function (data) {
                    $scope.newSession(data.auth_token)
                    $scope.flashNotice('You are successfully logged in.')
                    $scope.redirect('home')
                },
                function (err) {
                    console.log('Error logging in.')
                    $scope.flashAlert('Invalid email or password')
                }).finally(function () {
            })
        }
    }
})
