class Transportation < ApplicationRecord
  belongs_to :start_location, class_name: "City"
  belongs_to :end_location, class_name: "City"
end