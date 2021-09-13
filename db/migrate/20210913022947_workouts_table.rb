class WorkoutsTable < ActiveRecord::Migration[6.1]
  def change
      create_table :activities do |t|
      t.integer :user_id, null: false
      t.integer :route_id, null: false
      t.integer :duration
      t.text :date
      t.timestamps
    end
     add_index :activities, :user_id
     add_index :activities, :route_id
  end
end
