import { browserHistory, Router, Route,Switch } from 'react-router-dom';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import UserShowContainer from './user/user_show_container'
import WorkoutFormContainer from './workout/workout_form_container'
import ShowWorkoutContainer from './workout/show_workout_container'
import SplashContainer from './splash/splash_container'


const App = () => (
    <div id='webpage'>
        <header>
            <div id='topHeader'>
                <h1 id='title'>Streve</h1>
            </div>
            <GreetingContainer />
        </header>
        <Switch>
            <Route exact path="/login" component={LogInFormContainer} />
            <Route exact path="/signup" component={SignUpFormContainer} />
            <Route exact path="/users/:id" component={UserShowContainer}/>
            <Route exact path="/workouts/new" component={WorkoutFormContainer}/>
            <Route exact path="/workouts/:id" component={ShowWorkoutContainer} />
            <Route exact path="/" component={SplashContainer} />
        </Switch>
    </div>
);

export default App