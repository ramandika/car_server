class Geolocation < ActiveRecord::Base
  belongs_to :tractable_device, polymorphic: true
end
