class Transportation < ApplicationRecord
  belongs_to :start_location, :class_name => "City"
  belongs_to :end_location, :class_name => "City"
  has_one_attached :image

  def image_url
    image.map do |image|
      Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
    end
  end
end