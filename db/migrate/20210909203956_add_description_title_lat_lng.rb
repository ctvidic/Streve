class AddDescriptionTitleLatLng < ActiveRecord::Migration[6.1]
  def change
      add_column :workouts, :description, :string
      add_column :workouts, :title, :string
      add_column :workouts, :coordinates, :text, array: true, default: []
  end
end
