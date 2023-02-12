class TripTagSerializer < ActiveModel::Serializer
  attributes :id, :trip_id, :tag_id

  belongs_to :trip
  belongs_to :tag
end