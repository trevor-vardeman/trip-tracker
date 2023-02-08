class CreateAccommodations < ActiveRecord::Migration[7.0]
  def change
    create_table :accommodations do |t|
      t.integer :city_id
      t.string :information
      t.datetime :start_datetime
      t.datetime :end_datetime
      t.float :cost
      t.string :notes

      t.timestamps
    end
  end
end
