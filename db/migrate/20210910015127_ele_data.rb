class EleData < ActiveRecord::Migration[6.1]
  def change
      add_column :workouts, :elevationData, :text, array: true, default: []
  end
end
