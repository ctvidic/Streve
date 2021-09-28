import {
    RECEIVE_ACTIVITY_ERRORS,
    CLEAR_ERRORS
} from '../actions/activity_actions';

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ACTIVITY_ERRORS:
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