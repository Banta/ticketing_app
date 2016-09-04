app.controller('SignInCtrl', function ($scope, $location, $localstorage, UserSession) {
    $scope.showErrors = false
    $scope.data = {}

    if ($localstorage.getObject('alert')) {
        $scope.alert = $localstorage.getObject('alert')
        $localstorage.remove('alert')
    }

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
                    $localstorage.setObject('alert', {
                        type: 'success',
                        message: 'You are successfully logged in.'
                    })
                    $location.path('/home')
                },
                function (err) {
                    console.log('Error logging in.')
                    $scope.alert = {type: 'danger', message: 'Invalid email or password'}
                }).finally(function () {
            })
        }
    }
})
