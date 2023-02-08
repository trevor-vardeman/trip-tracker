class CreateCities < ActiveRecord::Migration[7.0]
  def change
    create_table :cities do |t|
      t.string :city
      t.string :country

      t.timestamps
    end
  end
end