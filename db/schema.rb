# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20191007114349) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "areas", force: :cascade do |t|
    t.string   "name",                                               null: false
    t.integer  "price",                                              null: false
    t.geometry "boundaries", limit: {:srid=>0, :type=>"st_polygon"}, null: false
  end

  create_table "billings", force: :cascade do |t|
    t.integer  "price",          null: false
    t.integer  "user_id",        null: false
    t.integer  "area_id",        null: false
    t.integer  "geolocation_id", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "cars", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "brand",      null: false
    t.string   "model",      null: false
    t.integer  "year",       null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "cars", ["user_id"], name: "index_cars_on_user_id", using: :btree

  create_table "geolocations", force: :cascade do |t|
    t.integer  "tractable_device_id"
    t.string   "tractable_device_type"
    t.decimal  "latitude",              null: false
    t.decimal  "longitude",             null: false
    t.decimal  "accuracy",              null: false
    t.decimal  "speed",                 null: false
    t.decimal  "heading",               null: false
    t.decimal  "altitude",              null: false
    t.string   "activity",              null: false
    t.decimal  "activity_confidence",   null: false
    t.decimal  "battery_level",         null: false
    t.boolean  "battery_is_charging",   null: false
    t.boolean  "is_moving",             null: false
    t.integer  "odometer",              null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "geolocations", ["tractable_device_id"], name: "index_geolocations_on_tractable_device_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",          null: false
    t.string   "address"
    t.string   "email"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "otp_secret"
    t.integer  "otp_counter"
    t.string   "phone_number",  null: false
    t.string   "one_signal_id"
  end

  add_index "users", ["one_signal_id"], name: "index_users_on_one_signal_id", unique: true, using: :btree
  add_index "users", ["phone_number"], name: "index_users_on_phone_number", unique: true, using: :btree

  create_table "watcher_monitoreds", force: :cascade do |t|
    t.integer "monitored", null: false
    t.integer "watcher",   null: false
  end

  add_index "watcher_monitoreds", ["monitored"], name: "index_watcher_monitoreds_on_monitored", using: :btree
  add_index "watcher_monitoreds", ["watcher"], name: "index_watcher_monitoreds_on_watcher", using: :btree

  add_foreign_key "billings", "areas"
  add_foreign_key "billings", "geolocations"
  add_foreign_key "billings", "users"
  add_foreign_key "cars", "users"
  add_foreign_key "watcher_monitoreds", "users", column: "monitored"
  add_foreign_key "watcher_monitoreds", "users", column: "watcher"
end
