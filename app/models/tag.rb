class Tag < ApplicationRecord
  validates :name, uniqueness: { case_sensitive: false }
  has_many :trip_tags
  has_many :trips, through: :trip_tags
end