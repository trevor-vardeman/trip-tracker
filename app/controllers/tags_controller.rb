class TagsController < ApplicationController

  def create
    tag = Tag.create(name: params[:name])
    trip_tag = TripTag.create(
      tag_id: tag.id,
      trip_id: params[:trip_id]
    )
    if tag.valid? && trip_tag.valid?
      render json: current_user, include: ["trips", "trips.tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "trips.trip_tags", "cities"], status: :accepted
    else
      render json: { error: tag.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def tag_params
    params.permit(:name, :trip_id)
  end

end