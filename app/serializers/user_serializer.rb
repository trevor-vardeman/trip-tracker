class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar

  has_many :trips
  has_many :cities, through: :trips

  def avatar
    key = current_user.avatar.key
    return key
  end
end