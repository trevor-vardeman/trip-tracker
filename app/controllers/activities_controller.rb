class ActivitiesController < ApplicationController
  def create
    activity = Activity.create(activity_params)
    if activity.valid?
      render json: current_user, include: ["trips", "trips.tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
    else
      render json: { error: activity.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    activity = Activity.find(params[:id])
    activity.update(activity_params)
    render json: current_user, include: ["trips", "trips.tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
  end

  def destroy
    activity = Activity.find(params[:id])
    activity.destroy
    render json: current_user, include: ["trips", "trips.tags", "trips.cities", "trips.cities.activities", "trips.cities.accommodations", "trips.cities.start_locations", "trips.cities.end_locations", "cities"], status: :accepted
  end

  private

  def activity_params
    params.permit(:city_id, :description, :start_datetime, :end_datetime, :cost)
  end
end