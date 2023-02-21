class City < ApplicationRecord
  belongs_to :trip
  has_many :accommodations
  has_many :activities
  has_many :start_locations, class_name: "Transportation", foreign_key: "start_location_id"
  has_many :end_locations, class_name: "Transportation", foreign_key: "end_location_id"
  has_many :users, through: :trips
end