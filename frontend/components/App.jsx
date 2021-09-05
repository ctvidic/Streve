import { browserHistory, Router, Route,Switch } from 'react-router-dom';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import UserShowContainer from './user/user_container'

const App = () => (
    <div>
        <header>
            <h1>Streve</h1>
            <GreetingContainer />
        </header>
        <Switch>
        <Route exact path="/login" component={LogInFormContainer} />
        <Route exact path="/signup" component={SignUpFormContainer} />
        <Route exact path="/users/:id"/>
        </Switch>
    </div>
);

export default App