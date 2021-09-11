class StaticMap < ActiveRecord::Migration[6.1]
  def change
      add_column :workouts, :static_map, :text
  end
end
