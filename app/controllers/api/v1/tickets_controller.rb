class Api::V1::TicketsController < Api::V1::BaseController
  before_action :authenticate_with_token!
  respond_to :json

  def index
    if current_user.user?
      tickets = current_user.tickets.order("created_at DESC")
    else
      tickets = Ticket.all.order("created_at DESC")
    end

    render json: tickets, status: 200, location: [:api, tickets]
  end
end
