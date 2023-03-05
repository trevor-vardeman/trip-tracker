class Trip < ApplicationRecord
  belongs_to :user
  has_many :trip_tags, dependent: :destroy
  has_many :tags, through: :trip_tags
  has_many :cities, dependent: :destroy
end