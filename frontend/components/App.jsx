import { browserHistory, Router, Route } from 'react-router';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import React from 'react';
import GreetingContainer from './greeting/greeting_container';

const App = () => (
    <div>
        <header>
            <h1>Streve</h1>
            <GreetingContainer />
        </header>

        <Route path="/login" component={LogInFormContainer} />
        <Route path="/signup" component={SignUpFormContainer} />
    </div>
);

export default App