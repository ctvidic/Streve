import { connect } from 'react-redux';
import EditWorkout from './edit_workout'
import { fetchWorkouts, editWorkout, fetchWorkout } from '../../actions/workout_actions';

const mSTP = (state, ownProps) => {
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
        workout: state.entities.workouts[parseInt(ownProps.match.params.id)] || {}
    })
}

const mDTP = (dispatch) => {
    return ({
        fetchWorkouts: () => dispatch(fetchWorkouts()),
        editWorkout: workout => dispatch(editWorkout(workout)),
        fetchWorkout: (id) => dispatch(fetchWorkout(id))

    })
}

export default connect(mSTP, mDTP)(EditWorkout)