class CreateGeolocations < ActiveRecord::Migration
  def change
    create_table :geolocations do |t|
      t.integer :tractable_device_id, index: true
      t.string :tractable_device_type
      t.decimal :latitude, null: false
      t.decimal :longitude, null: false
      t.decimal :accuracy, null: false
      t.decimal :speed, null: false
      t.decimal :heading, null: false
      t.decimal :altitude, null: false
      t.string :activity, null: false
      t.decimal :activity_confidence, null: false
      t.decimal :battery_level, null: false
      t.boolean :battery_is_charging, null: false
      t.boolean :is_moving, null: false
      t.integer :odometer, null: false
      t.timestamps null: false
    end
  end
end
