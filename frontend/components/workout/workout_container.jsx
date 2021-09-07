import { connect } from 'react-redux';
import WorkoutForm from './workout'
import { fetchWorkouts} from '../../actions/workout_actions';

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

export default connect(mSTP, mDTP)(WorkoutForm)