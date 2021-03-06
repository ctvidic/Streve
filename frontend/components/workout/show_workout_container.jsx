import { connect } from 'react-redux';
import ShowWorkout from './show_workout'
import { fetchWorkouts, createWorkout, deleteWorkout, fetchWorkout } from '../../actions/workout_actions';
import {fetchUser, fetchUsers} from '../../actions/user_actions'
const mSTP = (state, ownProps) => {
    return ({
        workout: state.entities.workouts[ownProps.match.params.id] || {},
        sessionId: state.session.id,
        username: state.entities.users,
        workoutId: ownProps.match.params.id,
        data: {waypoints:[]},
        gpx: ''
    })
}

const mDTP = (dispatch) => {
    return ({
        fetchWorkouts: () => dispatch(fetchWorkouts()),
        fetchWorkout: (workoutOut) => dispatch(fetchWorkout(workoutOut)),
        removeWorkout: (workout) => dispatch(deleteWorkout(workout)),
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        fetchUsers: ()=>dispatch(fetchUsers())
    })
}

export default connect(mSTP, mDTP)(ShowWorkout)