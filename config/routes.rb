Rails.application.routes.draw do
  resources :trip_tags
  resources :tags
  resources :activities
  resources :accommodations
  resources :transportations
  resources :cities
  resources :trips
  resources :users, only: [:create, :show]
  
  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/user-avatar", to: "users#avatar"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # post "/accommodation-image", to: "accommodation#add_image"
  # post "/activity-images", to: "activities#add_file"
  # post "/transportation-image", to: "transportation#add_image"
  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html }
end