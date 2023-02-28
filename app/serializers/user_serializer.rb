class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar_key

  has_many :trips
  has_many :cities, through: :trips

  def avatar_key
    key = current_user.avatar.key
    return key
  end
end