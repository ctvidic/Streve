import { combineReducers } from 'redux';

import users from './users_reducer';
import workouts from './workouts_reducer.js'

export default combineReducers({
  users,
  workouts,
});
