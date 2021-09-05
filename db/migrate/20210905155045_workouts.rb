class Workouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.integer :user_id, null: false
      t.integer :route_id
      t.string :workout_type, null: false
      t.integer :duration, null: false
      t.integer :elevation_change, null: false
      t.integer :distance, null: false
      t.date :date, null: false
      t.timestamps
    end
     add_index :workouts, :user_id
     add_index :workouts, :route_id
  end

 
  
end
