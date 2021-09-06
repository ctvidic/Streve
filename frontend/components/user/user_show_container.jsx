import { connect } from 'react-redux';
import User_Show from './user_show'
import { fetchWorkouts } from '../../actions/workout_actions';

const mSTP = (state, ownProps) => {
    return ({
        workouts: Object.values(state.entities.workouts)
    })
}

const mDTP = (dispatch) => {
    return ({
        fetchWorkouts: () => dispatch(fetchWorkouts())
    })
}

export default connect(mSTP, mDTP)(User_Show)