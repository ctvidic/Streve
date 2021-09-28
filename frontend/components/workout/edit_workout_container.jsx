import { connect } from 'react-redux';
import EditWorkout from './edit_workout'
import { fetchWorkouts, editWorkout, fetchWorkout, clearErrors } from '../../actions/workout_actions';

const mSTP = (state, ownProps) => {
    debugger;
    return ({
        workouts: Object.values(state.entities.workouts),
        workout: {
            user_id: state.session.id,
            route_id: 0,
            workout_type: 'run',
            duration: 0,
            elevation_change: 0,
            distance: 0
        },
        pins: [],
        user_id: state.session.id,
        workoutId: parseInt(ownProps.match.params.id),
        workout: state.entities.workouts[parseInt(ownProps.match.params.id)] || {},
        errors: state.entities.workoutErrors
    })
}

const mDTP = (dispatch) => {
    return ({
        fetchWorkouts: () => dispatch(fetchWorkouts()),
        editWorkout: workout => dispatch(editWorkout(workout)),
        fetchWorkout: (id) => dispatch(fetchWorkout(id)),
        clearErrors: () => dispatch(clearErrors())
    })
}

export default connect(mSTP, mDTP)(EditWorkout)