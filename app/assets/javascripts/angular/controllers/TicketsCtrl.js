app.controller('TicketsCtrl', function ($scope, Ticket) {
    if ($scope.signed_in === false) {
        $scope.flashAlert('Please sign in to proceed.')
        $scope.redirect('sign_in')
    }

    $scope.searchTicket = ''

    $scope.showProgress()
    Ticket.query().$promise.then(
        function (data) {
            console.log('Show all tickets ' + JSON.stringify(data))
            $scope.tickets = data
        },
        function (err) {
            console.log('Show all tickets failed')
            $scope.flashAlert('Error loading page. Please contact support.')
        })
        .finally(function () {
            $scope.hideProgress()
        })
})
