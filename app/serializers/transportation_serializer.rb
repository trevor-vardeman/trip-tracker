class TransportationSerializer < ActiveModel::Serializer
  attributes :id, :start_datetime, :end_datetime, :cost, :description, :start_location, :end_location

  belongs_to :start_location, :class_name => "City"
  belongs_to :end_location, :class_name => "City"

  def start_location
    city = self.object.start_location.city
    country = self.object.start_location.country
    comma = ", "
    return city + comma + country
  end

  def end_location
    city = self.object.end_location.city
    country = self.object.end_location.country
    comma = ", "
    return city + comma + country
  end
end