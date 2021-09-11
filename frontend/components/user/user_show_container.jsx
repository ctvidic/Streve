import { connect } from 'react-redux';
import User_Show from './user_show'
import { fetchWorkouts } from '../../actions/workout_actions';
import { fetchUser } from '../../actions/user_actions';

const mSTP = (state, ownProps) => {
    return ({
        workouts: Object.values(state.entities.workouts).filter(x => x.user_id === parseInt(ownProps.match.params.id)),
        userId: parseInt(ownProps.match.params.id),
        user: state.entities.users[parseInt(ownProps.match.params.id)]
    })
}

const mDTP = (dispatch) => {
    return ({
        fetchWorkouts: () => dispatch(fetchWorkouts()),
        fetchUser: (userId) => dispatch(fetchUser(userId))
    })
}

export default connect(mSTP, mDTP)(User_Show)