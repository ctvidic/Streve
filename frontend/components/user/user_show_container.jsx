import { connect } from 'react-redux';
import User_Show from './user_show'
import { fetchWorkouts } from '../../actions/workout_actions';
import { fetchUser } from '../../actions/user_actions';
import { fetchActivities, deleteActivity } from '../../actions/activity_actions'
const mSTP = (state, ownProps) => {
    return ({
        workouts: state.entities.workouts || {},
        activities: Object.values(state.entities.activities).filter(x => x.user_id === parseInt(ownProps.match.params.id)),
        userId: parseInt(ownProps.match.params.id),
        user: state.entities.users[parseInt(ownProps.match.params.id)] || {},
        sessionId: state.session.id
    })
}

const mDTP = (dispatch) => {
    return ({
        fetchWorkouts: () => dispatch(fetchWorkouts()),
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        fetchActivities: () => dispatch(fetchActivities()),
        deleteActivity: (activity) => dispatch(deleteActivity(activity.id))
    })
}

export default connect(mSTP, mDTP)(User_Show)