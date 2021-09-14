
class Api::ActivitiesController < ApplicationController
def new
    render :new
end

def create
    @activity = Activity.new(activity_params)
    if @activity.save
      render :show
    else
      render json: @activity.errors.full_messages, status: 422
    end
end

def show
    @activity = Activity.find(params[:id])
end

def index
    @activities = Activity.all
end

def destroy
    @activity = Activity.find(params[:id])
    if @activity.destroy
      render :show
    else
      render json: @activity.errors.full_messages, status: 422
    end
end

protected

def activity_params
    params.require(:activity).permit(:user_id,:workout_id, :duration,:date, :description,:title)
end


end
