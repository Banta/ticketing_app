class Api::V1::TicketsController < Api::V1::BaseController
  before_action :authenticate_with_token!
  respond_to :json

  def index
    if current_user.user?
      tickets = current_user.tickets.order("created_at DESC")
    else
      tickets = Ticket.all.order("created_at DESC")
    end

    render json: tickets, status: 200
  end

  def show
    ticket = Ticket.find_by(id: params[:id])

    if ticket
      render json: ticket, status: 200, location: [:api, ticket]
    else
      render json: {}, status: 404
    end
  end

  def create
    ticket = current_user.tickets.new(ticket_params)

    if ticket.save
      render json: ticket, status: 201, location: [:api, ticket]
    else
      render json: {errors: ticket.errors}, status: 422
    end
  end

  def update
    ticket = Ticket.find_by(id: params[:id])

    if ticket
      if ticket.update(update_ticket_params)
        render json: ticket, status: 201, location: [:api, ticket]
      else
        render json: {errors: ticket.errors}, status: 422
      end
    else
      render json: {}, status: 404
    end
  end

  private

  def ticket_params
    params.require(:ticket).permit(:title, :desc)
  end

  def update_ticket_params
    params.require(:ticket).permit(:status)
  end
end
