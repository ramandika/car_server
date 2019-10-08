require 'rest-client'

class Geolocation < ActiveRecord::Base
  has_one :billing
  belongs_to :tractable_device, polymorphic: true
  after_save :check_area

  def check_area
    point = RGeo::Geos.factory.point(self.latitude, self .longitude)
    area =  Area.where("ST_CONTAINS(boundaries,?)",point).order({:price => :asc}).limit(1).first

    #Should only run when enter and exit
    if should_create_billing?(area, self.tractable_device_id)
      #Create billing
      billing = Billing.new
      billing.price = area.price
      billing.user = self.tractable_device
      billing.area = area
      billing.geolocation = self
      if billing.save
        $redis.set(self.tractable_device_id, {area_id: area.id, status: "in"}.to_json)
        payload = {
            :app_id => ENV["ONE_SIGNAL_APP_ID"],
            :include_player_ids => [self.tractable_device.one_signal_id] + billing.user.watchers.map{|w| w.one_signal_id},
            :contents => {:en => "Transaksi #{billing.price}"}
        }
        #Send onesignal notif
        RestClient.post("https://onesignal.com/api/v1/notifications", payload.to_json, {content_type: :json, accept: :json})
      else
        puts billing.errors
      end
    else
      if area.blank?
        #Can be just out or nothing happen
        area_status = JSON.parse($redis.get(self.tractable_device_id) || "{}")
        area_status["status"] = "out" unless area_status.blank?
        $redis.set(self.tractable_device_id, area_status.to_json)
      end
    end
  end

  private
  def should_create_billing?(area, id)
    area_status = JSON.parse($redis.get(id) || "{}")
    area.present? && (area_status["area_id"].to_i != area.id || (area_status["area_id"].to_i == area.id && area_status["status"] == "out"))
  end

end
