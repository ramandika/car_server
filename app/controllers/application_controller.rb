class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  include OTP::JWT::ActionController

  private

  def current_user
    @jwt_user ||= User.from_jwt(request_authorization_header || cookies.signed[:jwt])
  end

  def current_user!
    current_user || raise('User authentication failed')
  rescue
    head(:unauthorized)
  end

  def authenticate_user!
    if current_user.blank?
      render json: {status: "authentication failed"}
    end
  end

end
