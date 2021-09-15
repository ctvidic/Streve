import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';
import Dashboard from './dashboard';
import { fetchWorkouts } from '../../actions/workout_actions';
import { fetchUsers } from '../../actions/user_actions';
import { fetchActivities, deleteActivity } from '../../actions/activity_actions'

const mapStateToProps = (state, ownProps) => {
    debugger;
    return {
        currentUser: state.entities.users[state.session.id],
        ownProps: ownProps,
        workouts: state.entities.workouts,
        activities: Object.values(state.entities.activities).reverse(),
        users: state.entities.users[undefined]
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchActivities: ()=> dispatch(fetchActivities()),
    fetchWorkouts:()=> dispatch(fetchWorkouts()),
    fetchUsers: ()=>dispatch(fetchUsers())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
