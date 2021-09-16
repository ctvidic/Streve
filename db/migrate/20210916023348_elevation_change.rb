class ElevationChange < ActiveRecord::Migration[6.1]
  def change
      change_column :workouts, :elevationData, :text
  end
end
