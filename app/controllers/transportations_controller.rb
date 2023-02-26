class TransportationsController < ApplicationController
  def create
    transportation = Transportation.create(transportation_params)
    if transportation.valid?
      render json: current_user, include: ["trips", "trips.tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "trips.trip_tags", "cities"], status: :accepted
    else
      render json: { error: transportation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def transportation_params
    params.permit(:id, :start_location_id, :start_datetime, :end_location_id, :end_datetime, :cost, :description, :image)
  end
end