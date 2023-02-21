class CreateTransportations < ActiveRecord::Migration[7.0]
  def change
    create_table :transportations do |t|
      t.integer :start_location_id
      t.datetime :start_datetime
      t.integer :end_location_id
      t.datetime :end_datetime
      t.float :cost
      t.string :description

      t.timestamps
    end

    add_foreign_key :transportations, :cities, column: :start_location_id
    add_foreign_key :transportations, :cities, column: :end_location_id
  end
end