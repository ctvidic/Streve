import * as APIUtil from '../util/workout_api_util';

export const RECEIVE_WORKOUTS = 'RECEIVE_WORKOUTS';
export const RECEIVE_WORKOUT = 'RECEIVE_WORKOUT';
export const REMOVE_WORKOUT = 'REMOVE_WORKOUT';
export const CLEAR_ERRORS = "CLEAR_ERRORS"
export const RECEIVE_WORKOUT_ERRORS = "RECEIVE_WORKOUT_ERRORS"


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

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
};

export const receiveWorkoutErrors = errors => {
    return{
    type: RECEIVE_WORKOUT_ERRORS,
    errors
}};

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
    ), err => {
        return(
        dispatch(receiveWorkoutErrors(err.responseJSON))
    )})
);


export const editWorkout = workout => dispatch => (
    APIUtil.editWorkout(workout).then(workout => (
        dispatch(receiveWorkout(workout))
    ), err => {
        return (
            dispatch(receiveWorkoutErrors(err.responseJSON))
        
    )})
)

export const deleteWorkout = workout => dispatch => (
    APIUtil.deleteWorkout(workout).then(workout=> (dispatch(removeWorkout(workout.id))))
)