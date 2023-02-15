class TripsController < ApplicationController

  def create
    trip = Trip.create(user_id: current_user.id)
    city = City.create(
      city: params[:city],
      country: params[:country],
      trip_id: trip.id
    )

    if trip.valid? && city.valid?
      render json: current_user, status: :ok
    else
      render json: { error: trip.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def trips_params
    params.permit(:name, :plan?, :published?, :notes)
  end

end