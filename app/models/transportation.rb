class Transportation < ApplicationRecord
  validate :single_start_location, :single_end_location, on: :create
  belongs_to :start_location, :class_name => "City"
  belongs_to :end_location, :class_name => "City"

  def single_start_location
    if self.start_location.start_locations.length > 0
      errors.add(:single_start_location, "\n\nYou can only create one mode of transportation leaving each city.")
    end
  end

  def single_end_location
    if self.end_location.end_locations.length > 0
      errors.add(:single_end_location, "\n\nYou can only create one mode of transportation arriving in each city.")
    end
  end
end