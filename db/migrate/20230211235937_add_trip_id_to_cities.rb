class AddTripIdToCities < ActiveRecord::Migration[7.0]
  def change
    add_column :cities, :trip_id, :integer
  end
end