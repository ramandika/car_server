class Api::V1::GeolocationsController < ApplicationController

  before_action :authenticate_user!

  def create
    @geolocation = Geolocation.new(params_filetered)
    @geolocation.tractable_device = current_user
    @geolocation.save
    $redis.publish("chatroom", @geolocation.to_json)
    render json: {status: "ok", message: "geolocation data is saved"}
  end


  private
  def params_filetered
    location = params[:location]
    coords = location[:coords]
    activity = location[:activity]
    battery = location[:battery]
    {
        latitude: coords[:latitude],
        longitude: coords[:longitude],
        speed: coords[:speed],
        accuracy: coords[:accuracy],
        heading: coords[:heading],
        altitude: coords[:altitude],
        is_moving: location[:is_moving],
        odometer: location[:odometer],
        activity: activity[:type],
        activity_confidence: activity[:confidence],
        battery_level: battery[:level],
        battery_is_charging: battery[:is_charging]
    }
  end
end