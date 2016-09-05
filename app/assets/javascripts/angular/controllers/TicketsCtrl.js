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
            $('#add-ticket-modal').modal('toggle')
            $scope.showProgress()
            var ticket = new Ticket({ticket: $scope.data})
            ticket.$save()
            ticket.$promise.then(
                function (data) {
                    console.log('Ticket was successfully created: ' + JSON.stringify(data))

                    // Set a successfully alert message for the user
                    $scope.flashNotice('Ticket was successfully created.')

                    // Redirect user to the login page
                    $location.path('/tickets')
                },
                function (err) {
                    console.log('Error saving user.' + JSON.stringify(err))

                    // Alert user about the error
                    $scope.flashAlert('An error occurred. Please contact support.')
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
        $('#add-ticket-modal').modal('toggle')
    }
})
    