class AccommodationSerializer < ActiveModel::Serializer
  attributes :id, :city_id, :start_datetime, :end_datetime, :cost, :description

  belongs_to :city
end