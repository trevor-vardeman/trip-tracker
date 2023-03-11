class Tag < ApplicationRecord
  validates :name, :uniqueness => true, :length => { in: 2..20 }
  has_many :trip_tags
  has_many :trips, through: :trip_tags
end