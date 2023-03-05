class City < ApplicationRecord
  belongs_to :trip
  has_many :accommodations, dependent: :destroy
  has_many :activities, dependent: :destroy
  has_many :start_locations, :class_name => "Transportation", :foreign_key => "start_location_id", dependent: :destroy
  has_many :end_locations, :class_name => "Transportation", :foreign_key => "end_location_id", dependent: :destroy
  has_many :users, through: :trips
end