class AddOtpToUsers < ActiveRecord::Migration
  def change
    add_column :users, :otp_secret, :string
    add_column :users, :otp_counter, :integer
  end
end
