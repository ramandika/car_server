class Api::V1::CarsController < ApplicationController

  before_action :authenticate_user!

  def index
    ids = current_user.monitored.map{|x| x.monitored}.uniq
    ids << current_user.id
    @cars = Car.where(user_id: ids)
    render json: {cars: @cars}
  end

  def create
    car = Car.new(filter_car_params)
    car.user = current_user
    if car.save
      render json: {status: :ok, message: "Mobil berhasil ditambahkan"}
    else
      render josn: {status: :error, message: car.errors}
    end
  end

  def qr_scan
    monitored = User.find_by(id: params[:id])
    wm = WatcherMonitored.new(monitored: monitored.id, watcher: current_user.id)
    if wm.save
      render json: {status: :ok, message: "Berhasil menambahkan monitored"}
    else
      render json: {status: :error, message: wm.errors}
    end
  end

  def socket_auth
    param = filter_params_socket_auth
    wm = WatcherMonitored.where(watcher: current_user.id, monitored: filter_params_socket_auth["room"].to_i)
    if wm.blank? and !is_own_car?
      render json: {status: :error, message: "Socket auth ditolak"}
    else
      render json: {status: :ok, message: "Socket auth sukses"}
    end
  end

  private
  def is_own_car?
    filter_params_socket_auth["room"].to_i == current_user.id
  end

  def filter_car_params
    params.require(:car).permit(:name, :brand, :model, :year)
  end

  def filter_params_socket_auth
    params.require(:car).permit(:room)
  end
end