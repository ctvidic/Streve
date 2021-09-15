class Workout < ApplicationRecord
     has_many :workouts,
        class_name: 'Activity',
        foreign_key: :workout_id,
        primary_key: :id,
        dependent: :destroy
    
end
