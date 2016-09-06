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
    $scope.data = {role: 'user'}

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

    $scope.editUser = function (user_id) {
        $scope.showProgress()
        Auser.get({id: user_id}).$promise.then(
            function (data) {
                $scope.user = data
                $scope.data = data
                $('#edit-user-modal').modal('toggle')
            },
            function (err) {
                $scope.flashAlert('Error occurred. Please try again or contact support.')
            }).finally(function () {
            $scope.hideProgress()
        })
    }

    $scope.updateUser = function (userForm, data, user_id) {

        // Check if form has errors
        if (userForm.$invalid == true) {
            $scope.showErrors = true
        } else {
            $('#edit-user-modal').modal('toggle')
            $scope.showProgress()
            user = Auser.update({id: user_id, user: data})
            user.$promise.then(
                function (data) {
                    console.log('Ticket was successfully created')

                    // Append the newly added ticket
                    $scope.users.push(data)

                    // Set a successfully alert message for the user
                    $scope.flashNotice('User was successfully updated.')
                },
                function (err) {
                    console.log('Error saving user.')

                    // Alert user about the error
                    $scope.flashAlert('Error occurred. Please try again or contact support.')
                })
                .finally(function () {
                    Auser.query().$promise.then(
                        function (data) {
                            console.log('All users displayed')
                            $scope.users = data
                        },
                        function (err) {
                            console.log('Show all users failed')
                            $scope.flashAlert('Error loading page. Please contact support.')
                        })
                    $scope.hideProgress()
                })
        }
    }
})
