class CitySerializer < ActiveModel::Serializer
  attributes :id, :city, :country, :trip_id, :start_locations, :end_locations, :arrival_date, :departure_date

  belongs_to :trip
  has_many :accommodations
  has_many :activities
  has_many :start_locations, :class_name => "Transportation", :foreign_key => "start_location_id"
  has_many :end_locations, :class_name => "Transportation", :foreign_key => "end_location_id"
  has_many :users, through: :trips

  def arrival_date
    earliest_date = []

    self.object.accommodations.map do |acc|
      earliest_date << acc.start_datetime
    end

    self.object.activities.map do |act|
      earliest_date << act.start_datetime
    end

    self.object.start_locations.map do |start|
      earliest_date << start.start_datetime
    end

    self.object.end_locations.map do |last|
      earliest_date << last.start_datetime
    end

    earliest_date.min
  end

  def departure_date
    latest_date = []

    self.object.accommodations.map do |acc|
      latest_date << acc.end_datetime
    end

    self.object.activities.map do |act|
      latest_date << act.end_datetime
    end

    self.object.start_locations.map do |start|
      latest_date << start.end_datetime
    end

    self.object.end_locations.map do |last|
      latest_date << last.end_datetime
    end

    latest_date.max
  end
end