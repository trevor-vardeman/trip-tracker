class TransportationSerializer < ActiveModel::Serializer
  attributes :id, :start_location_id, :start_datetime, :end_location_id, :end_datetime, :cost, :description

  belongs_to :start_location, :class_name => "City"
  belongs_to :end_location, :class_name => "City"
end