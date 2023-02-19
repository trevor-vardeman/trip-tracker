class TripsController < ApplicationController

  def create
    trip = Trip.create(user_id: current_user.id)
    city = City.create(
      city: params[:city],
      country: params[:country],
      trip_id: trip.id
    )

    if trip.valid? && city.valid?
      render json: current_user, include: ["trips", "trips.accommodations", "trips.activities", "trips.cities", "trips.tags", "trips.transportations", "trips.trip_tags", "cities"], status: :ok
    else
      render json: { error: trip.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    trip = Trip.find(params[:id]) 
    trip.update(trips_params)
    if trip.valid?
      render json: trip, status: :accepted
    else
      render json: { error: trip.errors.full_messages }, status: :unprocessable_entity
    end

  end

  private

  def trips_params
    params.permit(:id, :name, :plan?, :published?, :notes)
  end

end