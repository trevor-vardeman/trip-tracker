class CreateTrips < ActiveRecord::Migration[7.0]
  def change
    create_table :trips do |t|
      t.integer :user_id
      t.string :name
      t.boolean :plan?
      t.boolean :published?
      t.string :notes

      t.timestamps
    end
  end
end
