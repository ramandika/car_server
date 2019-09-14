# config/initializers/otp-jwt.rb
require 'otp'
# To load the JWT related support.
require 'otp/jwt'

OTP::JWT::Token.jwt_signature_key = ENV['JWT_TOKEN_KEY']