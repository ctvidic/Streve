@workouts.each do |workout|
  json.set! workout.id do
    json.extract! workout, :id, :workout_type
  end
end