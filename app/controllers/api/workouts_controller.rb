class Api::WorkoutsController < ApplicationController
def new
    render :new
end

def create
    @workout = Workout.new(workout_params)
    if @workout.save
      render :show
    else
      render json: @workout.errors.full_messages, status: 422
    end
end

def show
    @workout = Workout.find(params[:id])
end

def index
    @workouts = Workout.all
end

def update
    @workout = Workout.find(params[:id])

    if @workout.update(workout_params)
      render :show
    else
      render json: @workout.errors.full_messages, status: 422
    end
end

def destroy
    @workout = Workout.find(params[:id])
    if @workout.destroy
      render :show
    else
      render json: @workout.errors.full_messages, status: 422
    end
end

protected

def workout_params
    params.require(:workout).permit(:user_id,:route_id, :workout_type,
    :duration, :elevation_change, :distance,:date , :description, :title, :created_at, :updated_at,:static_map, :coordinates, :elevationData)
end


end
