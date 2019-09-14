class CreateCars < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.string :name, null: false
      t.string :model, null: false
      t.integer :year, null: false
      t.references :user, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
