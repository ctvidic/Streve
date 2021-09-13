require 'byebug'

class Api::WorkoutsController < ApplicationController
def new
    render :new
end

def create
    @activity = Activity.new(activity_params)
    if @activity.save
      render :show
    else
      render json: @workout.errors.full_messages, status: 422
    end
end

def show
    @activity = Activity.find(params[:id])
end

def index
    @activity = Activity.all
end

def destroy
    @actitivity = Activity.find(params[:id])
    if @activity.destroy
      render :show
    else
      render json: @activity.errors.full_messages, status: 422
    end
end

protected

def workout_params
    params.require(:acitivity).permit(:user_id,:route_id, :duration,:date)
end


end
