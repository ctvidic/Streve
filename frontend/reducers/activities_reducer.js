import { RECEIVE_ACTIVITIES, RECEIVE_ACTIVITY } from "../actions/activity_actions";

const activitiesReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState
    switch (action.type) {
        case RECEIVE_ACTIVITIES:
            return Object.assign({}, action.activities);
        case RECEIVE_ACTIVITY:
            nextState = Object.assign({}, state)
            nextState[action.activity.id] = action.activity
            return nextState
        default:
            return state;
    }
};

export default activitiesReducer