class CoordinatesType < ActiveRecord::Migration[6.1]
  def change
    change_column :workouts, :coordinates, :text
  end
end
