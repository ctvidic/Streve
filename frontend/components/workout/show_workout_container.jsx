import { connect } from 'react-redux';
import ShowWorkout from './show_workout'
import { fetchWorkouts, createWorkout } from '../../actions/workout_actions';

const mSTP = (state, ownProps) => {
    return ({
        workout: state.entities.workouts[ownProps.match.params.id],
        workout_id: ownProps.match.params.id
    })
}

const mDTP = (dispatch) => {
    return ({
        fetchWorkouts: () => dispatch(fetchWorkouts()),
        createWorkout: workout => dispatch(createWorkout(workout))

    })
}

export default connect(mSTP, mDTP)(ShowWorkout)