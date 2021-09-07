import * as APIUtil from '../util/workout_api_util';

export const RECEIVE_WORKOUTS = 'RECEIVE_WORKOUTS';
export const RECEIVE_WORKOUT = 'RECEIVE_WORKOUT';
export const REMOVE_WORKOUT = 'REMOVE_WORKOUT';


const receiveWorkouts = workouts => ({
    type: RECEIVE_WORKOUTS,
    workouts,
});

const receiveWorkout = (workout) => ({
    type: RECEIVE_WORKOUT,
    workout,
});

const removeWorkout = (workoutId) => ({
    type: REMOVE_WORKOUT,
    workoutId,
});

export const fetchWorkouts = () => dispatch => (
    APIUtil.fetchWorkouts().then(workouts => (
        dispatch(receiveWorkouts(workouts))
    ))
);

export const fetchWorkout = id => dispatch => (
    APIUtil.fetchWorkout(id).then(workout => (
        dispatch(receiveWorkout(workout))
    ))
);

export const createWorkout = workout => dispatch => (
    APIUtil.createWorkout(workout).then(workout => (
        dispatch(receiveWorkout(workout))
    ))
);

export const deleteWorkout = workout => dispatch => (
    APIUtil.deleteWorkout(workout).then(workout=> (dispatch(removeWorkout(workout.id))))
)