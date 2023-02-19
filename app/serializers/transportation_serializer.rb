class TransportationSerializer < ActiveModel::Serializer
  attributes :id, :trip_id, :information, :start_location, :start_datetime, :end_location, :end_datetime, :cost, :notes

  belongs_to :city
end