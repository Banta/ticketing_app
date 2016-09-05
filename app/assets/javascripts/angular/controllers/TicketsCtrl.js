app.controller('TicketsCtrl', function($scope) {
    $scope.authenticate_user()
});
    if ($scope.signed_in === false) {
        $scope.flashAlert('Please sign in to proceed.')
        $scope.redirect('sign_in')
    }
