require 'json'
class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    @user = User.new(user_params)
    @user.save
  end

  def update
    @user = User.find_by(cookie:params[:id])
    @user.count += 1
    @user.save
  end

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find_by(cookie:params[:id])
    render json: @user
  end

  def user_params
    params.require(:user).permit(:cookie, :ball, :count)
  end
end
