import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'
import { signup } from '../../util/session_api_util';

class Greeting extends React.Component{
  constructor(props){
    super(props)
    this.state = {link: window.location.href}
  }
  componentDidMount(){
    this.setState({
      link: window.location.href
    });
  }

  componentDidUpdate(prevProps,prevState) {
    if (prevState.link !== window.location.href){
    this.setState({
      link: window.location.href
    });
  }
  }
  
  render(){
  const sessionLinks = () => (
    <div className="login-signup">
      <Link onClick={() => this.setState({ link: "http://localhost:3000/#/login" })} to="/login">Log In</Link>
    </div>
  );

  const redirect = () => {
    return (
      this.props.logout
    )
  }

  const signUp = () => (
    <div className="login-signup">
      <Link to="/signup" onClick={() => this.setState({ link: "http://localhost:3000/#/signup" })}>Sign Up</Link>
    </div>
  )
  
  const personalGreeting = () => (
    <div className="login-signup">
    {/* <h2 className="header-name">{currentUser.username}</h2> */}
    <NavLink exact to="/login" onClick={redirect()}>Log Out</NavLink>
    </div>
  );
  if (this.props.currentUser) {
      return personalGreeting();
  } else if (this.state.link === "http://localhost:3000/#/login"){
    return signUp();
  } else{
    return sessionLinks();
  }
  }
  };


export default Greeting;
