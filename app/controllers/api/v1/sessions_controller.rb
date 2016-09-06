class Api::V1::SessionsController < Api::V1::BaseController

  def create
    user_password = params[:session][:password]
    user_email = params[:session][:email]
    user = user_email.present? && User.find_by(email: user_email)

    if user && user.valid_password?(user_password)
      sign_in user, store: false
      user.generate_authentication_token!
      user.save
      render json: user, status: 200, location: [:api, user]
    else
      render json: {errors: "Invalid email or password"}, status: 401
    end
  end

  def destroy
    user = User.find_by(auth_token: params[:id])
    if user
      user.generate_authentication_token!
      user.save
      head 204
    else
      render json: {}, status: 404
    end
  end
end
