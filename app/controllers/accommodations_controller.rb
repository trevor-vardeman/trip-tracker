class AccommodationsController < ApplicationController
  def create
    accommodation = Accommodation.create(accommodation_params)
    if accommodation.valid?
      render json: current_user, include: ["trips", "trips.tags", "trips.trip_tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
    else
      render json: { error: accommodation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    accommodation = Accommodation.find(params[:id])
    accommodation.update(accommodation_params)
    render json: current_user, include: ["trips", "trips.tags", "trips.trip_tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
  end

  def destroy
    accommodation = Accommodation.find(params[:id])
    accommodation.destroy
    render json: current_user, include: ["trips", "trips.tags", "trips.trip_tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
  end

  private

  def accommodation_params
    params.permit(:city_id, :description, :start_datetime, :end_datetime, :cost)
  end
end