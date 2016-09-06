app.controller('UsersCtrl', function ($scope, User) {
    if ($scope.signed_in === false) {
        $scope.flashAlert('Please sign in to proceed.')
        $scope.redirect('sign_in')
    } else if ($scope.isNotAdmin()) {
        $scope.flashAlert('You are not authorized to access this page.')
        $scope.redirect('home')
    } else {
        $scope.searchUser = ''

        $scope.showProgress()
        User.query().$promise.then(
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
})
