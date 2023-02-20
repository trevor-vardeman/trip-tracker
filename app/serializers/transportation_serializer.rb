class TransportationSerializer < ActiveModel::Serializer
  attributes :id, :trip_id, :start_location, :start_datetime, :end_location, :end_datetime, :cost, :description

  belongs_to :city
end