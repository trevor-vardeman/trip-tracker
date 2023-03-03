class TransportationSerializer < ActiveModel::Serializer
  attributes :id, :start_location_id, :start_datetime, :end_location_id, :end_datetime, :cost, :description, :image_url

  belongs_to :start_location, :class_name => "City"
  belongs_to :end_location, :class_name => "City"
end