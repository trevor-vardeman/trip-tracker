class CreateActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.string :description
      t.integer :city_id
      t.datetime :start_datetime
      t.datetime :end_datetime
      t.float :cost
      t.string :notes

      t.timestamps
    end
  end
end
