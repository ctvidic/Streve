import { RECEIVE_WORKOUTS, RECEIVE_WORKOUT } from "../actions/workout_actions";

const workoutsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState
    switch (action.type) {
        case RECEIVE_WORKOUTS:
            return Object.assign({},action.workouts);
        case RECEIVE_WORKOUT:
            nextState = Object.assign({},state)
            nextState[action.workout.id] = action.workout
            return nextState
        default:
            return state;
    }
};

export default workoutsReducer