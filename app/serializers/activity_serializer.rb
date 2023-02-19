class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :description, :city_id, :start_datetime, :end_datetime, :cost, :notes

  belongs_to :city
end