class DurationNull < ActiveRecord::Migration[6.1]
  def change
      change_column_null(:workouts, :duration, false)
  end
end
