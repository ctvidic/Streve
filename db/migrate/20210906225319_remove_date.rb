class RemoveDate < ActiveRecord::Migration[6.1]
  def change
      change_column_null(:workouts, :date, false)
  end
end
