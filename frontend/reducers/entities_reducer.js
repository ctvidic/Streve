import { combineReducers } from 'redux';

import users from './users_reducer';
import workouts from './workouts_reducer.js'
import activities from './activities_reducer.js'
import activitiesErrors from './activitiesErrors_reducer.js'
import workoutErrors from './workoutErrors_reducer.js'

export default combineReducers({
  users,
  workouts,
  activities,
  activitiesErrors,
  workoutErrors
});
