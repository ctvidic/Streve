class ChangeNullAgain < ActiveRecord::Migration[6.1]
  def change
      change_column_null(:workouts, :duration, true)
  end
end
