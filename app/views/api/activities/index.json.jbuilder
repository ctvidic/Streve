@activities.each do |activity|
  json.set! activity.id do
    json.extract! activity, :id, :workout_id, :user_id, :duration, :date, :title, :description
  end
end