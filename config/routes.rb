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
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/trip", to: "trips#create"
  post "/accommodation-image", to: "accommodation#add_image"
  post "/activity-images", to: "activities#add_file"
  post "/transportation-image", to: "transportation#add_image"
  post "/user-avatar", to: "users#avatar"
  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html }
  # req.path.exclude?('rails/active_storage')}
end