class Api::V1::CarsController < ApplicationController

  before_action :authenticate_user!

  def index
    @cars = current_user.cars
    render json: {cars: @cars}
  end
end