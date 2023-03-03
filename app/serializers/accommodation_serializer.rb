class AccommodationSerializer < ActiveModel::Serializer
  attributes :id, :city_id, :start_datetime, :end_datetime, :cost, :description, :image_url

  belongs_to :city
end