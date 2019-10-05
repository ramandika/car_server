class Dashboard::LoginController < ApplicationController
  include ::ActionController::Cookies

  def create
    user = User.find_by(phone_number: params[:phone_number])
    if user.verify_otp(params[:otp])
      cookies.signed[:jwt] = {value:  user.to_jwt, httponly: true}
      redirect_to dashboard_areas_path
    else
      redirect_to '/dashboard/login'
    end
  end
end