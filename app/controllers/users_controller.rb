class UsersController < ApplicationController

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: current_user, include: ["trips", "trips.tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { error: user.errors }, status: :unprocessable_entity
    end
  end

  def avatar
    user = User.find_by(id: session[:user_id])
    user.avatar.attach(params[:avatar])
    render json: current_user, include: ["trips", "trips.tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :avatar)
  end

end