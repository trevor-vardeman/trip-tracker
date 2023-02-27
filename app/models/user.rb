class User < ApplicationRecord
  has_secure_password
  has_one_attached :avatar
  validates :username, uniqueness: { case_sensitive: false }

  has_many :trips
  has_many :cities, through: :trips
end