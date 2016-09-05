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

    $scope.showErrors = false
    $scope.data = {}

    $scope.submitForm = function (ticketForm, data) {

        // Check if form has errors
        if (ticketForm.$invalid == true) {
            $scope.showErrors = true
        } else {
        }
    }

    $scope.closeSubmitForm = function () {
        $scope.data = {}
        $scope.showErrors = false
        $('#add-ticket-modal').modal('toggle')
    }
})
    