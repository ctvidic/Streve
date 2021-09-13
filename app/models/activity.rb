class Activity < ApplicationRecord
    belongs_to :workout,
        class_name: 'Workout',
        foreign_key: :workout_id
end
