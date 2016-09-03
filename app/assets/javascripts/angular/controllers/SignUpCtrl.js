app.controller('SignUpCtrl', function ($scope, $location, $localstorage, User) {
    $scope.showErrors = false
    $scope.data = {}

    $scope.submitForm = function (userForm, data) {

        // Check if form has errors
        if (userForm.$invalid == true) {
            $scope.showErrors = true
        } else {
            var user = new User({user: $scope.data}); // *Note: setting the bound param (`id` in this case) is *required*
            user.$save();
            user.$promise.then(
                function (data) {
                    $localstorage.setObject('user', data);
                    console.log('User was successfully created: ' + JSON.stringify(data))

                    // Set a successfully alert message for the user
                    $localstorage.setObject('alert', {type: 'success', message: 'User was successfully created.'})

                    // Redirect user to the login page
                    $location.path('/sign_in')
                },
                function (err) {
                    console.log('Error saving user.');
                    var message = ""
                    $.each(err.data.errors, function (key, value) {
                        message = message + key + ": " + value + "\n"
                    });
                    
                    console.log(message)
                }).finally(function () {
            });
        }
    }
});
