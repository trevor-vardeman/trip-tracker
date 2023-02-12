class CreateTripTags < ActiveRecord::Migration[7.0]
  def change
    create_table :trip_tags do |t|
      t.integer :trip_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
