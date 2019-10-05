class CreateAreas < ActiveRecord::Migration
  def change
    create_table :areas do |t|
      t.string :name, null: false
      t.integer :price, null: false
      t.st_polygon :boundaries, null: false
    end
  end
end
