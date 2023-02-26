class AccommodationsController < ApplicationController
  def create
    accommodation = Accommodation.create(accommodation_params)
    if accommodation.valid?
      render json: current_user, include: ["trips", "trips.tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.transportations", "trips.trip_tags", "cities"], status: :accepted
    else
      render json: { error: accommodation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def accommodation_params
    params.permit(:city_id, :description, :start_datetime, :end_datetime, :cost, :image)
  end
end