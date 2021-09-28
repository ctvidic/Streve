class Workout < ApplicationRecord
validates :distance, :elevation_change, :title, presence: true
     has_many :workouts,
        class_name: 'Activity',
        foreign_key: :workout_id,
        primary_key: :id,
        dependent: :destroy
    
end
