app.controller('SignUpCtrl', function ($scope, $location, $localstorage, User) {
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
            $scope.showProgress()
            var user = new User({user: $scope.data}); // *Note: setting the bound param (`id` in this case) is *required*
            user.$save();
            user.$promise.then(
                function (data) {
                    $localstorage.setObject('user', data);
                    console.log('User was successfully created: ' + JSON.stringify(data))

                    // Set a successfully alert message for the user
                    $scope.flashNotice('A message with a confirmation link has been sent to your email address.' +
                        'Please follow the link to activate your account.')

                    // Redirect user to the login page
                    $location.path('/home')
                },
                function (err) {
                    console.log('Error saving user.');
                    var message = ""
                    $.each(err.data.errors, function (key, value) {
                        message = message + key + ": " + value + "\n"
                    });

                    console.log(message)
                })
                .finally(function () {
                    $scope.hideProgress()
                })
        }
    }
});
