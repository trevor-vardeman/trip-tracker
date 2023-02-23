class CitiesController < ApplicationController
  def create
    city = City.create(city_params)
    if city.valid?
      render json: current_user, include: ["trips", "trips.tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "trips.trip_tags", "cities"], status: :accepted
    else
      render json: { error: city.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def city_params
    params.permit(:trip_id, :city, :country)
  end
end