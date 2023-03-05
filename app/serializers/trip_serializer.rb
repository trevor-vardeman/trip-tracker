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

    self.object.cities.each do |city|
    city_accommodations = city.accommodations.length
    city_activities = city.activities.length
    city_start_locations = city.start_locations.length
    accommodations += city_accommodations
    activities += city_activities
    transportations += city_start_locations
    city.accommodations.map { |acc| cost += acc.cost }
    city.activities.map { |act| cost += act.cost }
    city.start_locations.map { |tran| cost += tran.cost }
    end
    return {num_cities: num_cities, accommodations: accommodations, activities: activities, transportations: transportations, cost: cost}
  end
end