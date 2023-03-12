class TripTagsController < ApplicationController

  def create
    render json: tags.errors, status: 422 and return unless params[:existing_trip_tags]
    all_created = true
    trip_tags = []
    params[:existing_trip_tags].each do |trip_tag_params|
      trip_tag = TripTag.create(tag_id: trip_tag_params[:tag_id], trip_id: trip_tag_params[:trip_id])
      trip_tags << trip_tag
      all_created && trip_tag.valid?
    end

    if all_created
      render json: current_user, include: ["trips", "trips.tags", "trips.trip_tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
    else
      render json: { error: trip_tag.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    trip_tag = TripTag.find_by(id: params[:id])
    trip_tag.destroy
    render json: current_user, include: ["trips", "trips.tags", "trips.trip_tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
  end

  private

  def trip_tag_params
    params.permit(existing_trip_tags: [:id, :tag_id, :trip_id]).require(:existing_trip_tags)
  end

end