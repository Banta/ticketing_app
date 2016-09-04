app.controller('SignOutCtrl', function ($scope, UserSession, $localstorage) {
    $scope.showProgress('Please wait...')
    var user = UserSession.delete({id: $localstorage.get('auth_token')})
    user.$promise.then(
        function (data) {
            $localstorage.remove('auth_token')
            $scope.flashNotice('Signed our successfully.')
        },
        function (err) {
            $scope.flashAlert('An error occurred. Please contact support.')
        })
        .finally(function () {
            $scope.hideProgress()
            $scope.redirect('home')
        })
})
