import { connect } from 'react-redux';
import ActivityForm from './activity_form'
import { fetchActivities, createActivity } from '../../actions/activity_actions';
import { fetchWorkouts } from '../../actions/workout_actions'
import React from 'react';

const mSTP = (state, ownProps) => {
    return ({
        pins: [],
        workouts: Object.values(state.entities.workouts),
        userId: state.session.id
    })
    
}

const mDTP = (dispatch) => {
    return ({
        fetchActivities: () => dispatch(fetchActivities()),
        createActivity: activity => dispatch(createActivity(activity)),
        fetchWorkouts:() => dispatch(fetchWorkouts())

    })
}

export default connect(mSTP, mDTP)(ActivityForm)