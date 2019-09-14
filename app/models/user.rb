require 'otp/mailer'

class User < ActiveRecord::Base
  include OTP::ActiveRecord
  include OTP::JWT::ActiveRecord

  has_many :cars

  def email_otp
    OTP::Mailer.otp(email, otp, self).deliver_later
  end

end
