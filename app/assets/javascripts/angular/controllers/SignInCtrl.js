app.controller('SignInCtrl', function ($scope) {
    $scope.showErrors = false
    $scope.data = {}

    $scope.submitForm = function (userForm, data) {

        // Check if form has errors
        if (userForm.$invalid == true) {
            $scope.showErrors = true
        } else {
            $scope.showErrors = false
            $scope.data = {}
            $scope.alert = {type: 'danger', message: 'Invalid email or password'}
        }
    }
});
