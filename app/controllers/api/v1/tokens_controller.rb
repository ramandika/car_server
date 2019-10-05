class Api::V1::TokensController < ApplicationController

  def create
    user = User.find_by(phone_number: params[:phone_number])

    jwt_from_otp(user, params[:otp]) do |auth_user|
      # Let's update the last login date before we send the token...
      # auth_user.update_column(:last_login_at, DateTime.current)

      render json: { token: auth_user.to_jwt }, status: :created
    end
  end

  def otp
    #Get otp
    user = User.find_by(phone_number: params[:phone_number])
    if(user)
      otp = user.sms_otp
      render json: {otp: otp}
    else
      render json: {error: "No user found"}
    end
  end

  def user_info
    render json: {user: current_user}
  end
end