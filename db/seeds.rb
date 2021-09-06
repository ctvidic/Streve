# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Workout.create!({'user_id' => 1, 'route_id' => 2, 'workout_type' => 'swim', 'duration' => 200,'elevation_change'=> 200, 'distance'=> 200, 'date'=> Date.parse('17/9/2015')})
Workout.create!({'user_id' => 17, 'route_id' => 2, 'workout_type' => 'run', 'duration' => 200,'elevation_change'=> 200, 'distance'=> 200, 'date'=> Date.parse('17/9/2015')})
Workout.create!({'user_id' => 17, 'route_id' => 2, 'workout_type' => 'run', 'duration' => 200,'elevation_change'=> 200, 'distance'=> 200, 'date'=> Date.parse('17/9/2015')})