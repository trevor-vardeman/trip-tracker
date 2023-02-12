class TripSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :plan, :published, :notes

  belongs_to :user
  has_many :trip_tags
  has_many :tags, through: :trip_tags
  has_many :cities
  has_many :accommodations, through: :cities
  has_many :activities, through: :cities
  has_many :transportations, through: :cities
end