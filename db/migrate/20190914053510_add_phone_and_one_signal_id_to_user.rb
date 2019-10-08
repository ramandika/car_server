class AddPhoneAndOneSignalIdToUser < ActiveRecord::Migration
  def change
    add_column :users, :phone_number, :string, null: false
    add_index :users, :phone_number, unique: true
    add_column :users, :one_signal_id, :string
    add_index :users, :one_signal_id, unique: true
  end
end
