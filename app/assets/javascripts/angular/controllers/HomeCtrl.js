app.controller('HomeCtrl', function($scope) {
    
    // Check if there is a flash message sent from another controller
    if ($localstorage.getObject('alert')) {
        $scope.alert = $localstorage.getObject('alert')
        $localstorage.remove('alert')
    }
    
});