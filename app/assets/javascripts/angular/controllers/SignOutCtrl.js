app.controller('SignOutCtrl', function ($scope, UserSession) {
    $scope.showProgress()
    var user = UserSession.delete({id: $scope.getAuthToken()})
    user.$promise.then(
        function (data) {},
        function (err) {})
        .finally(function () {
            $scope.destroySession()
            $scope.hideProgress()
            $scope.flashNotice('Signed out successfully.')
            $scope.redirect('home')
        })
})
