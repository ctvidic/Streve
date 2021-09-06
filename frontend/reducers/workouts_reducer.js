import { RECEIVE_WORKOUTS } from "../actions/workout_actions";

const workoutsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WORKOUTS:
            return action.workouts;
        default:
            return state;
    }
};

export default workoutsReducer