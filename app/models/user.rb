require 'otp/mailer'

class User < ActiveRecord::Base
  include OTP::ActiveRecord
  include OTP::JWT::ActiveRecord

  has_many :cars
  has_many :billings
  has_many :geolocations, as: :tractable_device
  has_many :watchers, class_name: 'WatcherMonitored', foreign_key: "monitored"
  has_many :monitored, class_name: 'WatcherMonitored', foreign_key: "watcher"

  def email_otp
    OTP::Mailer.otp(email, otp, self).deliver_later
  end

  def sms_otp
    self.otp if phone_number.present?
  end

  def send_one_signal(content)
    payload = {
        :app_id => ENV["ONE_SIGNAL_APP_ID"],
        :include_player_ids => [self.one_signal_id],
        :contents => {:en => content}
    }
    #Send onesignal notif
    RestClient.post("https://onesignal.com/api/v1/notifications", payload.to_json, {content_type: :json, accept: :json})
  end

end
