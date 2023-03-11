class TripTagsController < ApplicationController
  def destroy
    trip_tag = TripTag.find_by(id: params[:id])
    trip_tag.destroy
    render json: current_user, include: ["trips", "trips.tags", "trips.trip_tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
  end

  private

  def trip_tag_params
    params.permit(:id)
  end
end