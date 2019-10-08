class CreateBillings < ActiveRecord::Migration
  def change
    create_table :billings do |t|
      t.integer :price, null: false
      t.references :user, foreign_key: true, null: false
      t.references :area, foreign_key: true, null: false
      t.references :geolocation, foreign_key: true, null: false
      t.timestamps null: false
    end
  end
end
