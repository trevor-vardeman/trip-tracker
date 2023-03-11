class CitiesController < ApplicationController
  def create
    city = City.create(city_params)
    if city.valid?
      render json: current_user, include: ["trips", "trips.tags", "trips.trip_tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
    else
      render json: { error: city.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    city = City.find(params[:id])
    if city.start_locations.length > 0
      city.start_locations.each do |t|
        transportation = Transportation.find(t.id)
        transportation.destroy
      end
    end
    if city.end_locations.length > 0
      city.end_locations.each do |t|
        transportation = Transportation.find(t.id)
        transportation.destroy
      end
    end
    city.destroy
    render json: current_user, include: ["trips", "trips.tags", "trips.trip_tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
  end

  private

  def city_params
    params.permit(:trip_id, :city, :country)
  end
end