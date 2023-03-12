class TagsController < ApplicationController

  def index
    tags = Tag.all.order(name: :asc)
    render json: tags, status: :ok
  end

  def create
    render json: tags.errors, status: 422 and return unless params[:new_tags]
    all_created = true
    tags = []
    trip_tags = []
    params[:new_tags].each do |tags_params|
      tag = Tag.create(name: tags_params[:name])
      tags << tag
      trip_tag = TripTag.create(tag_id: tag.id, trip_id: tags_params[:trip_id])
      trip_tags << trip_tag
      all_created && tag.valid? && trip_tag.valid?
    end

    if all_created
      render json: current_user, include: ["trips", "trips.tags", "trips.trip_tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
    else
      render json: { error: tag.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def tags_params
    params.permit(new_tags: [:name, :trip_id]).require(:new_tags)
  end

end