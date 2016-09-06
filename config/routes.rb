Rails.application.routes.draw do

  namespace :api, defaults: {format: :json}, path: '/' do
    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: true) do
      resources :users, only: [:create, :update]
      resources :confirmations, only: [:create]
      resources :sessions, only: [:create, :destroy]
      resources :passwords, only: [:create, :update]

      namespace :admin do
        resources :users
      end


      resources :tickets
    end
  end


  devise_for :users, only: []
  get 'static_pages/tickets_pdf'
  root 'static_pages#index'
end
