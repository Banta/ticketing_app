app.controller('UsersCtrl', function ($scope, User, Auser) {
    if ($scope.signed_in === false) {
        $scope.flashAlert('Please sign in to proceed.')
        $scope.redirect('sign_in')
    } else if ($scope.isNotAdmin()) {
        $scope.flashAlert('You are not authorized to access this page.')
        $scope.redirect('home')
    } else {
        $scope.searchUser = ''

        $scope.showProgress()
        Auser.query().$promise.then(
            function (data) {
                console.log('All users displayed')
                $scope.users = data
            },
            function (err) {
                console.log('Show all users failed')
                $scope.flashAlert('Error loading page. Please contact support.')
            })
            .finally(function () {
                $scope.hideProgress()
            })
    }

    $scope.showErrors = false
    $scope.data = {}

    $scope.submitForm = function (userForm, data) {

        // Check if form has errors
        if (userForm.$invalid == true) {
            $scope.showErrors = true
        } else {
            $('#add-user-modal').modal('toggle')
            $scope.showProgress()
            var user = new Auser({user: $scope.data})
            user.$save()
            user.$promise.then(
                function (data) {
                    console.log('Ticket was successfully created')

                    // Append the newly added ticket
                    $scope.users.push(data)

                    // Set a successfully alert message for the user
                    $scope.flashNotice('User was successfully created.')
                },
                function (err) {
                    console.log('Error saving ticket.')

                    // Alert user about the error
                    $scope.flashAlert(err.data.errors)
                })
                .finally(function () {
                    $scope.hideProgress()
                    $scope.data = {}
                })
        }
    }

    $scope.closeSubmitForm = function () {
        $scope.data = {}
        $scope.showErrors = false
        $('#add-user-modal').modal('toggle')
    }
})
