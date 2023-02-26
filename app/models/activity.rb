class Activity < ApplicationRecord
  belongs_to :city
  has_one_attached :file

  def add_file
    activity = Activity.find_by(id: params[:id])
    activity.file.attach(params[:file])
  end

  def file_url
    file.map do |f|
      Rails.application.routes.url_helpers.rails_blob_path(f, only_path: true)
    end
  end
end