@workouts.each do |workout|
  json.set! workout.id do
    json.extract! workout, :id, :workout_type, :route_id, :duration, :elevation_change,:distance, :title, :description, :coordinates
  end
end