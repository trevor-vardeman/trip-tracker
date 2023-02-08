class TripSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :plan, :published, :notes
end
