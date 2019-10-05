class Car < ActiveRecord::Base
  has_many :geolocations, as: :tractable_device
  belongs_to :user
end
