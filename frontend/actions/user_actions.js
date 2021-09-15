import * as APIUtil from '../util/user_api_util';



export const RECEIVE_USER = 'RECEIVE_USER'

const receiveUser = user => ({
    type: RECEIVE_USER,
    user,
});

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
})



export const fetchUser = userId => dispatch => (
    APIUtil.fetchUser(userId).then(user => (
        dispatch(receiveUser(user))
    ))
);

export const fetchUsers = () => dispatch => (
    APIUtil.fetchUsers().then(users => (
        dispatch(receiveUser(users))
    ))
)