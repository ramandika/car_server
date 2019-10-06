class Api::V1::AreasController < ApplicationController
  before_action :authenticate_user!

  def index
    #Shows all area list
    query = params[:query_name]
    if query.present?
      areas = Area.where("name ILIKE ?", query)
    else
      areas = Area.all
    end
    render json: {status: :ok, areas: areas.as_json(:except => [:boundaries])}
  end

  def show
    area = Area.find_by(id: params[:id])
    if area
      boundaries = RGeo::GeoJSON.encode(area.boundaries)
      render json: {status: :ok, boundaries: boundaries["coordinates"]}
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

  private
  def filtered_area_params
    params.require(:area).permit(:name, :price)
  end

end