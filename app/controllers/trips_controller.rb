class TripsController < ApplicationController

  def create
    trip = Trip.create(
      user_id: current_user.id,
      name: params[:name],
      plan: false
    )
    city = City.create(
      city: params[:city],
      country: params[:country],
      trip_id: trip.id
    )
    if trip.valid? && city.valid?
      render json: current_user, include: ["trips", "trips.tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
    else
      render json: { error: trip.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    trip = Trip.find(params[:id])
    trip.update(trips_params)
    if trip.valid?
      render json: current_user, include: ["trips", "trips.tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
    else
      render json: { error: trip.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    trip = Trip.find(params[:id])
    trip.destroy
    render json: current_user, include: ["trips", "trips.tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
  end

  private

  def trips_params
    params.permit(:id, :name, :plan, :published, :notes)
  end

end