class TripTagSerializer < ActiveModel::Serializer
  attributes :id, :trip_id, :tag_id, :name, :trip_name

  belongs_to :trip
  belongs_to :tag

  def name
    trip_tag = self.object.tag.name
    return trip_tag
  end

  def trip_name
    trip_tag = self.object.trip.name
    return trip_tag
  end
end