// Importing React since we are using React.
import React, { Component } from "react";


class LoginForm extends Component {
  state = {
    value: '',
  };


  render() {
    //const { users } = this.props;
    return (
      <div>
        <form>
          <label>
          User
          <input 
          id='username'
          type="text" 
          name="username"  
          className="Login"
          value={this.props.username}
          onChange={this.props.handleUsernameChange}/>
          </label>
          <p component="p">{this.props.usernameMissingError}</p>
          <br></br>
          <label>
          Pass
          <input
          id='password' 
          type="text" 
          name="pass"  
          className="Login"
          value={this.props.password}
          onChange={this.props.handlePasswordChange}
          />
          </label>
          <p component="p">{this.props.usernameMissingError}</p>
          <br></br>
          <input type="submit" value="Login" className="Button"
          onClick={this.props.handleUserSubmit}/>
        </form>
      </div>
    );
  }
}

// Exporting the LoginForm component
// so that the App.js file can render the LoginForm page.
export default (LoginForm);