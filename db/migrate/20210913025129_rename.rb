class Rename < ActiveRecord::Migration[6.1]
  def change
    rename_column :activities, :route_id, :workout_id
  end
end
