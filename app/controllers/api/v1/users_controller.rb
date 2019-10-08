class Api::V1::UsersController < ApplicationController

  before_action :authenticate_user!

  def show
    current_user
  end

  def update
    if current_user.update(filtered_user_params)
      render json: {status: :ok, message: "one signal id updated"}
    else
      render json: {status: :error, error: current_user.errors}
    end
  end

  private
  def filtered_user_params
    params.require(:user).permit(:one_signal_id)
  end
end