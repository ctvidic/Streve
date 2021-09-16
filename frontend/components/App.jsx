import { browserHistory, Router, Route,Switch } from 'react-router-dom';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import UserShowContainer from './user/user_show_container'
import WorkoutFormContainer from './workout/workout_form_container'
import ShowWorkoutContainer from './workout/show_workout_container'
import SplashContainer from './splash/splash_container'
import ActivityFormContainer from './activity/activity_form_container'
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import DashboardContainer from './dashboard/dashboard_container'
import EditWorkoutContainer from './workout/edit_workout'
import { NavLink } from 'react-router-dom'


const App = () => (
    <div id='webpage'>
        <header>
            <div id='topHeader'>
                <h1 id='title'><NavLink to='/dashboard'>Streve</NavLink></h1>
            </div>
            <GreetingContainer />
        </header>
        <Switch>
            <AuthRoute exact path="/login" component={LogInFormContainer} />
            <AuthRoute exact path="/signup" component={SignUpFormContainer} />
            <ProtectedRoute exact path="/users/:id" component={UserShowContainer}/>
            <ProtectedRoute exact path="/workouts/new" component={WorkoutFormContainer}/>
            <ProtectedRoute exact path="/activities/new" component={ActivityFormContainer} />
            <ProtectedRoute exact path="/workouts/:id" component={ShowWorkoutContainer} />
            <ProtectedRoute exact path="/workouts/:id/edit" component={EditWorkoutContainer} />
            <ProtectedRoute exact path="/dashboard" component={DashboardContainer} />
            <AuthRoute exact path="/" component={SplashContainer} />
        </Switch>
    </div>
);

export default App