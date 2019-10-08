class Billing < ActiveRecord::Base
  belongs_to :user
  belongs_to :area
  belongs_to :geolocation
end
