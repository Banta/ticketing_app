class Api::V1::Admin::UsersController < Api::V1::BaseController
  before_action :authenticate_with_token!
  respond_to :json

  def index
    users = User.all.order('created_at DESC')
    render json: users, status: 200
  end

  def show
    user = User.find_by(id: params[:id])

    if user
      render json: user, status: 200, location: [:api, user]
    else
      render json: {}, status: 404
    end
  end

  def update
    user = User.find_by(id: params[:id])

    if user
      if user.update_attributes(user_params)
        render json: user, status: 200, location: [:api, user]
      else
        render json: {errors: user.errors}, status: 422
      end
    else
      render json: {}, status: 404
    end
  end

  def create
    user = User.new(user_params)
    user.confirmed = true
    if user.save
      render json: user, status: 201, location: [:api, user]
    else
      render json: {errors: user.errors.full_messages.to_sentence.capitalize}, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :role)
  end

  def authenticate_admin!
    def authenticate_with_token!
      render json: {errors: "Not authenticated"},
             status: :unauthorized unless current_user.admin?
    end
  end
end
