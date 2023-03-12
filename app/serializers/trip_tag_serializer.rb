class TripTagSerializer < ActiveModel::Serializer
  attributes :id, :trip_id, :tag_id, :name

  belongs_to :trip
  belongs_to :tag

  def name
    trip_tag = self.object.tag.name
    return trip_tag
  end
end