import { connect } from 'react-redux';
import WorkoutForm from './workout_form'
import { fetchWorkouts, createWorkout, clearErrors } from '../../actions/workout_actions';

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
        errors: state.entities.workoutErrors
    })
}

const mDTP = (dispatch) => {
    return ({
        fetchWorkouts: () => dispatch(fetchWorkouts()),
        createWorkout: workout => dispatch(createWorkout(workout)),
        clearErrors: () => dispatch(clearErrors())
        
    })
}

export default connect(mSTP, mDTP)(WorkoutForm)