import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, login } from '../../actions/session_actions';
import Splash from './splash';

const mapStateToProps = ({ errors, session }) => {
    return {
        errors: errors.session,
        formType: 'Sign Up',
        navLink: <Link to="/login">log in instead</Link>,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)),
        demoUserLogin: (user) => dispatch(login(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);