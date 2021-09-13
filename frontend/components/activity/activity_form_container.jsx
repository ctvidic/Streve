import { connect } from 'react-redux';
import ActivityForm from './activity_form'
import { fetchActivities, createActivity } from '../../actions/activity_actions';
import React from 'react';

const mSTP = (state, ownProps) => {
    return ({
        pins: [],

    })
}

const mDTP = (dispatch) => {
    return ({
        fetchActivities: () => dispatch(fetchActivities()),
        createActivity: activity => dispatch(createActivity(activity))

    })
}

export default connect(mSTP, mDTP)(ActivityForm)