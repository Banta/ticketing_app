app.controller('SignOutCtrl', function ($scope, UserSession) {
    $scope.showProgress('Please wait...')
    var user = UserSession.delete({id: $scope.getAuthToken()})
    user.$promise.then(
        function (data) {
            $scope.destroySession()
            $scope.flashNotice('Signed out successfully.')
        },
        function (err) {
            $scope.flashAlert('An error occurred. Please contact support.')
        })
        .finally(function () {
            $scope.hideProgress()
            $scope.redirect('home')
        })
})
