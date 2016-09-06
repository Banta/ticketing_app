class Api::V1::PasswordsController < Api::V1::BaseController

  def create
    user_email = params[:user][:email]
    user = user_email.present? && User.find_by(email: user_email)

    if user
      # Generate a new authentication tocken that will be used as an email
      # reseting password
      user.generate_authentication_token!
      user.save
                                                                      # Todo: This is not the best way to do i
                                                                      # It should be improved
      UserMailer.send_user_reset_password_email(user.id).deliver! unless Rails.env == 'test'
      render json: user, status: 200, location: [:api, user]
    else
      render json: { errors: 'Invalid email' }, status: 404
    end
  end

  def update
    user = User.find_by(id: params[:id], auth_token: params[:user][:reset_token])

    if user && user.update_attributes(password: params[:user][:password])
      render json: user, status: 200, location: [:api, user]
    else
      render json: { errors: 'Password could not be changed' }, status: 422
    end
  end
end
