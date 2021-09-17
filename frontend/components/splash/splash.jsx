import React from 'react';
import { Link } from 'react-router-dom';


class Splash extends React.Component{
    constructor(props){
        super(props)
        this.demoLogin = this.demoLogin.bind(this);
    }

    demoLogin(e) {
        e.preventDefault();
        console.log('demologin');
        const player = { username: 'newuser', email: 'blahblahblah@gmail.com', password: 'password' }
        this.props.demoUserLogin(player).then(() => {
            this.props.history.push(`./dashboard`)
        })
    }
    render(){
        return(<div id="splash">
            <div id="splash-header">
                The absolute best app for runners and cyclists
            </div>
            <div id="phoneForm">
                <div id="phone">
                    <img id="phonepic" src="https://i.insider.com/5e8fbf98dcd88c0ce7628735?width=1136&format=jpeg"></img>
                </div>
                <div id='formColumn'>
                    <button className="splash-demo-button" onClick={this.demoLogin} >Demo User</button>
                <div id="boxes">
                    
                    <Link to="/signup">Sign Up Today!</Link>
                </div>
                <div id="smalltext">
                    By signing up for Streve, you agree to my Terms of Service. View my Privacy Policy here.
                </div>
                <div id="smallloginlink">
                    Already a Member? <Link to='/login'>Log In</Link>
                </div>
                </div>
            </div>
            <div id="base">
                <div id="text">Streve</div>
            </div>
        </div>)
    }
}

export default Splash