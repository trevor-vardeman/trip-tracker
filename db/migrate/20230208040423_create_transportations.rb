class CreateTransportations < ActiveRecord::Migration[7.0]
  def change
    create_table :transportations do |t|
      t.integer :trip_id
      t.string :information
      t.integer :start_location
      t.datetime :start_datetime
      t.integer :end_location
      t.datetime :end_datetime
      t.float :cost
      t.string :notes

      t.timestamps
    end
  end
end
