app.controller('TicketsCtrl', function ($scope, Ticket) {
    if ($scope.signed_in === false) {
        $scope.flashAlert('Please sign in to proceed.')
        $scope.redirect('sign_in')
    }

    $scope.searchTicket = ''

    $scope.showProgress()
    Ticket.query().$promise.then(
        function (data) {
            console.log('All tickets displayed')
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
                    console.log('Ticket was successfully created')

                    // Append the newly added ticket
                    $scope.tickets.push(data)

                    // Set a successfully alert message for the user
                    $scope.flashNotice('Ticket was successfully created.')

                    // Redirect user to the login page
                    $scope.redirect('tickets')
                },
                function (err) {
                    console.log('Error saving ticket')

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

    $scope.showTicket = function (ticket_id) {
        $scope.showProgress()
        Ticket.get({id: ticket_id}).$promise.then(
            function (data) {
                $scope.ticket = data
                $('#show-ticket-modal').modal('toggle')
            },
            function (err) {
                $scope.flashAlert('Error occured. Please try again or contact support.')
            }).finally(function () {
            $scope.hideProgress()
        })
    }

    $scope.generatePdf = function () {
        base_string = (Math.random().toString(36)+'00000000000000000').slice(2, 10)
        ecrypted = CryptoJS.HmacSHA1(base_string, "7IXjCVCfuq1t4PDFNT6YX6Bd")
        signature =  CryptoJS.enc.Base64.stringify(ecrypted)

        window.open('/static_pages/tickets_pdf.pdf?signature='+signature+'&base_string='+base_string, '_blank');
    }
})
    