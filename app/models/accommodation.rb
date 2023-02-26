class Accommodation < ApplicationRecord
  belongs_to :city
  has_one_attached :image

  def image_url
    image.map do |image|
      Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
    end
  end
end