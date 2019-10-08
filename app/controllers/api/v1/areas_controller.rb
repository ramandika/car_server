class Api::V1::AreasController < ApplicationController
  before_action :authenticate_user!

  def index
    #Shows all area list
    query = params[:query_name]
    if query.present?
      areas = Area.where("name ILIKE ?", "%#{query}%")
    else
      areas = Area.all
    end
    render json: {status: :ok, areas: areas}
  end

  def show
    area = Area.find_by(id: params[:id])
    if area
      boundaries = RGeo::GeoJSON.encode(area.boundaries)
      coordinates = boundaries["coordinates"]
      render json: {status: :ok, boundaries: coordinates[0].map{|x| {lat: x[0], lng: x[1]}}}
    else
      render json: {status: :error, message: "Area not found"}
    end
  end

  def create
    area = Area.new(filtered_area_params)
    boundaries = params[:area][:boundaries].map{|p| "#{p[:lat]} #{p[:lng]}"}
    boundaries << boundaries[0]
    area.boundaries = "POLYGON((#{boundaries.join(',')}))"
    if area.save
      render json: {status: :ok, message: "Area berhasil ditambahkan"}
    else
      render json: {status: :error, message: area.errors}
    end
  end

  def surrounding_areas
    user_location = params[:user_location]
    user_location = RGeo::Geos.factory.point(user_location[:latitude], user_location[:longitude])
    distance = 200 #1 Km
    areas = Area.where("ST_Distance(boundaries::geography,?::geography) < ?",user_location, distance)

    areas.each_with_index do |area,index|
      boundaries = RGeo::GeoJSON.encode(area.boundaries)
      coordinates = boundaries["coordinates"]
      area.boundaries =  coordinates[0].map{|x| {latitude: x[0], longitude: x[1]}}
      areas[index] = area
    end

    render json: {status: :ok, areas: areas}
  end

  private
  def filtered_area_params
    params.require(:area).permit(:name, :price)
  end

end