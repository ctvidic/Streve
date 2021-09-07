import { connect } from 'react-redux';
import ShowWorkout from './show_workout'
import { fetchWorkouts, createWorkout, deleteWorkout, fetchWorkout } from '../../actions/workout_actions';

const mSTP = (state, ownProps) => {
    return ({
        workout: state.entities.workouts[ownProps.match.params.id] || {},
        sessionId: state.session.id
    })
}

const mDTP = (dispatch) => {
    return ({
        fetchWorkouts: () => dispatch(fetchWorkouts()),
        fetchWorkout: (workoutOut) => dispatch(fetchWorkout(workoutOut)),
        removeWorkout: (workout) => dispatch(deleteWorkout(workout))
    })
}

export default connect(mSTP, mDTP)(ShowWorkout)