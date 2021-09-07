import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors, session }) => {
  if (errors.session === undefined){

  }else{
  return {
    userId: session.id,
    errors: errors.session,
    formType: 'Login',
    navLink: <Link to="/signup">sign up instead</Link>,
  };}
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    demoUserLogin: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
