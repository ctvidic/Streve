import {
    RECEIVE_WORKOUT_ERRORS,
    CLEAR_ERRORS
} from '../actions/workout_actions';

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WORKOUT_ERRORS:
            if (action.errors === undefined) {
                return state
            } else {
                return action.errors
            }
        case CLEAR_ERRORS:
            return [];
        default:
            return state;
    }
};