import { connect } from 'react-redux';
import ShowWorkout from './show_workout'
import { fetchWorkouts, createWorkout, deleteWorkout } from '../../actions/workout_actions';

const mSTP = (state, ownProps) => {
    debugger;
    return ({
        workout: state.entities.workouts[ownProps.match.params.id],
    })
}

const mDTP = (dispatch) => {
    return ({
        fetchWorkouts: () => dispatch(fetchWorkouts()),
        removeWorkout: (workout) => dispatch(deleteWorkout(workout))
    })
}

export default connect(mSTP, mDTP)(ShowWorkout)