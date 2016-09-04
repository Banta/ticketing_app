class Api::V1::PasswordsController < Api::V1::BaseController

  def create
    user_email = params[:user][:email]
    user = user_email.present? && User.find_by(email: user_email)

    if user
      user.generate_phone_confirmation_code!
      user.save
      render json: user, status: 200, location: [:api, user]
    else
      render json: { errors: "Invalid email or password" }, status: 422
    end
  end

  def update
    user = User.find(params[:id])

    if user && user.update_attributes(password: params[:user][:password])
      user.confirm
      render json: user, status: 200, location: [:api, user]
    else
      render json: { errors: user.errors }, status: 422
    end
  end
end
