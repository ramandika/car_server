class Dashboard::AreasController < ApplicationController
  before_action :authenticate_user!

  def index

  end
end