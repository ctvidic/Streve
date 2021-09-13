import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'
import { signup } from '../../util/session_api_util';
import Dropdown from 'react-bootstrap/Dropdown'

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
      <NavLink id="loginClick"exact to="/login" onClick={redirect()}>Log Out</NavLink>
      {/* <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown> */}
    <div id="plusDropDown"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" class="svg-inline--fa fa-plus-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg></div>
    </div>
  );
  if (this.props.currentUser) {
      return personalGreeting();
  } else if (this.state.link.includes("/login")){
    return signUp();
  } else{
    return sessionLinks();
  }
  }
  };


export default Greeting;
