import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, login } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({errors, session}) => {
  let x;
  if (session === undefined){
    x = 0;
  }else{
    x = session.id
  }
  return {
    userId: x,
    errors: errors.session,
    formType: 'signup',
    navLink: <Link to="/login">log in instead</Link>,
  };
};

const mapDispatchToProps = dispatch => {
    return {
    processForm: (user) => dispatch(signup(user)),
    demoUserLogin: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
