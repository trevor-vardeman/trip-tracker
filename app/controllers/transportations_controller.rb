class TransportationsController < ApplicationController
  def create
    transportation = Transportation.create(transportation_params)
    if transportation.valid?
      render json: current_user, include: ["trips", "trips.tags", "trips.trip_tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
    else
      render json: { error: transportation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    transportation = Transportation.find(params[:id])
    transportation.update(transportation_params)
    render json: current_user, include: ["trips", "trips.tags", "trips.trip_tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
  end

  def destroy
    transportation = Transportation.find(params[:id])
    transportation.destroy
    render json: current_user, include: ["trips", "trips.tags", "trips.trip_tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
  end

  private

  def transportation_params
    params.permit(:id, :start_location_id, :start_datetime, :end_location_id, :end_datetime, :cost, :description)
  end
end