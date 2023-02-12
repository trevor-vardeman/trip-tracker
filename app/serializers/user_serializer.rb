class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :trips
  has_many :cities, through: :trips
end