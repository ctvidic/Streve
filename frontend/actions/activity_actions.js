import * as APIUtil from '../util/activity_api_util';

export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';
export const RECEIVE_ACTIVITY = 'RECEIVE_ACTIVITY';
export const REMOVE_ACTIVITY = 'REMOVE_WORKOUT';


const receiveActivities = activities => ({
    type: RECEIVE_ACTIVITIES,
    activities,
});

const receiveActivity = (activity) => ({
    type: RECEIVE_ACTIVITY,
    activity,
});

const removeActivity = (activityId) => ({
    type: REMOVE_activity,
    activityId,
});

export const fetchActivities = () => dispatch => (
    APIUtil.fetchActivities().then(activities => (
        dispatch(receiveActivities(activities))
    ))
);

export const fetchActivity = id => dispatch => (
    APIUtil.fetchActivity(id).then(activity => (
        dispatch(receiveActivity(activity))
    ))
);

export const createActivity = activity => dispatch => (
    APIUtil.createActivity(activity).then(activity => (
        dispatch(receiveActivity(activity))
    ))
);

export const deleteActivity = activity => dispatch => (
    APIUtil.deleteActivity(activity).then(activity => (dispatch(removeActivity(activity.id))))
)