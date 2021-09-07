import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'



const Greeting = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <nav className="login-signup">
      {/* <Link to="/login">Login</Link>
      &nbsp;or&nbsp;
      <Link to="/signup">Sign up!</Link> */}
    </nav>
  );

  const loggingOut = () => {
    return 
  }

  const redirect = () => {
    return (
      logout
    )
  }
  
  const personalGreeting = () => (
    <hgroup className="header-group">
    {/* <h2 className="header-name">{currentUser.username}</h2> */}
    <NavLink exact to="/login" onClick={redirect()}>Logout</NavLink>
    </hgroup>
  );
  return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;
