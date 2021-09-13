import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'
import { signup } from '../../util/session_api_util';
import Dropdown from 'react-bootstrap/Dropdown'
import Plus from './plus_dropdown'

class Greeting extends React.Component{
  constructor(props){
    super(props)
    this.state = {link: window.location.href, show: false}
 
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
      <Link id="signupLink" onClick={() => this.setState({ link: "http://localhost:3000/#/login" })} to="/login">Log In</Link>
    </div>
  );

  const redirect = () => {
    return (
      this.props.logout
    )
  }

  const signUp = () => (
    <div className="login-signup">
      <Link to="/signup" id="loginLink" onClick={() => this.setState({ link: "http://localhost:3000/#/signup" })}>Sign Up</Link>
    </div>
  )
  
  const showMenu = () => {
    if(!this.state.show){
      this.setState({show: true})
      console.log('its true')
      return (
        <div id='showmenu'>Show Menufasdfasasdfsdf</div>
      )
    }else{
      this.setState({ show: false})
      return(
        null
      )
    }

    
  }
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
      <div id="plusDropDown" onClick={() => (showMenu())}><Plus clicked={this.state.show}/></div>
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
