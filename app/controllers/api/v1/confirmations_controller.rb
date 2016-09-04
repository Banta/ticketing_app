class Api::V1::ConfirmationsController < Api::V1::BaseController
  respond_to :json

  def create
    confirmation_token = params[:confirmation_token]
    user = User.find_by(auth_token: confirmation_token)

    if user
      user.generate_authentication_token!
      user.confirmed = true
      user.save
      render json: user, status: 201, location: [:api, user]
    else
      render json: { errors: 'Ivalid token' }, status: 404
    end
  end
end
