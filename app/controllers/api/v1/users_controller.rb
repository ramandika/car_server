class Api::V1::UsersController < ApplicationController

  before_action :authenticate_user!

  def show
    current_user
  end
end