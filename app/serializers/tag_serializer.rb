class TagSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :trip_tags
  has_many :trips, through: :trip_tags
end