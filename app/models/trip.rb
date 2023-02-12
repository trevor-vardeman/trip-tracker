class Trip < ApplicationRecord
  belongs_to :user
  has_many :cities
  has_many :accommodations, through: :cities
  has_many :activities, through: :cities
  has_many :transportations, through: :cities
end