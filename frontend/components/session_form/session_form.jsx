import React from 'react';


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(()=>{
    this.props.history.push(`./users/${this.props.userId}`)})
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  demoLogin(e) {
    debugger;
    e.preventDefault();
    console.log('demologin');
    const player = { username: 'newuser',email: 'blahblahblah@gmail.com', password: 'password'}
    this.props.demoUserLogin(player).then(()=>{
    this.props.history.push(`./users/${this.props.userId}`)})
  }

  render() {
    let value
    if(this.props.formType === 'Log In'){
      value = 'https://dgalywyr863hv.cloudfront.net/pictures/clubs/74106/6093399/2/large.jpg'
    }else{
      value = 'https://cdn2.cyclist.co.uk/sites/cyclist/files/2020/05/lake_district_013.jpg'
    }
    return (
      <div id='fullscreen'>
      
      <img className='login-image' src={value}></img>
      <div className="login-form-container">
        <div className="login-box">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          {/* Welcome to Streve!
          <br/>
          Please {this.props.formType} or {this.props.navLink} */}
          
          <div className="login-form">
            <div id="entry-type">{this.props.formType}</div>
              <div id="login-errors">{this.renderErrors()}</div>

            <div id="entry-form">
            <br/>
            <div id="text-inputs">
            <label>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
                id="username"
                placeholder='Your username'
              />
            </label>
            <br />
            <label>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
                id="email"
                placeholder='Your email'
              />
            </label>
            <br />
            <label>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
                id='password'
                placeholder='Your password'
              />
            </label>
              </div>
            <br></br>
            <input className="session-submit" type="submit" value={this.props.formType} />
                <br></br>
            <button className="form-demo-button" onClick={this.demoLogin} >Demo</button>
              <br></br>
            </div>
          </div>
        </form>
        </div>
      </div>
      </div>
    );
  }
}

export default SessionForm;
