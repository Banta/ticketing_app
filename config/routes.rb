Rails.application.routes.draw do

  namespace :api, defaults: {format: :json}, path: '/' do
    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: true) do
      resources :users, only: [:show, :create, :update, :destroy]
      resources :confirmations, only: [:create]
      resources :sessions, only: [:create, :destroy]
    end
  end

  root 'static_pages#index'
end
