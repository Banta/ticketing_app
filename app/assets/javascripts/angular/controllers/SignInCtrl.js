app.controller('SignInCtrl', function ($scope, $location, $localstorage, UserSession) {
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
                    $localstorage.set('auth_token', data.auth_token)
                    $scope.flashNotice('You are successfully logged in.')
                    $location.path('/home')
                },
                function (err) {
                    console.log('Error logging in.')
                    $scope.flashAlert('Invalid email or password')
                }).finally(function () {
            })
        }
    }
})
