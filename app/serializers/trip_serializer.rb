class TripSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :plan, :published, :notes, :trip_summary

  belongs_to :user
  has_many :trip_tags
  has_many :tags, through: :trip_tags
  has_many :cities

  def trip_summary
    num_cities = self.object.cities.length
    accommodations = 0
    activities = 0
    transportations = 0
    cost = 0
    earliest_date = []
    latest_date = []


    self.object.cities.each do |city|
      city_accommodations = city.accommodations.length
      city_activities = city.activities.length
      city_start_locations = city.start_locations.length

      accommodations += city_accommodations
      activities += city_activities
      transportations += city_start_locations

      city.accommodations.map do |acc|
        cost += acc.cost
        earliest_date << acc.start_datetime
        latest_date << acc.end_datetime
      end

      city.activities.map do |act|
        cost += act.cost
        earliest_date << act.start_datetime
        latest_date << act.end_datetime
      end

      city.start_locations.map do |tran|
        cost += tran.cost
        earliest_date << tran.start_datetime
      end

      city.end_locations.map { |tran| latest_date << tran.end_datetime }
    end

    departure_date = earliest_date.min
    return_date = latest_date.max

    return {num_cities: num_cities, accommodations: accommodations, activities: activities, transportations: transportations, cost: cost, departure_date: departure_date, return_date: return_date}
  end 
end