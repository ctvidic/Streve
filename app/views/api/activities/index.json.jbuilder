@activities.each do |activity|
  json.set! activity.id do
    json.extract! activity, :workout_id, :user_id, :duration, :date, :title, :description
  end
end